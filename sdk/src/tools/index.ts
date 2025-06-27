import { DevConfig, RiseactDevTools } from '../types';
import initVite from './devMiddleware';
import initHmrProxy from './hmrProxyHandler';

const initDevTools = async (devConfig?: DevConfig): Promise<RiseactDevTools> => {
  const vite = await initVite(devConfig);
  const hmrProxyHandler = initHmrProxy();

  return {
    devMiddleware: vite.middlewares,
    hmrProxyHandler,
  };
};

export default initDevTools;
