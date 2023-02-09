import dns from 'node:dns';

import { initAuth } from './auth';
import { DEF_APP_HOST } from './config/consts';
import initNetwork from './network';
import initStorage from './storage';
import { RiseactConfig, RiseactInstance } from './types';
import urlJoin from './utils/urlJoin';

async function RiseactSDK(config: RiseactConfig): Promise<RiseactInstance> {
  // Check required fields
  if (!config.appHost) {
    config.appHost = DEF_APP_HOST;
  }

  if (!config.auth.clientId || !config.auth.clientSecret) {
    throw new Error('Client ID and secret are required');
  }

  // Override node >= 15 dns order
  if (!config.disableDnsOrderOverride) {
    dns.setDefaultResultOrder('ipv4first');
  }

  const storage = initStorage(config.storage);

  if (!config.auth.redirectUri) {
    config.auth.redirectUri = urlJoin(config.appHost, '/oauth/callback');
  }
  const auth = await initAuth(config.auth, storage);

  const network = await initNetwork(config.network, storage);

  return {
    auth,
    storage,
    network,
  };
}

export default RiseactSDK;
