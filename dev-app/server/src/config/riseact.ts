import { type RiseactConfig } from '@sdk';
import path from 'path';
import dotenv from 'dotenv';
import { gql } from '@apollo/client';

dotenv.config(process.env.NODE_ENV ? { path: path.join(process.cwd(), './../../.env') } : {});

const RiseactConfig: RiseactConfig = {
  // Provide your application ID and secret from Riseact
  auth: {
    clientId: process.env.CLIENT_ID?.replaceAll('"', ''),
    clientSecret: process.env.CLIENT_SECRET?.replaceAll('"', ''),

    onInstall: async (onInstallParams) => {
      console.log('App installed on organization:', onInstallParams.domain, onInstallParams.credentials);

      const res = await onInstallParams.gqlClient.query({
        query: gql`
          query GetOrgData {
            organization {
              domain
              name
            }
          }
        `,
      });

      console.log('Gql client initialized successfully. Fetched data:', res.data.organization);
    },
  },
  storage: {
    type: 'file',
  },

  network: {
    appPublicUrl: process.env.RISEACT_APP_URL?.replaceAll('"', '') || 'http://localhost:3000',
  },

  ...(process.env.NODE_ENV === 'development' && {
    dev: {
      // Provide the path to your Vite configuration file and the root directory of your client application.
      viteConfig: {
        root: path.join(process.cwd(), '../client'),
        configFile: path.join(process.cwd(), '../client/vite.config.ts'),
      },
    },
  }),
};

export default RiseactConfig;
