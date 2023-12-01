import { ApolloClient, ApolloClientOptions } from '@apollo/client/core';
import { Options } from 'better-sqlite3';
import { RequestHandler } from 'express';
import { IncomingMessage } from 'http';
import internal from 'stream';
import { Connect, InlineConfig } from 'vite';

/** Override the default Riseact hosts */
export interface RiseactHosts {
  /** Accounts host. Default to https://accounts.riseact.org */
  accounts: string;
  /** Core host. Default to https://core.riseact.org */
  core: string;
}

/** Base configuration to connect your app to Riseact.
 *
 * See {@link https://help.riseact.org/en/manuale/applications/ docs} to get started with Riseact Apps
 */
export interface RiseactConfig {
  /** Authentication configuration for the app */
  auth: AuthConfig;
  /** Storage configuration for the app */
  storage?: StorageConfig;
  /** Network configuration for the app */
  network?: NetworkConfig;
  /** Dev tools configuration for the app */
  dev?: DevConfig;

  /** Disable the DNS order override (required for node >= 15 to enable subdomains) Default: false */
  disableDnsOrderOverride?: boolean;

  /** Override the default Riseact hosts */
  hosts?: RiseactHosts;
}

export interface RiseactInstance {
  auth: RiseactAuth;
  storage: StorageDriver;
  network: RiseactNetwork;
  devTools: RiseactDevTools;
}

export interface RiseactAuth {
  /** Middleware that add the OAuth flow to your app.
   *
   * See {@link https://help.riseact.org/en/manuale/applications/ docs} to learn how to use it
   */
  authMiddleware: RequestHandler;
}

/* -------------------------------------------------------------------------- */
/*                                    Auth                                    */
/* -------------------------------------------------------------------------- */

export interface OnAuthenticatedParams {
  gqlClient: ApolloClient<unknown>;
  organizationId: number;
  clientToken: string;
  refreshToken: string;
  accessToken: string;
  expiresDateUTC: Date;
  expiresInSeconds: number;
}

export interface AuthConfig {
  /** Client ID generated from Riseact. See {@link https://help.riseact.org/en/manuale/applications/ docs} to learn how to create one */
  clientId: string;
  /** Client secret generated from Riseact. See {@link https://help.riseact.org/en/manuale/applications/ docs} to learn how to create one */
  clientSecret: string;

  /** The OAuth callback url. Change it if you use a custom implementation instead of {@link RiseactAuth.authMiddleware} */
  redirectUri?: string;

  /** Callback to run after a successful installation of the app */
  onInstall?: (callbackParams: OnAuthenticatedParams) => Promise<void>;

  /** Callback to run after a successful login of the user */
  onLogin?: (callbackParams: OnAuthenticatedParams) => Promise<void>;
}

/** Credentials returned by Riseact after a successful OAuth flow */
export interface OAuthCredentials {
  /** The token used to refresh the access token */
  refreshToken: string;
  /** The token used to authenticate your app in the Riseact API */
  accessToken: string;
  /** Organization ID of the user */
  organizationId: number;
  /** The token used to authenticate your users in the app */
  clientToken: string;
  /** The timestamp when the access token expires */
  expiresInSeconds: number;
  /** The Date when the access token expires in UTC */
  expiresDateUTC: Date;
}

/* -------------------------------------------------------------------------- */
/*                                   Storage                                  */
/* -------------------------------------------------------------------------- */

export type SqliteOptions = Options;

export interface StorageConfig {
  /** The type of storage to use. Default: 'memory' */
  type: 'sqlite' | 'memory' | 'custom';

  /** Custom configuration for sqlite */
  sqlite?: {
    /** The path to the sqlite database. Default: './credentials.db' */
    path?: string;
    /** The options to pass to the sqlite database. */
    options?: SqliteOptions;
  };

  /** Custom storage driver */
  custom?: StorageDriver;
}

/** Interface to implement to use a custom storage driver */
export interface StorageDriver {
  getCredentialsByClientToken: (token: string) => Promise<OAuthCredentials | null>;
  getCredentialsByOrganizationId: (organizationId: number) => Promise<OAuthCredentials | null>;
  saveCredentials: (credentials: OAuthCredentials) => Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*                                   Network                                  */
/* -------------------------------------------------------------------------- */

export interface NetworkConfig {
  /** Define a custom middleware to run before the request is rewrote to Riseact  */
  gqlRewriterMiddleware?: RequestHandler;
}

export interface RiseactNetwork {
  /** The request handler to use to proxy GraphQL requests to Riseact from your frontend.
   *
   * See {@link https://help.riseact.org/en/manuale/applications/ docs} to learn how to use it
   */
  gqlRewriterHandler: RequestHandler;

  /** The Apollo client to use to make GraphQL requests to Riseact from your backend. */
  createGqlClient: (organizationId: number, options?: ApolloClientOptions<unknown>) => Promise<ApolloClient<unknown>>;
}

/* -------------------------------------------------------------------------- */
/*                                 Development                                */
/* -------------------------------------------------------------------------- */

/** Configuration to use when developing your app */
export interface DevConfig {
  /** The port where your app is served. Default: 3000 */
  devPort?: number;

  /** The port where the HMR server is served. Default: 443 (to use ngrok tunnel). Use 3030 to use locally */
  hmrClientPort?: number;

  /** Override the default Vite configuration */
  viteConfig?: InlineConfig;
}

export type ServerEventListener = (req: IncomingMessage, socket: internal.Duplex, head: Buffer) => void;

export interface RiseactDevTools {
  devMiddleware: Connect.Server;
  hmrProxyHandler: ServerEventListener;
}
