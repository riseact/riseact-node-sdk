import { createServer } from 'vite';

import { DEF_APP_PORT, DEF_HMR_PORT } from '../config/consts';
import { DevConfig } from '../types';

const initVite = async (config?: DevConfig) => {
  const vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: {
        // host: "0.0.0.0",
        clientPort: DEF_APP_PORT,
        port: config?.devPort || DEF_HMR_PORT,
      },
    },
    root: `${process.cwd()}/frontend`,
    configFile: `${process.cwd()}/frontend/vite.config.ts`,
  });

  return vite;
};

export default initVite;
