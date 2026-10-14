import { createHmac, timingSafeEqual } from 'crypto';
import { Request } from 'express';

export const SIGNATURE_HEADER = 'x-riseact-signature';
export const TIMESTAMP_HEADER = 'x-riseact-timestamp';

/** Max distance between the signature timestamp and now: older calls are treated as replayed */
export const SIGNATURE_TOLERANCE_SECONDS = 300;

const SIGNATURE_VERSION = 'v1';
const SHA256_HEX = /^[0-9a-f]{64}$/i;

export interface VerifyRiseactSignatureParams {
  /** The raw request body, exactly as received (not the re-serialized JSON) */
  rawBody: Buffer | string | undefined;
  /** Value of the X-Riseact-Timestamp header */
  timestamp: string | undefined;
  /** Value of the X-Riseact-Signature header */
  signature: string | undefined;
  /** Client secret of your app */
  secret: string;
  /** Current time in milliseconds. Default: Date.now() */
  now?: number;
}

/** Verify that a call comes from Riseact.
 *
 * The signature is `v1=` followed by the hex HMAC-SHA256, keyed with the client secret, of
 * `<timestamp>.<raw body>`. The header may carry several comma separated signatures (secret
 * rotation, new schemes): one valid `v1` is enough.
 */
export function verifyRiseactSignature({ rawBody, timestamp, signature, secret, now = Date.now() }: VerifyRiseactSignatureParams): boolean {
  if (rawBody === undefined || !timestamp || !signature || !/^\d+$/.test(timestamp)) {
    return false;
  }

  if (Math.abs(now / 1000 - Number(timestamp)) > SIGNATURE_TOLERANCE_SECONDS) {
    return false;
  }

  const expected = createHmac('sha256', secret).update(`${timestamp}.`).update(rawBody).digest();

  return signature.split(',').some((part) => {
    const [version, hex] = part.trim().split('=');
    return version === SIGNATURE_VERSION && SHA256_HEX.test(hex ?? '') && timingSafeEqual(Buffer.from(hex, 'hex'), expected);
  });
}

export function hasRiseactSignature(req: Request): boolean {
  return Boolean(req.header(SIGNATURE_HEADER));
}

/** Verify the signature of a request received by the app started with startRiseactApp */
export function verifyRequestSignature(req: Request): boolean {
  return verifyRiseactSignature({
    rawBody: req.rawBody,
    timestamp: req.header(TIMESTAMP_HEADER),
    signature: req.header(SIGNATURE_HEADER),
    secret: req.riseact.config.auth.clientSecret,
  });
}
