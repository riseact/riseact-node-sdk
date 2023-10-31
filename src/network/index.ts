import { ApolloClientOptions } from '@apollo/client/core';

import { RiseactConfig, RiseactNetwork, StorageDriver } from '../types';
import createGqlClientByOrgId from './createGqlClientByOrgId';
import createGqlRewriterHandler from './gqlRewriterHandler';

const initNetwork = async (config: RiseactConfig, storage: StorageDriver, clientId: string, clientSecret: string): Promise<RiseactNetwork> => {
  if (!config.network) {
    config.network = {};
  }

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
  };
};

export default initNetwork;
