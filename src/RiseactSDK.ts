import dns from 'node:dns';

import { initAuth } from './auth';
import initNetwork from './network';
import initStorage from './storage';
import initDevTools from './tools';
import { RiseactConfig, RiseactDevTools, RiseactInstance } from './types';
import { DEF_RISEACT_ACCOUNTS_URL, DEF_RISEACT_CORE_URL } from './config/consts';

async function RiseactSDK(config: RiseactConfig): Promise<RiseactInstance> {
  if (!config.auth.clientId || !config.auth.clientSecret) {
    throw new Error('Client ID and secret are required');
  }

  // Override node >= 15 dns order
  if (!config.disableDnsOrderOverride) {
    dns.setDefaultResultOrder('ipv4first');
  }

  // Override default Riseact hosts
  config.hosts = {
    accounts: DEF_RISEACT_ACCOUNTS_URL,
    core: DEF_RISEACT_CORE_URL,
    ...config.hosts,
  }

  const storage = initStorage(config.storage);
  const auth = initAuth(config, storage);
  const network = await initNetwork(config, storage, config.auth.clientId, config.auth.clientSecret);

  let devTools;
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠ Running RiseactSDK in production. DevTools are disabled');
  } else {
    devTools = await initDevTools(config.dev);
  }

  return {
    auth,
    storage,
    network,
    devTools: devTools as RiseactDevTools,
  };
}

export default RiseactSDK;
