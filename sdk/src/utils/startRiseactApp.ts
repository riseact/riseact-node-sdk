import cookieParser from 'cookie-parser';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { RiseactInstance, RiseactToolsMiddlewareOptions } from '../types';
import serveStatic from 'serve-static';
import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import http from 'http';

const startRiseactApp = (expressInstance: Express, riseact: RiseactInstance, options?: RiseactToolsMiddlewareOptions) => {
  const server = http.createServer(expressInstance);

  expressInstance.use(cookieParser());
  expressInstance.use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400, // 24 h
    }),
  );
  expressInstance.use(express.json());

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

  // public endpoints
  if (options?.publicRouter) {
    expressInstance.use(options.publicRouter);
  }

  expressInstance.use(riseact.auth.authMiddleware);
  expressInstance.use('/graphql', riseact.network.gqlProxy);

  // private endpoints
  if (options?.protectedRouter) {
    expressInstance.use(options.protectedRouter);
  }

  if (!riseact.devTools) {
    // === process.env.NODE_ENV === 'production'
    console.info('🚀  Production mode, serving bundled SPA');
    expressInstance.use(serveStatic(path.join(process.cwd(), 'client')) as RequestHandler);
  } else {
    console.info('🔧  Development mode, piping to Vite/HMR server');
    expressInstance.use(riseact.devTools.devMiddleware);
    server.on('upgrade', riseact.devTools.hmrProxyHandler);
  }

  server.listen(options?.serverPort || 3000, () => {
    console.log(`⚡️ Server is running on port ${options?.serverPort || 3000}. Open your app from Riseact admin panel.`);
  });
};

export default startRiseactApp;
