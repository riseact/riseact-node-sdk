import dns from 'node:dns';

import { initAuth } from './auth';
import initNetwork from './network';
import initStorage from './storage';
import { RiseactConfig, RiseactInstance } from './types';
import urlJoin from './utils/urlJoin';

async function RiseactSDK(config: RiseactConfig): Promise<RiseactInstance> {
  // Check required fields
  if (!config.appHost) {
    throw new Error('App host is required');
  }

  if (!config.auth.clientId || !config.auth.clientSecret) {
    throw new Error('Client ID and secret are required');
  }

  // Override node >= 15 dns order
  if (!config.disableDnsOrderOverride) {
    dns.setDefaultResultOrder('ipv4first');
  }

  // Init storage object
  const storage = initStorage(config.storage);

  // Init auth object
  if (!config.auth.redirectUri) {
    config.auth.redirectUri = urlJoin(config.appHost, '/oauth/callback');
  }
  const auth = await initAuth(config.auth, storage);

  // Init network object
  const network = await initNetwork(config.network, storage);

  return {
    auth,
    storage,
    network,
  };
}

export default RiseactSDK;
