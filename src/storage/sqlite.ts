import { DEF_SQLITE_PATH } from '../config/consts';
import { OAuthCredentials, SqliteOptions, StorageConfig, StorageDriver } from '../types';

const initDB = (db: any) => {
  db.prepare(
    `create table if not exists oauth_credentials (
       organization_id int not null primary key, 
       organization_slug text not null,
       access_token text not null, 
       refresh_token text not null,
       client_token text not null,
       expires_date_utc text not null,
       expires_in_seconds int not null
     )`,
  ).run();
  db.pragma('journal_mode = WAL');
};

const openDB = async (path = DEF_SQLITE_PATH, options?: SqliteOptions) => {
  const sqliteDriver = await import('better-sqlite3').then((mod) => mod.default);

  const db = sqliteDriver(path, options);
  return Object.assign(db, { init: () => initDB(db) });
};

export const SqliteStorage = (config?: StorageConfig): StorageDriver => {
  const db = openDB(config?.sqlite?.path, config?.sqlite?.options);
  initDB(db);

  const saveCredentials = async (credentials: OAuthCredentials) => {
    const { refreshToken, accessToken, organizationId, organizationSlug, clientToken } = credentials;
    const db = await openDB(config?.sqlite?.path || DEF_SQLITE_PATH, config?.sqlite?.options);

    db.prepare(
      `insert into oauth_credentials (organization_id, organization_slug, access_token, refresh_token, client_token)
       values (?, ?, ?, ?, ?)
       on conflict (organization_id) do update set
        access_token = excluded.access_token,
        refresh_token = excluded.refresh_token,
        client_token = excluded.client_token,
        expires_date_utc = excluded.expires_date_utc,
        expires_in_seconds = excluded.expires_in_seconds`,
    ).run(organizationId, organizationSlug, accessToken, refreshToken, clientToken);

    db.close();
  };

  const getCredentialsByClientToken = async (clientToken: string): Promise<OAuthCredentials | null> => {
    const db = await openDB(config?.sqlite?.path || DEF_SQLITE_PATH, config?.sqlite?.options);

    const queryRes: {
      access_token: string;
      refresh_token: string;
      organization_id: number;
      organization_slug: string;
      client_token: string;
      expires_date_utc: string;
      expires_in_seconds: number;
    } = db
      .prepare(
        `select 
           access_token, 
           refresh_token, 
           organization_id,
           organization_slug,
           client_token,
           expires_date_utc,
           expires_in_seconds
         from oauth_credentials 
         where client_token = ?`,
      )
      .get(clientToken);

    db.close();

    if (!queryRes) {
      return null;
    }

    return {
      accessToken: queryRes.access_token,
      refreshToken: queryRes.refresh_token,
      expiresDateUTC: new Date(queryRes.expires_date_utc),
      expiresInSeconds: queryRes.expires_in_seconds,
      organizationId: queryRes.organization_id,
      organizationSlug: queryRes.organization_slug,
      clientToken,
    };
  };

  const getCredentialsByOrganizationId = async (organizationId: number): Promise<OAuthCredentials | null> => {
    const db = await openDB(config?.sqlite?.path || DEF_SQLITE_PATH, config?.sqlite?.options);

    const queryRes: {
      access_token: string;
      refresh_token: string;
      organization_id: number;
      organization_slug: string;
      client_token: string;
      expires_date_utc: string;
      expires_in_seconds: number;
    } = db
      .prepare(
        `select
            access_token,
            refresh_token,
            organization_id,
            organization_slug,
            expires_date_utc,
            expires_in_seconds,
            client_token
          from oauth_credentials
          where organization_id = ?`,
      )
      .get(organizationId);

    db.close();

    if (!queryRes) {
      return null;
    }

    return {
      accessToken: queryRes.access_token,
      refreshToken: queryRes.refresh_token,
      organizationId: queryRes.organization_id,
      organizationSlug: queryRes.organization_slug,
      clientToken: queryRes.client_token,
      expiresDateUTC: new Date(queryRes.expires_date_utc),
      expiresInSeconds: queryRes.expires_in_seconds,
    };
  };

  return {
    getCredentialsByClientToken,
    getCredentialsByOrganizationId,
    saveCredentials,
  };
};
