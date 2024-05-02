import { ApolloClient, ApolloClientOptions } from '@apollo/client/core';
import { RequestHandler } from 'express';
import { IncomingMessage } from 'http';
import internal from 'stream';
import { Connect, InlineConfig } from 'vite';
import registerWebhook from './network/registerWebhook';

/* type from peer dependency better-sqlite3 */
interface Options {
  readonly?: boolean | undefined;
  fileMustExist?: boolean | undefined;
  timeout?: number | undefined;
  verbose?: ((message?: any, ...additionalArgs: any[]) => void) | undefined;
  nativeBinding?: string | undefined;
}

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

  /** Register a webhook to listen to Riseact events */
  registerWebhook: typeof registerWebhook;
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


/* -------------------------------------------------------------------------- */
/*                                Webhook types                               */
/* -------------------------------------------------------------------------- */

export enum WebhookEventTopic {
  CampaignCreated = 'CAMPAIGN_CREATED',
  CampaignDeleted = 'CAMPAIGN_DELETED',
  CampaignUpdated = 'CAMPAIGN_UPDATED',
  CheckoutClosed = 'CHECKOUT_CLOSED',
  CheckoutCreated = 'CHECKOUT_CREATED',
  CheckoutPaid = 'CHECKOUT_PAID',
  CheckoutUpdated = 'CHECKOUT_UPDATED',
  DonationCreated = 'DONATION_CREATED',
  DonationUpdated = 'DONATION_UPDATED',
  PaymentCreated = 'PAYMENT_CREATED',
  PaymentUpdated = 'PAYMENT_UPDATED',
  SupporterCreated = 'SUPPORTER_CREATED',
  SupporterDeleted = 'SUPPORTER_DELETED',
  SupporterUpdated = 'SUPPORTER_UPDATED',
}

export enum Visibility {
  Unpublished = 'unpublished',
  Published = 'published',
  Archived = 'archived',
}

export enum CampaignType {
  Lead = 'LEAD',
  Donation = 'DONATION',
}

export interface CampaignPayload {
  id: number;
  create_date: string;
  update_date: string;
  title: string;
  cover: string | null;
  excerpt: string | null;
  content: string | null;
  visibility: Visibility;
  publish_on: string | null;
  slug: string;
  seo_title: string | null;
  seo_description: string | null;
  type: CampaignType;
  goal: number | null;
  is_goal_enabled: boolean;
  allow_peer_to_peer: boolean;
  tags: string[];
}

export enum SupporterType {
  Individual = 'INDIVIDUAL',
  Company = 'COMPANY',
  Organization = 'ORGANIZATION',
  Family = 'FAMILY',
  Group = 'GROUP',
}

export interface SupporterPayload {
  id: number;
  business_name: string | null;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  job: string | null;
  sex: string | null;
  ssn: string | null;
  vat: string | null;
  city: string | null;
  code: string | null;
  note: string | null;
  tags: string[];
  email: string | null;
  image: string | null;
  phone: string | null;
  mobile: string | null;
  address: string | null;
  country: string | null;
  privacy: string | null;
  address2: string | null;
  locality: string | null;
  create_date: string;
  postal_code: string | null;
  update_date: string;
  external_ref: string | null;
  date_of_birth: string | null;
  place_of_birth: string | null;
  supporter_type: SupporterType;
  email_marketing: boolean;
  phone_marketing: boolean;
  sms_marketing: boolean;
  source_campaign: number | null;
  postal_marketing: boolean;
  certification_url: string | null;
  stripe_customer_id: string | null;
}

export enum CheckoutState {
  Open = 'OPEN',
  Closed = 'CLOSED',
}

export enum Frequency {
  Oneoff = 0,
  Monthly = 12,
}

export interface CheckoutPayload {
  id: number;
  create_date: string;
  update_date: string;
  state: CheckoutState;
  amount: number | null;
  completed_date: string | null;
  donation: number | null;
  supporter: number | null;
  frequency: Frequency | null;
  peer_campaign: number | null;
  payment_method_processor: string | null;
  payment_method_label: string | null;
  payment_method_id: number | null;
}

export enum DonationState {
  Draft = 'draft',
  Pending = 'pending',
  Active = 'active',
  PastDue = 'past_due',
  Done = 'done',
  Revoked = 'revoked',
}

export interface DonationPayload {
  id: number;
  create_date: string;
  update_date: string;
  code: string;
  state: DonationState;
  amount: number;
  frequency: Frequency;
  completed_date: string | null;
  campaign: number | null;
  peer_campaign: number | null;
  supporter: number;
  tags: string[];
  payment_method_label: string | null;
  payment_method_processor: string | null;
}

export interface PaymentPayload {
  id: number;
  create_date: string;
  update_date: string;
  state: string;
  amount: number;
  payment_date: string;
  payment_method_id: number | null;
  payment_method_label: string | null;
  payment_method_processor: string | null;
  frequency: Frequency;
  stripe_intent_id: string | null;
  donation: number;
  supporter: number;
  peer_campaign: number | null;
}

export interface WebhookDataSupporterCreated {
  event: WebhookEventTopic.SupporterCreated;
  object: SupporterPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataSupporterUpdated {
  event: WebhookEventTopic.SupporterUpdated;
  object: SupporterPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataSupporterDeleted {
  event: WebhookEventTopic.SupporterDeleted;
  object: SupporterPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataCampaignCreated {
  event: WebhookEventTopic.CampaignCreated;
  object: CampaignPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataCampaignDeleted {
  event: WebhookEventTopic.CampaignDeleted;
  object: CampaignPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataCampaignUpdated {
  event: WebhookEventTopic.CampaignUpdated;
  object: CampaignPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataCheckoutClosed {
  event: WebhookEventTopic.CheckoutClosed;
  object: CheckoutPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataCheckoutCreated {
  event: WebhookEventTopic.CheckoutCreated;
  object: CheckoutPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataCheckoutPaid {
  event: WebhookEventTopic.CheckoutPaid;
  object: CheckoutPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataCheckoutUpdated {
  event: WebhookEventTopic.CheckoutUpdated;
  object: CheckoutPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataDonationCreated {
  event: WebhookEventTopic.DonationCreated;
  object: DonationPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataDonationUpdated {
  event: WebhookEventTopic.DonationUpdated;
  object: DonationPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataPaymentCreated {
  event: WebhookEventTopic.PaymentCreated;
  object: PaymentPayload;
  organization: string;
  idempotency_key: string;
}

export interface WebhookDataPaymentUpdated {
  event: WebhookEventTopic.PaymentUpdated;
  object: PaymentPayload;
  organization: string;
  idempotency_key: string;
}
