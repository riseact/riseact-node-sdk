import dns from 'node:dns';

import { initAuth } from './auth';
import initNetwork from './network';
import initStorage from './storage';
import initDevTools from './tools';
import { RiseactConfig, RiseactDevTools, RiseactInstance } from './types';
import startRiseactApp from './utils/startRiseactApp';

async function initRiseactSDK(config: RiseactConfig): Promise<RiseactInstance> {
  if (!config.auth.clientId) {
    throw new Error('Client ID is not provided in the configuration');
  }
  if (!config.auth.clientSecret) {
    throw new Error('Client Secret is not provided in the configuration');
  }
  if (!config.network.appPublicUrl) {
    throw new Error('App public URL is not provided in the configuration');
  }

  // Override node >= 15 dns order
  dns.setDefaultResultOrder('ipv4first');

  const storage = initStorage(config.storage);
  const auth = initAuth(config, storage);
  const network = await initNetwork(config, storage);
  const utils = {
    startRiseactApp,
  };

  let devTools: RiseactDevTools | undefined = undefined;
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠ Running RiseactSDK in production. DevTools are disabled');
  } else {
    devTools = await initDevTools(config.dev);
  }

  return {
    auth,
    storage,
    network,
    utils,
    devTools,
    config,
  };
}

export default initRiseactSDK;
