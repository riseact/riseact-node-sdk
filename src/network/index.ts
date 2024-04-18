import { ApolloClientOptions } from '@apollo/client/core';

import { RiseactConfig, RiseactNetwork, StorageDriver } from '../types';
import createGqlClientByOrgId from './createGqlClientByOrgId';
import createGqlRewriterHandler from './gqlRewriterHandler';
import registerWebhook from './registerWebhook';

const initNetwork = async (config: RiseactConfig, storage: StorageDriver, clientId: string, clientSecret: string): Promise<RiseactNetwork> => {
  // ! todo reset webhooks from riseact

  const createGqlClient = async (organizationId: number, options?: ApolloClientOptions<unknown>) => {
    return createGqlClientByOrgId({
      organizationId,
      storage,
      options,
      clientId,
      clientSecret,
      hosts: config.hosts!,
    });
  };

  return {
    gqlRewriterHandler: createGqlRewriterHandler(config, storage),
    createGqlClient,
    registerWebhook,
  };
};

export default initNetwork;
