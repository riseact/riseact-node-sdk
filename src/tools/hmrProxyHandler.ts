import { createProxyMiddleware } from 'http-proxy-middleware';

import { DEF_HMR_HOST } from '../config/consts';
import { ServerEventListener } from '../types';

const proxy = createProxyMiddleware({
  target: DEF_HMR_HOST,
  ws: true,
});

const hmrProxyHandler = proxy.upgrade as ServerEventListener;

export default hmrProxyHandler;
