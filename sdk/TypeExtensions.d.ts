import { RiseactInstance } from './src';

declare module 'express-serve-static-core' {
  interface Request {
    organizationDomain: string;
    riseact: RiseactInstance;
    /** Raw request body, kept by startRiseactApp to verify Riseact signatures */
    rawBody?: Buffer;
  }
}

export {};
