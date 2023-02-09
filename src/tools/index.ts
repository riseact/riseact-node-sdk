import { DevConfig } from '../types';
import initVite from './devMiddleware';
import hmrProxyHandler from './hmrProxyHandler';

const initDevTools = async (devConfig?: DevConfig) => {
  const vite = await initVite(devConfig);

  return {
    devMiddleware: vite.middlewares,
    hmrProxyHandler,
  };
};

export default initDevTools;
