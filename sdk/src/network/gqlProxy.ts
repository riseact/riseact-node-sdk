import cookieParser from 'cookie-parser';
import { RequestHandler } from 'express';
import { Readable } from 'stream';
// import { Headers } from 'node-fetch'; // Node ≥18 global
import { RISEACT_CORE_URL, RISEACT_GQL_ENDPOINT } from '../config/consts';
import { OAuthCredentials, RiseactConfig, StorageAdapters } from '../types';
import urlJoin from '../utils/urlJoin';
import { renewToken } from '../auth/authUtils';

const initGqlProxy = (config: RiseactConfig, storage: StorageAdapters): RequestHandler => {
  /**
   * Sends the GraphQL request to Riseact and streams the response.
   * If “User is not authenticated” is detected, performs the
   * refresh-and-retry logic.
   */
  const forward = async (credentials: OAuthCredentials, req: Parameters<RequestHandler>[0], res: Parameters<RequestHandler>[1], body: string) => {
    const performFetch = async (accessToken: string) => {
      const fetchResponse = await fetch(urlJoin(RISEACT_CORE_URL, RISEACT_GQL_ENDPOINT), {
        method: req.method,
        headers: {
          ...req.headers,
          host: undefined, // avoid host rewriting
          authorization: `Bearer ${accessToken}`,
        } as any,
        body,
      });
      return fetchResponse;
    };

    let riseactResponse = await performFetch(credentials.accessToken);

    const isJson = riseactResponse.headers.get('content-type')?.includes('application/json') ?? false;

    if (riseactResponse.ok && isJson) {
      const cloned = riseactResponse.clone();
      try {
        const payload = await cloned.json();

        const unauth = payload?.errors?.some((e: any) => e?.message.includes('User is not authenticated'));

        if (unauth) {
          let renewedCredentials: OAuthCredentials;
          try {
            renewedCredentials = await renewToken(config.auth.clientId!, config.auth.clientSecret!, credentials, storage);
          } catch {
            return res.redirect(`/oauth/authorize?__organization=${req.organizationDomain}`);
          }

          riseactResponse = await performFetch(renewedCredentials.accessToken);
        }
      } catch {
        /* ignore JSON-parse errors – treat response as opaque */
      }
    }

    /* ---- stream the Riseact response unchanged ---- */
    res.status(riseactResponse.status);
    riseactResponse.headers.forEach((v, k) => res.setHeader(k, v));

    if (riseactResponse.body) {
      // fromWeb() trasforma il ReadableStream Web in uno Readable Node
      Readable.fromWeb(riseactResponse.body as any).pipe(res);
    } else {
      res.end();
    }
  };

  /* --------------------------------------------------------------- */
  /* Express middleware                                              */
  /* --------------------------------------------------------------- */
  const proxyHandler: RequestHandler = async (req, res) => {
    /* cookieParser only for this route – move to app level if needed */
    cookieParser()(req, res, () => undefined);

    const authorizeUrl = '/oauth/authorize' + `?__organization=${req.organizationDomain}`;

    /* Retrieve client-token */
    // const tokenStr = req.cookies?.[COOKIE_CLIENT_TOKEN]; //|| req.headers.authorization?.split(' ')[1];
    // if (!tokenStr) return res.redirect(authorizeUrl);

    // let token: ClientTokenCookie;
    // try {
    //   token = JSON.parse(tokenStr);
    // } catch {
    //   return res.redirect(authorizeUrl);
    // }
    const token = req.headers.authorization?.split(' ')[1] as string | undefined;

    if (!token) {
      console.warn('[RISEACT-SDK] No client token provided in request');
      return res.redirect(authorizeUrl);
    }

    /* Retrieve Riseact credentials */
    const credentials = await storage.getCredentialsByClientToken(token);
    if (!credentials) return res.redirect(authorizeUrl);

    /* Read request body (express.json/express.raw must have run) */
    const body = typeof req.body === 'string' ? req.body : Buffer.isBuffer(req.body) ? req.body.toString() : JSON.stringify(req.body ?? {});

    /* Forward with automatic refresh / retry */
    try {
      await forward(credentials, req, res, body);
    } catch {
      res.redirect(authorizeUrl);
    }
  };

  return proxyHandler;
};

export default initGqlProxy;
