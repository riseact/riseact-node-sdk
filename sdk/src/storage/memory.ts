import { OAuthCredentials, StorageAdapters } from '../types';

const MemoryStorageObj: {
  [key: string]: {
    accessToken: string;
    refreshToken: string;
    clientToken: string;
    expiresDateUTC: Date;
    expiresInSeconds: number;
  };
} = {};

export const MemoryStorage = (): StorageAdapters => {
  const setCredentials = async (credentials: OAuthCredentials) => {
    const { accessToken, refreshToken, organizationDomain, clientToken, expiresDateUTC, expiresInSeconds } = credentials;

    MemoryStorageObj[organizationDomain] = {
      accessToken,
      refreshToken,
      clientToken,
      expiresDateUTC,
      expiresInSeconds,
    };
  };

  const removeCredentials = async (organizationDomain: string) => {
    if (MemoryStorageObj[organizationDomain]) {
      delete MemoryStorageObj[organizationDomain];
    } else {
      console.warn(`[RISEACT-SDK] No credentials found for organization ${organizationDomain} to remove`);
    }
  };

  const getCredentialsByClientToken = async (token: string): Promise<OAuthCredentials | null> => {
    let credentials: OAuthCredentials | undefined;

    for (const organizationDomain in MemoryStorageObj) {
      const organization = MemoryStorageObj[organizationDomain];
      if (organization.clientToken === token) {
        credentials = {
          accessToken: organization.accessToken,
          refreshToken: organization.refreshToken,
          clientToken: organization.clientToken,
          expiresDateUTC: organization.expiresDateUTC,
          expiresInSeconds: organization.expiresInSeconds,
          organizationDomain,
        };
        break;
      }
    }
    return credentials || null;
  };

  const getCredentialsByOrganizationDomain = async (organizationDomain: string): Promise<OAuthCredentials | null> => {
    const organization = MemoryStorageObj[organizationDomain];

    if (!organization) {
      return null;
    }

    return {
      accessToken: organization.accessToken,
      refreshToken: organization.refreshToken,
      organizationDomain: organizationDomain,
      clientToken: organization.clientToken,
      expiresDateUTC: organization.expiresDateUTC,
      expiresInSeconds: organization.expiresInSeconds,
    };
  };

  return {
    setCredentials,
    removeCredentials,
    getCredentialsByClientToken,
    getCredentialsByOrganizationDomain,
  };
};
