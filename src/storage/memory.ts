import { CredentialsStorage, OAuthCredentials } from '../types';

const MemoryStorage: { [key: string]: any } = {};

export const MemoryDriver = (): CredentialsStorage => {
  const saveCredentials = async (credentials: OAuthCredentials) => {
    if (MemoryStorage[credentials.organizationId]) {
      MemoryStorage[credentials.organizationId].clientTokens.push(credentials.clientToken);
    } else {
      MemoryStorage[credentials.organizationId] = {
        accessToken: credentials.accessToken,
        refreshToken: credentials.refreshToken,
        clientTokens: [credentials.clientToken],
      };
    }
  };

  const getCredentials = async (token: string) => {
    const credentials = Object.values(MemoryStorage).find((credentials: any) => {
      return credentials.clientTokens.includes(token);
    });

    if (!credentials) {
      return null;
    }
    return credentials;
  };

  return {
    saveCredentials,
    getCredentials,
  };
};
