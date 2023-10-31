declare module 'express-serve-static-core' {
  interface Request {
    user: {
      organizationSlug: string;
      organizationId: number;
      clientToken: string;
    };
  }
}

export {};
