import { NextFunction, Request, RequestHandler, Response } from 'express';

import {
  WebhookDataCampaignCreated,
  WebhookDataCampaignDeleted,
  WebhookDataCampaignUpdated,
  WebhookDataCheckoutClosed,
  WebhookDataCheckoutCreated,
  WebhookDataCheckoutPaid,
  WebhookDataCheckoutUpdated,
  WebhookDataDonationCreated,
  WebhookDataDonationUpdated,
  WebhookDataMixedPayload,
  WebhookDataPaymentCreated,
  WebhookDataPaymentUpdated,
  WebhookDataSupporterCreated,
  WebhookDataSupporterDeleted,
  WebhookDataSupporterUpdated,
  WebhookEventTopic,
} from '../types';
import { hashString } from '../utils/hash';

function registerWebhook(event: WebhookEventTopic.SupporterCreated, callback: (payload: WebhookDataSupporterCreated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.SupporterUpdated, callback: (payload: WebhookDataSupporterUpdated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.SupporterDeleted, callback: (payload: WebhookDataSupporterDeleted) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.CampaignCreated, callback: (payload: WebhookDataCampaignCreated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.CampaignDeleted, callback: (payload: WebhookDataCampaignDeleted) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.CampaignUpdated, callback: (payload: WebhookDataCampaignUpdated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.CheckoutClosed, callback: (payload: WebhookDataCheckoutClosed) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.CheckoutCreated, callback: (payload: WebhookDataCheckoutCreated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.CheckoutPaid, callback: (payload: WebhookDataCheckoutPaid) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.CheckoutUpdated, callback: (payload: WebhookDataCheckoutUpdated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.DonationCreated, callback: (payload: WebhookDataDonationCreated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.DonationUpdated, callback: (payload: WebhookDataDonationUpdated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.PaymentCreated, callback: (payload: WebhookDataPaymentCreated) => any): RequestHandler;
function registerWebhook(event: WebhookEventTopic.PaymentUpdated, callback: (payload: WebhookDataPaymentUpdated) => any): RequestHandler;
function registerWebhook(event: Array<WebhookEventTopic>, callback: (payload: WebhookDataMixedPayload) => any): RequestHandler;

function registerWebhook(event: WebhookEventTopic | Array<WebhookEventTopic>, callback: (payload: any) => any): RequestHandler {
  if (!Array.isArray(event)) {
    event = [event];
  }

  // Create webhook url
  const url = '/webhooks/' + 'wh_' + hashString(event.join());

  // Register webhook in riseact
  // !! all webhooks must be cleared on server start. not now
  // todo register webhook in riseact w gql

  console.info(`[RISEACT-SDK] Registered webhook for ${event.join(', ')} at ${url}`);

  // Return request handler
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.url === url) {
      callback(req.body);
      res.sendStatus(200);
    } else {
      next();
    }
  };
}

export default registerWebhook;
