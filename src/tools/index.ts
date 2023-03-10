import { DevConfig, RiseactDevTools } from '../types';
import initVite from './devMiddleware';
import hmrProxyHandler from './hmrProxyHandler';

const initDevTools = async (devConfig?: DevConfig): Promise<RiseactDevTools> => {
  const vite = await initVite(devConfig);

  return {
    devMiddleware: vite.middlewares,
    hmrProxyHandler,
  };
};

export default initDevTools;
