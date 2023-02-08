import { Database, Options } from 'better-sqlite3';
import { RequestHandler } from 'express';

/* ---------------------------------- Auth ---------------------------------- */
export interface AuthConfig {
  clientId: string;
  clientSecret: string;

  redirectUri?: string;
}

export interface OAuthCredentials {
  refreshToken: string;
  accessToken: string;
  organizationId: number;
  clientToken: string;
}

/* --------------------------------- Storage -------------------------------- */
export interface StorageConfig {
  type: 'sqlite' | 'memory' | 'custom';

  sqlite?: {
    path?: string;
    options?: SqliteOptions;
  };

  custom?: TokenStorage;
}

export type SqliteOptions = Options;
export type SqliteInstance = Database & { init: () => void };

export interface TokenStorage {
  getCredentials: (token: string) => Promise<OAuthCredentials | null>;
  saveCredentials: (credentials: OAuthCredentials) => Promise<void>;
}

/* --------------------------------- Network -------------------------------- */
export interface NetworkConfig {
  todo?: string; // todo
}

export interface RiseactNetwork {
  gqlProxyHandler: RequestHandler;
}

/* ----------------------------- Initialization ----------------------------- */
export interface RiseactConfig {
  appHost: string;
  auth: AuthConfig;

  storage?: StorageConfig;
  network?: NetworkConfig;

  disableDnsOrderOverride?: boolean;
}

/* ----------------------------------- App ---------------------------------- */
export interface RiseactInstance {
  auth: RiseactAuth;
  storage: TokenStorage;
  network: RiseactNetwork;
}

export interface RiseactAuth {
  authMiddleware: RequestHandler;
  oauthInstallHandler: RequestHandler;
  oauthCallbackHandler: RequestHandler;
}
