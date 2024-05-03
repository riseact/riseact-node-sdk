import { OAuthCredentials, StorageDriver } from '../types';

const MemoryStorageObj: {
  [key: number]: {
    organizationSlug: string;
    accessToken: string;
    refreshToken: string;
    clientToken: string;
    expiresDateUTC: Date;
    expiresInSeconds: number;
  };
} = {};

export const MemoryStorage = (): StorageDriver => {
  const saveCredentials = async (credentials: OAuthCredentials) => {
    const { accessToken, refreshToken, organizationId, organizationSlug, clientToken, expiresDateUTC, expiresInSeconds } = credentials;

    MemoryStorageObj[organizationId] = {
      accessToken,
      refreshToken,
      clientToken,
      expiresDateUTC,
      expiresInSeconds,
      organizationSlug,
    };
  };

  const getCredentialsByClientToken = async (token: string): Promise<OAuthCredentials | null> => {
    let credentials: OAuthCredentials | undefined

    for (const organizationId in MemoryStorageObj) {
      const organization = MemoryStorageObj[organizationId];
      if (organization.clientToken === token) {
        credentials = {
          accessToken: organization.accessToken,
          refreshToken: organization.refreshToken,
          organizationId: Number(organizationId),
          organizationSlug: organization.organizationSlug,
          clientToken: organization.clientToken,
          expiresDateUTC: organization.expiresDateUTC,
          expiresInSeconds: organization.expiresInSeconds,
        };
        break;
      }
    }
    return credentials || null;
  };

  const getCredentialsByOrganizationId = async (organizationId: number): Promise<OAuthCredentials | null> => {
    const organization = MemoryStorageObj[organizationId];

    if (!organization) {
      return null;
    }

    return {
      accessToken: organization.accessToken,
      refreshToken: organization.refreshToken,
      organizationId,
      organizationSlug: organization.organizationSlug,
      clientToken: organization.clientToken,
      expiresDateUTC: organization.expiresDateUTC,
      expiresInSeconds: organization.expiresInSeconds,
    };
  };

  return {
    saveCredentials,
    getCredentialsByClientToken,
    getCredentialsByOrganizationId,
  };
};
