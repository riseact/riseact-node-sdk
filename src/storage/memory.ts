import { OAuthCredentials, StorageDriver } from '../types';

const MemoryStorage: {
  [key: number]: {
    accessToken: string;
    refreshToken: string;
    clientToken: string;
  };
} = {};

export const MemoryDriver = (): StorageDriver => {
  const saveCredentials = async (credentials: OAuthCredentials) => {
    const { accessToken, refreshToken, organizationId, clientToken } = credentials;

    MemoryStorage[organizationId] = {
      accessToken,
      refreshToken,
      clientToken,
    };
  };

  const getCredentialsByClientToken = async (token: string): Promise<OAuthCredentials | null> => {
    let credentials;

    for (const organizationId in MemoryStorage) {
      const organization = MemoryStorage[organizationId];
      if (organization.clientToken === token) {
        credentials = {
          accessToken: organization.accessToken,
          refreshToken: organization.refreshToken,
          organizationId: Number(organizationId),
          clientToken: organization.clientToken,
        };
        break;
      }
    }
    return credentials || null;
  };

  const getCredentialsByOrganizationId = async (organizationId: number): Promise<OAuthCredentials | null> => {
    const organization = MemoryStorage[organizationId];

    if (!organization) {
      return null;
    }

    return {
      accessToken: organization.accessToken,
      refreshToken: organization.refreshToken,
      organizationId,
      clientToken: organization.clientToken,
    };
  };

  return {
    saveCredentials,
    getCredentialsByClientToken,
    getCredentialsByOrganizationId,
  };
};
