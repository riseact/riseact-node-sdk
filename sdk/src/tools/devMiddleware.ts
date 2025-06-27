import path from 'path';
import { createServer } from 'vite';

import { FRONTEND_SRC_PATH, HMR_CLIENT_PORT, HMR_PORT } from '../config/consts';
import { DevConfig } from '../types';

const initVite = async (config?: DevConfig) => {
  const vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: {
        clientPort: config?.hmrClientPort || HMR_CLIENT_PORT,
        port: config?.devPort || HMR_PORT,
      },
    },
    root: path.join(process.cwd(), FRONTEND_SRC_PATH),
    configFile: path.join(process.cwd(), FRONTEND_SRC_PATH, 'vite.config.ts'),
    ...config?.viteConfig,
  });

  return vite;
};

export default initVite;
