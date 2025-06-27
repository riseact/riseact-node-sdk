export var ActivityCategory;
(function (ActivityCategory) {
    ActivityCategory["Email"] = "EMAIL";
    ActivityCategory["Letter"] = "LETTER";
    ActivityCategory["Meeting"] = "MEETING";
    ActivityCategory["PhoneCall"] = "PHONE_CALL";
    ActivityCategory["Reminder"] = "REMINDER";
    ActivityCategory["Todo"] = "TODO";
    ActivityCategory["Whatsapp"] = "WHATSAPP";
})(ActivityCategory || (ActivityCategory = {}));
export var ActivitySubject;
(function (ActivitySubject) {
    ActivitySubject["Donation"] = "DONATION";
    ActivitySubject["Supporter"] = "SUPPORTER";
})(ActivitySubject || (ActivitySubject = {}));
export var ApplicationType;
(function (ApplicationType) {
    ApplicationType["Admin"] = "ADMIN";
    ApplicationType["Cli"] = "CLI";
    ApplicationType["Internal"] = "INTERNAL";
    ApplicationType["Kiosk"] = "KIOSK";
    ApplicationType["Partners"] = "PARTNERS";
    ApplicationType["Pod"] = "POD";
    ApplicationType["Private"] = "PRIVATE";
    ApplicationType["Public"] = "PUBLIC";
    ApplicationType["Sitefront"] = "SITEFRONT";
})(ApplicationType || (ApplicationType = {}));
export var AssetType;
(function (AssetType) {
    AssetType["Asset"] = "ASSET";
    AssetType["Config"] = "CONFIG";
    AssetType["Layout"] = "LAYOUT";
    AssetType["Manifest"] = "MANIFEST";
    AssetType["Section"] = "SECTION";
    AssetType["Snippet"] = "SNIPPET";
    AssetType["Template"] = "TEMPLATE";
})(AssetType || (AssetType = {}));
export var BillingPlanType;
(function (BillingPlanType) {
    BillingPlanType["Development"] = "DEVELOPMENT";
    BillingPlanType["Grow"] = "GROW";
    BillingPlanType["Hero"] = "HERO";
    BillingPlanType["Master"] = "MASTER";
    BillingPlanType["PayAsYouGo"] = "PAY_AS_YOU_GO";
    BillingPlanType["Platform"] = "PLATFORM";
    BillingPlanType["Team"] = "TEAM";
})(BillingPlanType || (BillingPlanType = {}));
export var CampaignCommentStatus;
(function (CampaignCommentStatus) {
    CampaignCommentStatus["Approved"] = "APPROVED";
    CampaignCommentStatus["Pending"] = "PENDING";
    CampaignCommentStatus["Rejected"] = "REJECTED";
})(CampaignCommentStatus || (CampaignCommentStatus = {}));
export var CampaignType;
(function (CampaignType) {
    CampaignType["Donation"] = "DONATION";
    CampaignType["Lead"] = "LEAD";
})(CampaignType || (CampaignType = {}));
export var CheckoutState;
(function (CheckoutState) {
    CheckoutState["Closed"] = "CLOSED";
    CheckoutState["Open"] = "OPEN";
})(CheckoutState || (CheckoutState = {}));
export var CommentSubject;
(function (CommentSubject) {
    CommentSubject["Checkout"] = "CHECKOUT";
    CommentSubject["Donation"] = "DONATION";
    CommentSubject["Supporter"] = "SUPPORTER";
})(CommentSubject || (CommentSubject = {}));
export var Currencies;
(function (Currencies) {
    Currencies["Eur"] = "EUR";
    Currencies["Gbp"] = "GBP";
    Currencies["Usd"] = "USD";
})(Currencies || (Currencies = {}));
export var CustomFieldEntity;
(function (CustomFieldEntity) {
    CustomFieldEntity["Article"] = "ARTICLE";
    CustomFieldEntity["Blog"] = "BLOG";
    CustomFieldEntity["Campaign"] = "CAMPAIGN";
    CustomFieldEntity["Donation"] = "DONATION";
    CustomFieldEntity["Page"] = "PAGE";
    CustomFieldEntity["Project"] = "PROJECT";
    CustomFieldEntity["Supporter"] = "SUPPORTER";
})(CustomFieldEntity || (CustomFieldEntity = {}));
export var CustomFieldEntityFilterOperator;
(function (CustomFieldEntityFilterOperator) {
    CustomFieldEntityFilterOperator["Contains"] = "CONTAINS";
    CustomFieldEntityFilterOperator["Endswith"] = "ENDSWITH";
    CustomFieldEntityFilterOperator["Eq"] = "EQ";
    CustomFieldEntityFilterOperator["Gt"] = "GT";
    CustomFieldEntityFilterOperator["Gte"] = "GTE";
    CustomFieldEntityFilterOperator["Icontains"] = "ICONTAINS";
    CustomFieldEntityFilterOperator["Lt"] = "LT";
    CustomFieldEntityFilterOperator["Lte"] = "LTE";
    CustomFieldEntityFilterOperator["Neq"] = "NEQ";
    CustomFieldEntityFilterOperator["Startswith"] = "STARTSWITH";
})(CustomFieldEntityFilterOperator || (CustomFieldEntityFilterOperator = {}));
export var CustomFieldType;
(function (CustomFieldType) {
    CustomFieldType["Boolean"] = "BOOLEAN";
    CustomFieldType["Date"] = "DATE";
    CustomFieldType["Datetime"] = "DATETIME";
    CustomFieldType["Decimal"] = "DECIMAL";
    CustomFieldType["File"] = "FILE";
    CustomFieldType["Integer"] = "INTEGER";
    CustomFieldType["MultilineText"] = "MULTILINE_TEXT";
    CustomFieldType["Richtext"] = "RICHTEXT";
    CustomFieldType["Text"] = "TEXT";
})(CustomFieldType || (CustomFieldType = {}));
export var DomainStatus;
(function (DomainStatus) {
    DomainStatus["Active"] = "ACTIVE";
    DomainStatus["Pending"] = "PENDING";
})(DomainStatus || (DomainStatus = {}));
export var DomainType;
(function (DomainType) {
    DomainType["Primary"] = "PRIMARY";
    DomainType["Redirect"] = "REDIRECT";
})(DomainType || (DomainType = {}));
export var DonationState;
(function (DonationState) {
    DonationState["Active"] = "ACTIVE";
    DonationState["Done"] = "DONE";
    DonationState["Draft"] = "DRAFT";
    DonationState["PastDue"] = "PAST_DUE";
    DonationState["Pending"] = "PENDING";
    DonationState["Revoked"] = "REVOKED";
})(DonationState || (DonationState = {}));
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["BadInput"] = "BAD_INPUT";
    ErrorCode["NotFound"] = "NOT_FOUND";
    ErrorCode["NotUnique"] = "NOT_UNIQUE";
    ErrorCode["Protected"] = "PROTECTED";
})(ErrorCode || (ErrorCode = {}));
export var ExportFormat;
(function (ExportFormat) {
    ExportFormat["Csv"] = "CSV";
    ExportFormat["Xlsx"] = "XLSX";
})(ExportFormat || (ExportFormat = {}));
export var FlowType;
(function (FlowType) {
    FlowType["Anonymous"] = "ANONYMOUS";
    FlowType["SupporterDataOptional"] = "SUPPORTER_DATA_OPTIONAL";
    FlowType["SupporterDataRequired"] = "SUPPORTER_DATA_REQUIRED";
})(FlowType || (FlowType = {}));
export var Frequency;
(function (Frequency) {
    Frequency["Annually"] = "ANNUALLY";
    Frequency["Monthly"] = "MONTHLY";
    Frequency["Oneoff"] = "ONEOFF";
})(Frequency || (Frequency = {}));
export var MenuItemType;
(function (MenuItemType) {
    MenuItemType["Article"] = "ARTICLE";
    MenuItemType["Blog"] = "BLOG";
    MenuItemType["Campaign"] = "CAMPAIGN";
    MenuItemType["External"] = "EXTERNAL";
    MenuItemType["Homepage"] = "HOMEPAGE";
    MenuItemType["Page"] = "PAGE";
    MenuItemType["Project"] = "PROJECT";
})(MenuItemType || (MenuItemType = {}));
export var NotificationCode;
(function (NotificationCode) {
    NotificationCode["CheckoutSendLink"] = "CHECKOUT_SEND_LINK";
    NotificationCode["DonationAbandoned"] = "DONATION_ABANDONED";
    NotificationCode["DonationInstructions"] = "DONATION_INSTRUCTIONS";
    NotificationCode["DonationReceived"] = "DONATION_RECEIVED";
    NotificationCode["DonationRefunded"] = "DONATION_REFUNDED";
    NotificationCode["P2PDonationReceived"] = "P2P_DONATION_RECEIVED";
    NotificationCode["P2PWelcome"] = "P2P_WELCOME";
    NotificationCode["StaffDonationReceived"] = "STAFF_DONATION_RECEIVED";
    NotificationCode["StaffDonationRefunded"] = "STAFF_DONATION_REFUNDED";
    NotificationCode["SupporterLogin"] = "SUPPORTER_LOGIN";
    NotificationCode["TaxCertificate"] = "TAX_CERTIFICATE";
})(NotificationCode || (NotificationCode = {}));
export var NotificationMethods;
(function (NotificationMethods) {
    NotificationMethods["Email"] = "EMAIL";
    NotificationMethods["Sms"] = "SMS";
})(NotificationMethods || (NotificationMethods = {}));
export var OnboardingStatus;
(function (OnboardingStatus) {
    OnboardingStatus["Active"] = "ACTIVE";
    OnboardingStatus["Expired"] = "EXPIRED";
    OnboardingStatus["FreePlan"] = "FREE_PLAN";
    OnboardingStatus["MissingData"] = "MISSING_DATA";
})(OnboardingStatus || (OnboardingStatus = {}));
export var PaperDocumentCode;
(function (PaperDocumentCode) {
    PaperDocumentCode["DonationReceipt"] = "DONATION_RECEIPT";
})(PaperDocumentCode || (PaperDocumentCode = {}));
export var PaymentProcessor;
(function (PaymentProcessor) {
    PaymentProcessor["Manual"] = "MANUAL";
    PaymentProcessor["Paypal"] = "PAYPAL";
    PaymentProcessor["Satispay"] = "SATISPAY";
    PaymentProcessor["Stripe"] = "STRIPE";
})(PaymentProcessor || (PaymentProcessor = {}));
export var PaymentState;
(function (PaymentState) {
    PaymentState["Failed"] = "FAILED";
    PaymentState["Paid"] = "PAID";
    PaymentState["Pending"] = "PENDING";
    PaymentState["Refunded"] = "REFUNDED";
})(PaymentState || (PaymentState = {}));
export var PlanPaymentMethodType;
(function (PlanPaymentMethodType) {
    PlanPaymentMethodType["Card"] = "CARD";
    PlanPaymentMethodType["Sdd"] = "SDD";
})(PlanPaymentMethodType || (PlanPaymentMethodType = {}));
export var ProjectCampaignsOrder;
(function (ProjectCampaignsOrder) {
    ProjectCampaignsOrder["AlphaAz"] = "ALPHA_AZ";
    ProjectCampaignsOrder["AlphaZa"] = "ALPHA_ZA";
    ProjectCampaignsOrder["Manual"] = "MANUAL";
    ProjectCampaignsOrder["Newer"] = "NEWER";
    ProjectCampaignsOrder["Older"] = "OLDER";
})(ProjectCampaignsOrder || (ProjectCampaignsOrder = {}));
export var ProjectRuleField;
(function (ProjectRuleField) {
    ProjectRuleField["Tags"] = "TAGS";
    ProjectRuleField["Title"] = "TITLE";
})(ProjectRuleField || (ProjectRuleField = {}));
export var ProjectRuleMatchType;
(function (ProjectRuleMatchType) {
    ProjectRuleMatchType["All"] = "ALL";
    ProjectRuleMatchType["Any"] = "ANY";
})(ProjectRuleMatchType || (ProjectRuleMatchType = {}));
export var ProjectRuleOperator;
(function (ProjectRuleOperator) {
    ProjectRuleOperator["Contains"] = "CONTAINS";
    ProjectRuleOperator["EndsWith"] = "ENDS_WITH";
    ProjectRuleOperator["EqualsTo"] = "EQUALS_TO";
    ProjectRuleOperator["NotContains"] = "NOT_CONTAINS";
    ProjectRuleOperator["NotEqualsTo"] = "NOT_EQUALS_TO";
    ProjectRuleOperator["StartsWith"] = "STARTS_WITH";
})(ProjectRuleOperator || (ProjectRuleOperator = {}));
export var ProjectType;
(function (ProjectType) {
    ProjectType["Dynamic"] = "DYNAMIC";
    ProjectType["Manual"] = "MANUAL";
})(ProjectType || (ProjectType = {}));
export var SegmentEntity;
(function (SegmentEntity) {
    SegmentEntity["Supporter"] = "SUPPORTER";
})(SegmentEntity || (SegmentEntity = {}));
export var Sex;
(function (Sex) {
    Sex["Female"] = "FEMALE";
    Sex["Male"] = "MALE";
})(Sex || (Sex = {}));
export var SexFilter;
(function (SexFilter) {
    SexFilter["Female"] = "FEMALE";
    SexFilter["Male"] = "MALE";
    SexFilter["NotSpecified"] = "NOT_SPECIFIED";
})(SexFilter || (SexFilter = {}));
export var StaffInvitationStatus;
(function (StaffInvitationStatus) {
    StaffInvitationStatus["Accepted"] = "ACCEPTED";
    StaffInvitationStatus["Canceled"] = "CANCELED";
    StaffInvitationStatus["Pending"] = "PENDING";
    StaffInvitationStatus["Rejected"] = "REJECTED";
})(StaffInvitationStatus || (StaffInvitationStatus = {}));
export var StaffInvitationType;
(function (StaffInvitationType) {
    StaffInvitationType["Internal"] = "INTERNAL";
    StaffInvitationType["Partner"] = "PARTNER";
})(StaffInvitationType || (StaffInvitationType = {}));
export var StaffPermission;
(function (StaffPermission) {
    StaffPermission["ActivityRead"] = "ACTIVITY_READ";
    StaffPermission["ActivityWrite"] = "ACTIVITY_WRITE";
    StaffPermission["ApplicationInstall"] = "APPLICATION_INSTALL";
    StaffPermission["ApplicationRead"] = "APPLICATION_READ";
    StaffPermission["CampaignRead"] = "CAMPAIGN_READ";
    StaffPermission["CampaignWrite"] = "CAMPAIGN_WRITE";
    StaffPermission["DboxRead"] = "DBOX_READ";
    StaffPermission["DboxWrite"] = "DBOX_WRITE";
    StaffPermission["DonationExport"] = "DONATION_EXPORT";
    StaffPermission["DonationRead"] = "DONATION_READ";
    StaffPermission["DonationWrite"] = "DONATION_WRITE";
    StaffPermission["PaymentRead"] = "PAYMENT_READ";
    StaffPermission["PaymentWrite"] = "PAYMENT_WRITE";
    StaffPermission["ProjectRead"] = "PROJECT_READ";
    StaffPermission["ProjectWrite"] = "PROJECT_WRITE";
    StaffPermission["ReportsRead"] = "REPORTS_READ";
    StaffPermission["SitefrontContent"] = "SITEFRONT_CONTENT";
    StaffPermission["SitefrontNavigation"] = "SITEFRONT_NAVIGATION";
    StaffPermission["SitefrontThemes"] = "SITEFRONT_THEMES";
    StaffPermission["SitefrontThemesCode"] = "SITEFRONT_THEMES_CODE";
    StaffPermission["SupporterExport"] = "SUPPORTER_EXPORT";
    StaffPermission["SupporterRead"] = "SUPPORTER_READ";
    StaffPermission["SupporterWrite"] = "SUPPORTER_WRITE";
})(StaffPermission || (StaffPermission = {}));
export var StaffRole;
(function (StaffRole) {
    StaffRole["Admin"] = "ADMIN";
    StaffRole["User"] = "USER";
})(StaffRole || (StaffRole = {}));
export var StaffStatus;
(function (StaffStatus) {
    StaffStatus["Active"] = "ACTIVE";
    StaffStatus["Deleted"] = "DELETED";
    StaffStatus["Suspended"] = "SUSPENDED";
})(StaffStatus || (StaffStatus = {}));
export var StaffType;
(function (StaffType) {
    StaffType["Internal"] = "INTERNAL";
    StaffType["Partner"] = "PARTNER";
})(StaffType || (StaffType = {}));
export var StripeCardBrand;
(function (StripeCardBrand) {
    StripeCardBrand["Amex"] = "AMEX";
    StripeCardBrand["Diners"] = "DINERS";
    StripeCardBrand["Discover"] = "DISCOVER";
    StripeCardBrand["Jcb"] = "JCB";
    StripeCardBrand["Mastercard"] = "MASTERCARD";
    StripeCardBrand["Unionpay"] = "UNIONPAY";
    StripeCardBrand["Unknown"] = "UNKNOWN";
    StripeCardBrand["Visa"] = "VISA";
})(StripeCardBrand || (StripeCardBrand = {}));
export var StripeCardFunding;
(function (StripeCardFunding) {
    StripeCardFunding["Credit"] = "CREDIT";
    StripeCardFunding["Debit"] = "DEBIT";
    StripeCardFunding["Prepaid"] = "PREPAID";
    StripeCardFunding["Unknown"] = "UNKNOWN";
})(StripeCardFunding || (StripeCardFunding = {}));
export var StripePaymentType;
(function (StripePaymentType) {
    StripePaymentType["CreditCard"] = "CREDIT_CARD";
    StripePaymentType["Pos"] = "POS";
    StripePaymentType["SepaDirectDebit"] = "SEPA_DIRECT_DEBIT";
})(StripePaymentType || (StripePaymentType = {}));
export var SupporterBulkTagAction;
(function (SupporterBulkTagAction) {
    SupporterBulkTagAction["Add"] = "ADD";
    SupporterBulkTagAction["Remove"] = "REMOVE";
})(SupporterBulkTagAction || (SupporterBulkTagAction = {}));
export var SupporterType;
(function (SupporterType) {
    SupporterType["Company"] = "COMPANY";
    SupporterType["Family"] = "FAMILY";
    SupporterType["Group"] = "GROUP";
    SupporterType["Individual"] = "INDIVIDUAL";
    SupporterType["Organization"] = "ORGANIZATION";
})(SupporterType || (SupporterType = {}));
export var TemplateType;
(function (TemplateType) {
    TemplateType["Blog"] = "BLOG";
    TemplateType["Campaign"] = "CAMPAIGN";
    TemplateType["Homepage"] = "HOMEPAGE";
    TemplateType["Page"] = "PAGE";
})(TemplateType || (TemplateType = {}));
export var TimelineEventSubject;
(function (TimelineEventSubject) {
    TimelineEventSubject["Checkout"] = "CHECKOUT";
    TimelineEventSubject["Donation"] = "DONATION";
    TimelineEventSubject["Supporter"] = "SUPPORTER";
})(TimelineEventSubject || (TimelineEventSubject = {}));
export var TimelineEventTopic;
(function (TimelineEventTopic) {
    TimelineEventTopic["ActivityCreated"] = "ACTIVITY_CREATED";
    TimelineEventTopic["ActivityDeleted"] = "ACTIVITY_DELETED";
    TimelineEventTopic["ActivityUpdated"] = "ACTIVITY_UPDATED";
    TimelineEventTopic["CampaignCreated"] = "CAMPAIGN_CREATED";
    TimelineEventTopic["CampaignDeleted"] = "CAMPAIGN_DELETED";
    TimelineEventTopic["CampaignUpdated"] = "CAMPAIGN_UPDATED";
    TimelineEventTopic["CheckoutClosed"] = "CHECKOUT_CLOSED";
    TimelineEventTopic["CheckoutCreated"] = "CHECKOUT_CREATED";
    TimelineEventTopic["CheckoutUpdated"] = "CHECKOUT_UPDATED";
    TimelineEventTopic["CommentCreated"] = "COMMENT_CREATED";
    TimelineEventTopic["DonationCreated"] = "DONATION_CREATED";
    TimelineEventTopic["DonationUpdated"] = "DONATION_UPDATED";
    TimelineEventTopic["PaymentCreated"] = "PAYMENT_CREATED";
    TimelineEventTopic["PaymentUpdated"] = "PAYMENT_UPDATED";
    TimelineEventTopic["SupporterCreated"] = "SUPPORTER_CREATED";
    TimelineEventTopic["SupporterDeleted"] = "SUPPORTER_DELETED";
    TimelineEventTopic["SupporterDonationCreated"] = "SUPPORTER_DONATION_CREATED";
    TimelineEventTopic["SupporterUpdated"] = "SUPPORTER_UPDATED";
    TimelineEventTopic["TotemRegistered"] = "TOTEM_REGISTERED";
})(TimelineEventTopic || (TimelineEventTopic = {}));
export var WebDocumentVisibility;
(function (WebDocumentVisibility) {
    WebDocumentVisibility["Archived"] = "ARCHIVED";
    WebDocumentVisibility["Published"] = "PUBLISHED";
    WebDocumentVisibility["Unpublished"] = "UNPUBLISHED";
})(WebDocumentVisibility || (WebDocumentVisibility = {}));
export var WebhookEventTopic;
(function (WebhookEventTopic) {
    WebhookEventTopic["CampaignCreated"] = "CAMPAIGN_CREATED";
    WebhookEventTopic["CampaignDeleted"] = "CAMPAIGN_DELETED";
    WebhookEventTopic["CampaignUpdated"] = "CAMPAIGN_UPDATED";
    WebhookEventTopic["CheckoutClosed"] = "CHECKOUT_CLOSED";
    WebhookEventTopic["CheckoutCreated"] = "CHECKOUT_CREATED";
    WebhookEventTopic["CheckoutPaid"] = "CHECKOUT_PAID";
    WebhookEventTopic["CheckoutUpdated"] = "CHECKOUT_UPDATED";
    WebhookEventTopic["DonationCreated"] = "DONATION_CREATED";
    WebhookEventTopic["DonationUpdated"] = "DONATION_UPDATED";
    WebhookEventTopic["PaymentCreated"] = "PAYMENT_CREATED";
    WebhookEventTopic["PaymentUpdated"] = "PAYMENT_UPDATED";
    WebhookEventTopic["SupporterCreated"] = "SUPPORTER_CREATED";
    WebhookEventTopic["SupporterDeleted"] = "SUPPORTER_DELETED";
    WebhookEventTopic["SupporterUpdated"] = "SUPPORTER_UPDATED";
})(WebhookEventTopic || (WebhookEventTopic = {}));
export const CampaignCreateDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CampaignCreate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CampaignInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "campaignCreate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "campaign" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "note" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "userErrors" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "field" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }] } }] } }] } }] };
export const CampaignsListDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "CampaignsList" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "pagination" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "PaginationInput" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "filters" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CampaignFilters" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "campaigns" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "pagination" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "pagination" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filters" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "filters" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startCursor" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endCursor" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasNextPage" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasPreviousPage" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cursor" } }, { "kind": "Field", "name": { "kind": "Name", "value": "node" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "visibility" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cover" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "square" } }] } }] } }] } }] } }] } }] };
export const GetOrganizationInfoDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetOrganizationInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "organization" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "square" } }] } }] } }] } }] };
export const CampaignDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Campaign" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "campaignId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "campaign" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "campaignId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "visibility" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "cover" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "small" } }, { "kind": "Field", "name": { "kind": "Name", "value": "url" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "createDate" } }] } }] } }] };
export const CampaignUpdateDetailDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CampaignUpdateDetail" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CampaignInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "campaignUpdate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "campaign" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "userErrors" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "field" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }] } }] } }] } }] };
