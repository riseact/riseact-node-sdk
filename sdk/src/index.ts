import initRiseactSDK from './RiseactSDK';
import {
  AppUninstalledPayload,
  AppUninstallReason,
  AuthConfig,
  CampaignPayload,
  CampaignType,
  CheckoutPayload,
  CheckoutState,
  DonationPayload,
  DonationState,
  Frequency,
  NetworkConfig,
  OAuthCredentials,
  OnUninstallParams,
  PaymentPayload,
  RiseactAuth,
  RiseactConfig,
  RiseactInstance,
  RiseactNetwork,
  StorageConfig,
  StorageAdapters,
  SupporterPayload,
  SupporterType,
  Visibility,
  WebhookDataCampaignCreated,
  WebhookDataCampaignDeleted,
  WebhookDataCampaignUpdated,
  WebhookDataCheckoutClosed,
  WebhookDataCheckoutCreated,
  WebhookDataCheckoutPaid,
  WebhookDataCheckoutUpdated,
  WebhookDataDonationCreated,
  WebhookDataDonationDeleted,
  WebhookDataDonationRevoked,
  WebhookDataDonationUpdated,
  WebhookDataPaymentCreated,
  WebhookDataPaymentUpdated,
  WebhookDataSupporterCreated,
  WebhookDataSupporterDeleted,
  WebhookDataSupporterUpdated,
  WebhookDataMixedPayload,
  WebhookEventName,
  WebhookEventNames,
  WebhookEventTopic,
  WebhooksConfig,
} from './types';

export { CampaignType, CheckoutState, DonationState, Frequency, Visibility, SupporterType, WebhookEventTopic };

export type {
  WebhookDataCampaignCreated,
  WebhookDataCampaignDeleted,
  WebhookDataCampaignUpdated,
  WebhookDataCheckoutClosed,
  WebhookDataCheckoutCreated,
  WebhookDataCheckoutPaid,
  WebhookDataCheckoutUpdated,
  WebhookDataDonationCreated,
  WebhookDataDonationDeleted,
  WebhookDataDonationRevoked,
  WebhookDataDonationUpdated,
  WebhookDataPaymentCreated,
  WebhookDataPaymentUpdated,
  WebhookDataSupporterCreated,
  WebhookDataSupporterDeleted,
  WebhookDataSupporterUpdated,
  WebhookDataMixedPayload,
  WebhookEventName,
  WebhookEventNames,
  AppUninstalledPayload,
  AppUninstallReason,
  AuthConfig,
  OAuthCredentials,
  OnUninstallParams,
  WebhooksConfig,
  StorageConfig,
  StorageAdapters,
  NetworkConfig,
  RiseactNetwork,
  RiseactConfig,
  RiseactInstance,
  RiseactAuth,
  CampaignPayload,
  DonationPayload,
  PaymentPayload,
  CheckoutPayload,
  SupporterPayload,
};

import { dangerouslyCreateGqlClientByAccessToken } from './network/createGqlClient';
import { RISEACT_ORGANIZATION_HEADER } from './config/consts';

import { verifyRiseactSignature } from './webhooks/signature';
import type { VerifyRiseactSignatureParams } from './webhooks/signature';
import { APP_UNINSTALLED_PATH } from './webhooks/appUninstalledHandler';

export { dangerouslyCreateGqlClientByAccessToken, RISEACT_ORGANIZATION_HEADER, verifyRiseactSignature, APP_UNINSTALLED_PATH };
export type { VerifyRiseactSignatureParams };

export default initRiseactSDK;
