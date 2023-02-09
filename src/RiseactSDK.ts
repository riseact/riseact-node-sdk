import dns from 'node:dns';

import { initAuth } from './auth';
import initNetwork from './network';
import initStorage from './storage';
import initDevTools from './tools';
import { RiseactConfig, RiseactInstance } from './types';

async function RiseactSDK(config: RiseactConfig): Promise<RiseactInstance> {
  if (!config.auth.clientId || !config.auth.clientSecret) {
    throw new Error('Client ID and secret are required');
  }

  // Override node >= 15 dns order
  if (!config.disableDnsOrderOverride) {
    dns.setDefaultResultOrder('ipv4first');
  }

  const storage = initStorage(config.storage);
  const auth = await initAuth(config.auth, storage);
  const network = await initNetwork(config.network, storage);
  const tools = await initDevTools(config.dev);

  return {
    auth,
    storage,
    network,
    tools,
  };
}

export default RiseactSDK;
