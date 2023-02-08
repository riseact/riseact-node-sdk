import sqliteDriver from 'better-sqlite3';

import { DEF_SQLITE_PATH } from '../config/consts';
import {
  OAuthCredentials,
  SqliteInstance,
  SqliteOptions,
  StorageConfig,
  TokenStorage,
} from '../types';

const initDB = (db: sqliteDriver.Database) => {
  db.prepare(
    `create table if not exists client_tokens (
       token text not null primary key,
       organization_id int not null
     )`,
  ).run();

  db.prepare(
    `create table if not exists oauth_credentials (
       organization_id int not null primary key, 
       access_token text not null, 
       refresh_token text not null
     )`,
  ).run();
  db.pragma('journal_mode = WAL');
};

const openDB = (path = DEF_SQLITE_PATH, options?: SqliteOptions): SqliteInstance => {
  const db = sqliteDriver(path, options);
  return Object.assign(db, { init: () => initDB(db) });
};

export const SqliteDriver = (config?: StorageConfig): TokenStorage => {
  const db = openDB(config?.sqlite?.path, config?.sqlite?.options);
  initDB(db);

  const saveCredentials = async (credentials: OAuthCredentials) => {
    const { refreshToken, accessToken, organizationId, clientToken } = credentials;
    const db = openDB(config?.sqlite?.path || DEF_SQLITE_PATH, config?.sqlite?.options);

    // Check if organization already exists
    const queryRes: { 'count(*)': number } = db
      .prepare(
        `select count(*) 
         from oauth_credentials 
         where organization_id = ?`,
      )
      .get(organizationId);

    // Save oauth credentials of the first user
    if (!queryRes['count(*)']) {
      db.prepare(
        `insert into oauth_credentials (
           refresh_token, 
           access_token, 
           organization_id
         ) values (?, ?, ?)`,
      ).run(refreshToken, accessToken, organizationId);
    }

    // Save client token
    db.prepare(
      `insert into client_tokens (
         token, 
         organization_id
       ) values (?, ?)`,
    ).run(clientToken, organizationId);

    db.close();
  };

  const getCredentials = async (clientToken: string) => {
    const db = openDB(config?.sqlite?.path || DEF_SQLITE_PATH, config?.sqlite?.options);

    // Check if token exists
    const queryRes: {
      access_token: string;
      refresh_token: string;
      organization_id: number;
    } = db
      .prepare(
        `select 
           c.access_token, 
           c.refresh_token, 
           c.organization_id 
         from oauth_credentials c
         inner join client_tokens t on c.organization_id = t.organization_id
         where token = ?`,
      )
      .get(clientToken);

    db.close();

    if (!queryRes) {
      return null;
    }

    return {
      accessToken: queryRes.access_token,
      refreshToken: queryRes.refresh_token,
      organizationId: queryRes.organization_id,
      clientToken,
    };
  };

  return {
    getCredentials,
    saveCredentials,
  };
};
