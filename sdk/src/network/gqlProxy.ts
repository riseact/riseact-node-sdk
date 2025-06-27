import cookieParser from 'cookie-parser';
import { RequestHandler } from 'express';
import { Readable } from 'stream';
// import { Headers } from 'node-fetch'; // Node ≥18 global
import { RISEACT_CORE_URL, RISEACT_GQL_ENDPOINT, COOKIE_CLIENT_TOKEN } from '../config/consts';
import { ClientTokenCookie, OAuthCredentials, RiseactConfig, StorageAdapters } from '../types';
import urlJoin from '../utils/urlJoin';
import { renewToken } from '../auth/oauth';

const REFRESH_LOCKS = new Map<string, Promise<OAuthCredentials>>();

const initGqlProxy = (config: RiseactConfig, storage: StorageAdapters): RequestHandler => {
  /**
   * Sends the GraphQL request to Riseact and streams the response.
   * If “User is not authenticated” is detected, performs the
   * refresh-and-retry logic.
   */
  const forward = async (creds: OAuthCredentials, req: Parameters<RequestHandler>[0], res: Parameters<RequestHandler>[1], body: string) => {
    const doFetch = async (accessToken: string) => {
      const fetchRes = await fetch(urlJoin(RISEACT_CORE_URL, RISEACT_GQL_ENDPOINT), {
        method: req.method,
        headers: {
          ...req.headers,
          host: undefined, // avoid host rewriting
          authorization: `Bearer ${accessToken}`,
        } as any,
        body,
      });
      return fetchRes;
    };

    let riseactRes = await doFetch(creds.accessToken);

    const isJson = riseactRes.headers.get('content-type')?.includes('application/json') ?? false;

    if (riseactRes.ok && isJson) {
      const cloned = riseactRes.clone();
      try {
        const payload = await cloned.json();

        const unauth = payload?.errors?.some((e: any) => e?.message.includes('User is not authenticated'));

        if (unauth) {
          /* ---- single-flight refresh latch ---- */
          const key = creds.clientToken;
          let lock = REFRESH_LOCKS.get(key);
          if (!lock) {
            lock = renewToken(config.auth.clientId!, config.auth.clientSecret!, creds, storage).finally(() => REFRESH_LOCKS.delete(key));
            REFRESH_LOCKS.set(key, lock);
          }

          let newCreds: OAuthCredentials;
          try {
            newCreds = await lock;
          } catch {
            return res.redirect(`/oauth/authorize?__organization=${req.organizationDomain}`);
          }

          riseactRes = await doFetch(newCreds.accessToken);
        }
      } catch {
        /* ignore JSON-parse errors – treat response as opaque */
      }
    }

    /* ---- stream the Riseact response unchanged ---- */
    res.status(riseactRes.status);
    riseactRes.headers.forEach((v, k) => res.setHeader(k, v));

    if (riseactRes.body) {
      // fromWeb() trasforma il ReadableStream Web in uno Readable Node
      Readable.fromWeb(riseactRes.body as any).pipe(res);
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
    const tokenStr = req.cookies?.[COOKIE_CLIENT_TOKEN]; //|| req.headers.authorization?.split(' ')[1];
    if (!tokenStr) return res.redirect(authorizeUrl);

    let token: ClientTokenCookie;
    try {
      token = JSON.parse(tokenStr);
    } catch {
      return res.redirect(authorizeUrl);
    }

    /* Retrieve Riseact credentials */
    const credentials = await storage.getCredentialsByClientToken(token.token);
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
