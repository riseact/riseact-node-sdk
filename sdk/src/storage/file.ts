import { promises as fs } from 'fs';
import path from 'path';
import { OAuthCredentials, StorageAdapters } from '../types';
import { FILESTORE_NAME } from '../config/consts';

const CREDENTIALS_FILE = path.resolve(__dirname, FILESTORE_NAME);

async function readStore(): Promise<Record<string, StoredOrg>> {
  try {
    const raw = await fs.readFile(CREDENTIALS_FILE, 'utf-8');
    return JSON.parse(raw) as Record<string, StoredOrg>;
  } catch {
    return {};
  }
}

async function writeStore(store: Record<string, StoredOrg>): Promise<void> {
  const tmp = `${CREDENTIALS_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(store, null, 2), 'utf-8');
  await fs.rename(tmp, CREDENTIALS_FILE); // atomic swap
}

interface StoredOrg {
  accessToken: string;
  refreshToken: string;
  clientToken: string;
  expiresDateUTC: string;
  expiresInSeconds: number;
}

export const FileStorage = (): StorageAdapters => {
  const setCredentials = async (credentials: OAuthCredentials) => {
    const store = await readStore();
    const { accessToken, refreshToken, organizationDomain, clientToken, expiresDateUTC, expiresInSeconds } = credentials;

    store[organizationDomain] = {
      accessToken,
      refreshToken,
      clientToken,
      expiresDateUTC: expiresDateUTC.toISOString(),
      expiresInSeconds,
    };
    await writeStore(store);
  };

  const removeCredentials = async (organizationDomain: string) => {
    const store = await readStore();
    if (store[organizationDomain]) {
      delete store[organizationDomain];
      await writeStore(store);
    } else {
      console.warn(`[RA-SDK] No credentials found for organization ${organizationDomain} to remove
`);
    }
  };

  const getCredentialsByClientToken = async (token: string): Promise<OAuthCredentials | null> => {
    const store = await readStore();
    for (const [organizationDomain, org] of Object.entries(store)) {
      if (org.clientToken === token) {
        return {
          accessToken: org.accessToken,
          refreshToken: org.refreshToken,
          clientToken: org.clientToken,
          expiresDateUTC: new Date(org.expiresDateUTC),
          expiresInSeconds: org.expiresInSeconds,
          organizationDomain,
        };
      }
    }
    return null;
  };

  const getCredentialsByOrganizationDomain = async (organizationDomain: string): Promise<OAuthCredentials | null> => {
    const org = (await readStore())[organizationDomain];
    if (!org) return null;

    return {
      accessToken: org.accessToken,
      refreshToken: org.refreshToken,
      clientToken: org.clientToken,
      expiresDateUTC: new Date(org.expiresDateUTC),
      expiresInSeconds: org.expiresInSeconds,
      organizationDomain,
    };
  };

  return {
    setCredentials,
    removeCredentials,
    getCredentialsByClientToken,
    getCredentialsByOrganizationDomain,
  };
};
