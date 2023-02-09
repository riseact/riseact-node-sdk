import { createServer } from 'vite';

import { DEF_APP_PORT, DEF_HMR_PORT } from '../config/consts';
import { DevConfig } from '../types';

const initVite = async (config?: DevConfig) => {
  const vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: {
        clientPort: DEF_APP_PORT,
        port: config?.devPort || DEF_HMR_PORT,
      },
    },
    root: `${process.cwd()}/src/frontend`,
    configFile: `${process.cwd()}/src/frontend/vite.config.ts`,
    ...config?.viteConfig,
  });

  return vite;
};

export default initVite;
