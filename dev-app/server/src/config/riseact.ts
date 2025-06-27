import type { RiseactConfig } from '@sdk';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(process.env.NODE_ENV ? { path: path.join(process.cwd(), './../../.env') } : {});

const RiseactConfig: RiseactConfig = {
  // Provide your application ID and secret from Riseact
  auth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  storage: {
    type: 'file',
  },

  network: {
    appPublicUrl: process.env.RISEACT_APP_URL || 'http://localhost:3000',
  },

  ...(process.env.NODE_ENV === 'development' && {
    dev: {
      // Provide the path to your Vite configuration file and the root directory of your client application.
      viteConfig: {
        root: path.join(process.cwd(), '../client'),
        configFile: path.join(process.cwd(), '../client/vite.config.ts'),
      },

      hmrClientPort: 3030,
    },
  }),
};

export default RiseactConfig;
