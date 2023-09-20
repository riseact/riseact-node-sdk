declare module 'express-serve-static-core' {
  interface Request {
    user: {
      organizationId: number;
      clientToken: string;
    };
  }
}

export {};
