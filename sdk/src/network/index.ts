import { ApolloClientOptions } from '@apollo/client/core';

import { RiseactConfig, RiseactNetwork, StorageAdapters } from '../types';
import initGqlProxy from './gqlProxy';
import registerWebhook from './registerWebhook';
import initCreateGqlClient from './createGqlClient';

const initNetwork = async (config: RiseactConfig, storage: StorageAdapters): Promise<RiseactNetwork> => {
  // ! todo reset webhooks from riseact

  const createGqlClient = async (organizationDomain: string, options?: ApolloClientOptions<unknown>) =>
    initCreateGqlClient({
      organizationDomain,
      storage,
      options,
      clientId: config.auth.clientId,
      clientSecret: config.auth.clientSecret,
    });

  const gqlProxy = initGqlProxy(config, storage);

  return {
    gqlProxy,
    createGqlClient,
    registerWebhook,
  };
};

export default initNetwork;
