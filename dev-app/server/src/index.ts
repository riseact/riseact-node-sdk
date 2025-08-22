import express, { Express } from 'express';
import initRiseactSDK, { WebhookEventTopic } from '@sdk';
import RiseactConfig from '@config/riseact';
import { OrganizationCredentialsHandler, OrganizationInfoHandler } from '@controllers/organization';

async function createServer() {
  const app: Express = express();

  // Create the Riseact SDK instance with the client ID and client secret generated from Riseact
  const riseact = await initRiseactSDK(RiseactConfig);

  const publicEpsRouter = express.Router();
  publicEpsRouter.use(
    riseact.network.registerWebhook(WebhookEventTopic.SupporterCreated, (data) => {
      console.log('Webhook received', data);
    }),
  );

  const privateEpsRouter = express.Router();
  privateEpsRouter.get('/api/hello', (req, res) => {
    res.send('Hello World!');
  });
  privateEpsRouter.get('/api/organization-info', OrganizationInfoHandler(riseact));
  privateEpsRouter.get('/api/organization-credentials', OrganizationCredentialsHandler());

  riseact.utils.startRiseactApp(app, riseact, {
    publicRouter: publicEpsRouter,
    protectedRouter: privateEpsRouter,
    serverPort: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000,
  });
}

// Start the server
createServer();
