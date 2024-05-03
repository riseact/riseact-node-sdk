import { NextFunction, Request, RequestHandler, Response } from 'express';

import {
  CampaignPayload,
  CheckoutPayload,
  DonationPayload,
  PaymentPayload,
  SupporterPayload,
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
  const url = '/webhooks/' + hashURL(event.join());

  // Register webhook in riseact
  // !! all webhooks must be cleared on server start. not now
  // todo register webhook in riseact w gql

  console.info(`Registered webhook for ${event.join(', ')} at ${url}`);

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

function hashURL(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  let absHash = Math.abs(hash);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let code = '';
  for (let i = 0; i < 16; i++) {
    const index = absHash % characters.length;
    code += characters.charAt(index);
    absHash = Math.floor(absHash / characters.length);
  }
  return code.toLocaleLowerCase();
}

export default registerWebhook;
