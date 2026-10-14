import { NextFunction, Request, Response } from 'express';

import { hasRiseactSignature, verifyRequestSignature } from './signature';

/** Whether a webhook call may reach its handler.
 *
 * An invalid signature is always rejected. A missing one only when `network.webhooks.requireSignature`
 * is on: webhooks created from the Riseact admin, or registered before signing, arrive unsigned.
 */
export function isWebhookCallAllowed(req: Request): boolean {
  if (hasRiseactSignature(req)) {
    return verifyRequestSignature(req);
  }

  return !req.riseact.config.network.webhooks?.requireSignature;
}

const verifyWebhookSignature = (req: Request, res: Response, next: NextFunction) => {
  if (!isWebhookCallAllowed(req)) {
    console.warn(`[RISEACT-SDK] Rejected webhook call to ${req.path}: missing or invalid signature`);
    res.sendStatus(401);
    return;
  }

  next();
};

export default verifyWebhookSignature;
