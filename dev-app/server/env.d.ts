declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      RISEACT_APP_URL: string;
    }
  }
}

export {};
