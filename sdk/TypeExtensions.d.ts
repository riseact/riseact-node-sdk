import { RiseactInstance } from './src';

declare module 'express-serve-static-core' {
  interface Request {
    organizationDomain: string;
    riseact: RiseactInstance;
  }
}

export {};
