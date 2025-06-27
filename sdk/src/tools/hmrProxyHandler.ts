import { createProxyMiddleware } from 'http-proxy-middleware';

import { HMR_HOST } from '../config/consts';
import { ServerEventListener } from '../types';

const initHmrProxy = () => {
  const proxy = createProxyMiddleware({
    target: HMR_HOST,
    ws: true,
  });

  const hmrProxyHandler = proxy.upgrade as ServerEventListener;

  return hmrProxyHandler;
};

export default initHmrProxy;
