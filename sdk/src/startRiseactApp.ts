import { NextFunction, Request, RequestHandler, Response } from 'express';
import { RiseactInstance, RiseactToolsMiddlewareOptions } from './types';
import serveStatic from 'serve-static';
import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';
import oauthCallbackHandler from './auth/callbackHandler';
import oauthAuthorizeHandler from './auth/authorizeHandler';
import sidExchangeHandler from './auth/sidExchange';
import { existsSync } from 'fs';

const startRiseactApp = (expressInstance: Express, riseact: RiseactInstance, options?: RiseactToolsMiddlewareOptions) => {
  const libStaticPath = getLibStaticPath();
  const server = http.createServer(expressInstance);

  expressInstance.use(
    cors({
      origin: true, // riseact.config.network.appPublicUrl + localhost ?
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400, // 24 h
    }),
    express.json(),
  );

  expressInstance.use((req: Request, _res: Response, next: NextFunction) => {
    req.riseact = riseact;
    next();
  });

  // todo: partner tokens
  /* ---------------------------- register webhooks --------------------------- */
  // get app public url from config
  // get webhooks definitions from options
  // if webhooks are defined in options, check if partner token is provided in config
  // query appByClientId
  // query appWebhooks
  // for each existent, use delete webhook mutation
  // for each defined, use create webhook mutation
  // for each defined, create webhook handlers in express

  // OAuth endpoints for be-app/riseact authentication
  expressInstance.use('/oauth/authorize', oauthAuthorizeHandler);
  expressInstance.use('/oauth/callback', oauthCallbackHandler);

  // Client auth endpoints for be-app/fe-app authentication
  expressInstance.use('/auth/get-token', serveStatic(libStaticPath + '/get-token.html'));
  expressInstance.use('/auth/sid-exchange', sidExchangeHandler);

  // TODO feat: must accept express routers and single routes
  // Public endpoints
  if (options?.publicRouter) {
    console.info('[RISEACT-SDK] Registering public router');
    expressInstance.use(options.publicRouter);
  }

  // TODO feat: must accept express routers and single routes
  // Private endpoints
  if (options?.protectedRouter) {
    options?.protectedRouter.stack.map((layer) => {
      console.info(`[RISEACT-SDK] Protected route registered: ${layer.route?.path}`);
      expressInstance.use(layer.route?.path, riseact.auth.authMiddleware, layer.handle);
    });
  }

  // GraphQL proxy endpoint
  console.info('[RISEACT-SDK] Registering GraphQL proxy endpoint at /graphql');
  expressInstance.use('/graphql', riseact.auth.authMiddleware, riseact.network.gqlProxy);

  if (!riseact.devTools) {
    // === process.env.NODE_ENV === 'production'
    console.info('[RISEACT-SDK] 🚀  Production mode, serving bundled SPA');
    expressInstance.use(serveStatic(path.join(process.cwd(), 'client')) as RequestHandler);
  } else {
    console.info('[RISEACT-SDK] 🔧  Development mode, piping to Vite/HMR server');
    expressInstance.use(riseact.devTools.devMiddleware);
    server.on('upgrade', riseact.devTools.hmrProxyHandler);
  }

  server.listen(options?.serverPort || 3000, () => {
    console.info(`[RISEACT-SDK] ⚡️ Server is running on port ${options?.serverPort || 3000}. Open your app from Riseact admin panel.`);
  });
};

const getLibStaticPath = () => {
  const serveStaticPathCandidates = [
    path.resolve(__dirname, '../static'),
    path.resolve(__dirname, './static'),
    path.resolve(process.cwd(), 'node_modules/@riseact/riseact-node-sdk/static'),
  ];
  const serveStaticPath = serveStaticPathCandidates.find((p) => existsSync(p));
  if (!serveStaticPath) {
    throw new Error('[RISEACT-SDK] Could not find static static files. Checked paths: ' + serveStaticPathCandidates.join(', '));
  }
  return serveStaticPath;
};

export default startRiseactApp;
