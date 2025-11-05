import { Request, RequestHandler, Response } from 'express';
import { popSid } from '../utils/lruCache';
import safeAsyncHandler from '../utils/safeAsyncHandler';

const sidExchangeHandler: RequestHandler = safeAsyncHandler(async (req: Request, res: Response) => {
  const sid = req.body.sid as string | undefined;
  // const organization = req.body.organization as string | undefined;
  console.info('[RISEACT-SDK] Handling SID exchange request for sid:', sid);

  if (!sid) {
    console.error('[RISEACT-SDK] No sid provided in SID exchange request');
    return res.status(400).send('SID not provided');
  }

  // if (!organization) {
  //   console.warn('[RISEACT-SDK] No organization specified in request body');
  //   return res.status(400).send('Organization not specified');
  // }

  const token = popSid(sid);

  if (!token) {
    console.error('[RISEACT-SDK] No token found for the provided sid. It might have expired (TTL 5 minutes).');
    return res.status(400).send('Token not found or expired');
  }

  // if (token.organizationDomain !== organization) {
  //   console.error('[RISEACT-SDK] Organization domain mismatch in SID exchange request');
  //   return res.status(400).send('Organization domain mismatch');
  // }
  console.debug('[RISEACT-SDK] SID exchange successful>', { sid, token });
  return res.json({
    client_token: token.clientToken,
    organization: token.organizationDomain,
  });
});

export default sidExchangeHandler;
