import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** Date (isoformat) */
    Date: any;
    /** Date with time (isoformat) */
    DateTime: any;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf). */
    JSON: any;
    Upload: any;
    /** Represents NULL values */
    Void: any;
};
export type AccessToken = {
    __typename?: 'AccessToken';
    token: Scalars['String'];
};
export type Activity = {
    __typename?: 'Activity';
    category: ActivityCategory;
    createDate: Scalars['DateTime'];
    deadlineDate?: Maybe<Scalars['Date']>;
    doneDate?: Maybe<Scalars['Date']>;
    id: Scalars['Int'];
    note?: Maybe<Scalars['String']>;
    staff: ActivityStaff;
    updateDate: Scalars['DateTime'];
};
export declare enum ActivityCategory {
    Email = "EMAIL",
    Letter = "LETTER",
    Meeting = "MEETING",
    PhoneCall = "PHONE_CALL",
    Reminder = "REMINDER",
    Todo = "TODO",
    Whatsapp = "WHATSAPP"
}
export type ActivityConnection = {
    __typename?: 'ActivityConnection';
    edges: Array<ActivityEdge>;
    pageInfo: PageInfo;
};
export type ActivityCreateInput = {
    category: ActivityCategory;
    deadlineDate?: InputMaybe<Scalars['Date']>;
    doneDate?: InputMaybe<Scalars['Date']>;
    note?: InputMaybe<Scalars['String']>;
    staffId?: InputMaybe<Scalars['Int']>;
    subject: ActivitySubject;
    subjectId: Scalars['Int'];
};
export type ActivityEdge = {
    __typename?: 'ActivityEdge';
    cursor: Scalars['String'];
    node: Activity;
};
export type ActivityFilters = {
    donationId?: InputMaybe<Scalars['Int']>;
    dueDate?: InputMaybe<DateRange>;
    order?: InputMaybe<Scalars['String']>;
    q?: InputMaybe<Scalars['String']>;
    supporterId?: InputMaybe<Scalars['Int']>;
    userId?: InputMaybe<Scalars['Int']>;
};
export type ActivityResponse = {
    __typename?: 'ActivityResponse';
    activity?: Maybe<Activity>;
    userErrors?: Maybe<Array<UserError>>;
};
export type ActivityStaff = {
    __typename?: 'ActivityStaff';
    email: Scalars['String'];
    id: Scalars['Int'];
    name: Scalars['String'];
};
export declare enum ActivitySubject {
    Donation = "DONATION",
    Supporter = "SUPPORTER"
}
export type ActivityUpdateInput = {
    category?: InputMaybe<ActivityCategory>;
    deadlineDate?: InputMaybe<Scalars['Date']>;
    doneDate?: InputMaybe<Scalars['Date']>;
    note?: InputMaybe<Scalars['String']>;
    staffId?: InputMaybe<Scalars['Int']>;
};
export type Application = {
    __typename?: 'Application';
    accessToken: AccessToken;
    appUrl?: Maybe<Scalars['String']>;
    authorEmail?: Maybe<Scalars['String']>;
    authorHomepageUrl?: Maybe<Scalars['String']>;
    authorName?: Maybe<Scalars['String']>;
    clientId: Scalars['String'];
    clientSecret: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    installUrl?: Maybe<Scalars['String']>;
    isEmbedded: Scalars['Boolean'];
    isInstalled: Scalars['Boolean'];
    logoUrl?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    partner?: Maybe<Scalars['String']>;
    permissions: Array<StaffPermission>;
    type: ApplicationType;
};
export type ApplicationFilters = {
    installed?: InputMaybe<Scalars['Boolean']>;
    q?: InputMaybe<Scalars['String']>;
    type?: InputMaybe<ApplicationType>;
};
export type ApplicationPrivateInput = {
    description?: InputMaybe<Scalars['String']>;
    name: Scalars['String'];
    permissions?: InputMaybe<Array<StaffPermission>>;
};
export declare enum ApplicationType {
    Admin = "ADMIN",
    Cli = "CLI",
    Internal = "INTERNAL",
    Kiosk = "KIOSK",
    Partners = "PARTNERS",
    Pod = "POD",
    Private = "PRIVATE",
    Public = "PUBLIC",
    Sitefront = "SITEFRONT"
}
export type Article = {
    __typename?: 'Article';
    blog: Blog;
    content?: Maybe<Scalars['String']>;
    cover?: Maybe<Media>;
    createDate: Scalars['DateTime'];
    customfields: Array<CustomField>;
    id: Scalars['Int'];
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    sitefrontUrl: Scalars['String'];
    slug: Scalars['String'];
    template?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    updateDate: Scalars['DateTime'];
    url: Scalars['String'];
    visibility: WebDocumentVisibility;
};
export type ArticleConnection = {
    __typename?: 'ArticleConnection';
    edges: Array<ArticleEdge>;
    pageInfo: PageInfo;
};
export type ArticleEdge = {
    __typename?: 'ArticleEdge';
    cursor: Scalars['String'];
    node: Article;
};
export type ArticleInput = {
    blogId?: InputMaybe<Scalars['Int']>;
    content?: InputMaybe<Scalars['String']>;
    coverId?: InputMaybe<Scalars['Int']>;
    customfields?: InputMaybe<Array<CustomFieldInput>>;
    seoDescription?: InputMaybe<Scalars['String']>;
    seoTitle?: InputMaybe<Scalars['String']>;
    slug?: InputMaybe<Scalars['String']>;
    template?: InputMaybe<Scalars['String']>;
    title?: InputMaybe<Scalars['String']>;
    visibility?: InputMaybe<WebDocumentVisibility>;
};
export type ArticlesFiltersInput = {
    q?: InputMaybe<Scalars['String']>;
};
export type ArticlesResponse = {
    __typename?: 'ArticlesResponse';
    article?: Maybe<Article>;
    userErrors?: Maybe<Array<UserError>>;
};
export type Asset = {
    __typename?: 'Asset';
    attachment?: Maybe<Scalars['String']>;
    checksum: Scalars['String'];
    contentType: Scalars['String'];
    createdAt: Scalars['String'];
    id: Scalars['Int'];
    key: Scalars['String'];
    previewUrl: Scalars['String'];
    size: Scalars['Int'];
    staticSections?: Maybe<Scalars['JSON']>;
    templateType: TemplateType;
    theme: Theme;
    type?: Maybe<AssetType>;
    updatedAt: Scalars['String'];
    value?: Maybe<Scalars['JSON']>;
};
export type AssetInput = {
    attachment?: InputMaybe<Scalars['String']>;
    contentType: Scalars['String'];
    key: Scalars['String'];
    themeId: Scalars['Int'];
    value?: InputMaybe<Scalars['String']>;
};
export declare enum AssetType {
    Asset = "ASSET",
    Config = "CONFIG",
    Layout = "LAYOUT",
    Manifest = "MANIFEST",
    Section = "SECTION",
    Snippet = "SNIPPET",
    Template = "TEMPLATE"
}
export type AssetsFiltersInput = {
    assetType?: InputMaybe<AssetType>;
    key?: InputMaybe<Scalars['String']>;
    themeUuid?: InputMaybe<Scalars['String']>;
};
export declare enum BillingPlanType {
    Development = "DEVELOPMENT",
    Grow = "GROW",
    Hero = "HERO",
    Master = "MASTER",
    PayAsYouGo = "PAY_AS_YOU_GO",
    Platform = "PLATFORM",
    Team = "TEAM"
}
export type Block = {
    __typename?: 'Block';
    settings: Scalars['JSON'];
    type: Scalars['String'];
};
export type BlockItem = {
    __typename?: 'BlockItem';
    block: Block;
    key: Scalars['String'];
};
export type BlockSchema = {
    __typename?: 'BlockSchema';
    limit?: Maybe<Scalars['Int']>;
    name: Scalars['String'];
    settings?: Maybe<Array<Field>>;
    type: Scalars['String'];
};
export type Blog = {
    __typename?: 'Blog';
    content?: Maybe<Scalars['String']>;
    cover?: Maybe<Media>;
    createDate: Scalars['DateTime'];
    customfields: Array<CustomField>;
    id: Scalars['Int'];
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    sitefrontUrl: Scalars['String'];
    slug: Scalars['String'];
    template?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    updateDate: Scalars['DateTime'];
    url: Scalars['String'];
    visibility: WebDocumentVisibility;
};
export type BlogConnection = {
    __typename?: 'BlogConnection';
    edges: Array<BlogEdge>;
    pageInfo: PageInfo;
};
export type BlogEdge = {
    __typename?: 'BlogEdge';
    cursor: Scalars['String'];
    node: Blog;
};
export type BlogInput = {
    content?: InputMaybe<Scalars['String']>;
    coverId?: InputMaybe<Scalars['Int']>;
    customfields?: InputMaybe<Array<CustomFieldInput>>;
    seoDescription?: InputMaybe<Scalars['String']>;
    seoTitle?: InputMaybe<Scalars['String']>;
    slug?: InputMaybe<Scalars['String']>;
    template?: InputMaybe<Scalars['String']>;
    title?: InputMaybe<Scalars['String']>;
    visibility?: InputMaybe<WebDocumentVisibility>;
};
export type BlogsFiltersInput = {
    q?: InputMaybe<Scalars['String']>;
};
export type BlogsResponse = {
    __typename?: 'BlogsResponse';
    blog?: Maybe<Blog>;
    userErrors?: Maybe<Array<UserError>>;
};
export type Campaign = {
    __typename?: 'Campaign';
    allowCustomAmount: Scalars['Boolean'];
    allowCustomSubscriptionAmount: Scalars['Boolean'];
    allowPeerToPeer?: Maybe<Scalars['Boolean']>;
    asks: Array<Scalars['Float']>;
    asksSubscription: Array<Scalars['Float']>;
    content?: Maybe<Scalars['String']>;
    costExamples: Array<CostExample>;
    cover?: Maybe<Media>;
    createDate: Scalars['DateTime'];
    customfields: Array<CustomField>;
    defaultAmount?: Maybe<Scalars['Float']>;
    defaultSubscriptionAmount?: Maybe<Scalars['Float']>;
    excludedChannels: Array<Scalars['Int']>;
    goal?: Maybe<Scalars['Float']>;
    hasOneOff: Scalars['Boolean'];
    hasSubscription: Scalars['Boolean'];
    hasSubscriptionCustomOptions: Scalars['Boolean'];
    id: Scalars['Int'];
    isGoalEnabled: Scalars['Boolean'];
    maxAmount?: Maybe<Scalars['Float']>;
    maxSubscriptionAmount?: Maybe<Scalars['Float']>;
    minAmount?: Maybe<Scalars['Float']>;
    minSubscriptionAmount?: Maybe<Scalars['Float']>;
    note?: Maybe<Scalars['String']>;
    privacyFields: Array<PrivacyDefinition>;
    privacyNote?: Maybe<Scalars['String']>;
    receiptNotificationId?: Maybe<Scalars['Int']>;
    requiredFields: Array<Scalars['String']>;
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    shownFields: Array<Scalars['String']>;
    sitefrontUrl: Scalars['String'];
    slug: Scalars['String'];
    tags: Array<Scalars['String']>;
    template?: Maybe<Scalars['String']>;
    thankyouTemplate?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    type: CampaignType;
    updateDate: Scalars['DateTime'];
    url: Scalars['String'];
    visibility: WebDocumentVisibility;
};
export type CampaignComment = {
    __typename?: 'CampaignComment';
    anonymous: Scalars['Boolean'];
    campaign: Campaign;
    createDate: Scalars['DateTime'];
    id: Scalars['Int'];
    message: Scalars['String'];
    peerCampaign?: Maybe<PeerCampaign>;
    public: Scalars['Boolean'];
    status: CampaignCommentStatus;
    supporter: Supporter;
    updateDate: Scalars['DateTime'];
};
export type CampaignCommentConnection = {
    __typename?: 'CampaignCommentConnection';
    edges: Array<CampaignCommentEdge>;
    pageInfo: PageInfo;
};
export type CampaignCommentCreateInput = {
    anonymous?: Scalars['Boolean'];
    donationId: Scalars['Int'];
    message?: Scalars['String'];
    public?: Scalars['Boolean'];
    status?: CampaignCommentStatus;
};
export type CampaignCommentEdge = {
    __typename?: 'CampaignCommentEdge';
    cursor: Scalars['String'];
    node: CampaignComment;
};
export type CampaignCommentResponse = {
    __typename?: 'CampaignCommentResponse';
    comment?: Maybe<CampaignComment>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum CampaignCommentStatus {
    Approved = "APPROVED",
    Pending = "PENDING",
    Rejected = "REJECTED"
}
export type CampaignCommentUpdateInput = {
    anonymous?: InputMaybe<Scalars['Boolean']>;
    message?: InputMaybe<Scalars['String']>;
    public?: InputMaybe<Scalars['Boolean']>;
    status?: InputMaybe<CampaignCommentStatus>;
};
export type CampaignCommentsFilters = {
    campaignId?: InputMaybe<Scalars['Int']>;
    donationId?: InputMaybe<Scalars['Int']>;
    q?: InputMaybe<Scalars['String']>;
    status?: InputMaybe<CampaignCommentStatus>;
    supporterId?: InputMaybe<Scalars['Int']>;
};
export type CampaignConnection = {
    __typename?: 'CampaignConnection';
    edges: Array<CampaignEdge>;
    pageInfo: PageInfo;
};
export type CampaignEdge = {
    __typename?: 'CampaignEdge';
    cursor: Scalars['String'];
    node: Campaign;
};
export type CampaignFilters = {
    channels?: InputMaybe<Array<Scalars['String']>>;
    customfields?: InputMaybe<Array<CustomFieldEntityFilter>>;
    ids?: InputMaybe<Array<Scalars['Int']>>;
    order?: InputMaybe<Scalars['String']>;
    q?: InputMaybe<Scalars['String']>;
    tags?: InputMaybe<Array<Scalars['String']>>;
    tagsNot?: InputMaybe<Array<Scalars['String']>>;
    visibility?: InputMaybe<WebDocumentVisibility>;
};
export type CampaignInput = {
    allowCustomAmount?: InputMaybe<Scalars['Boolean']>;
    allowCustomSubscriptionAmount?: InputMaybe<Scalars['Boolean']>;
    allowPeerToPeer?: InputMaybe<Scalars['Boolean']>;
    asks?: InputMaybe<Array<Scalars['Float']>>;
    asksSubscription?: InputMaybe<Array<Scalars['Float']>>;
    code?: InputMaybe<Scalars['String']>;
    content?: InputMaybe<Scalars['String']>;
    costExamples?: InputMaybe<Array<CostExampleInput>>;
    coverId?: InputMaybe<Scalars['Int']>;
    customfields?: InputMaybe<Array<CustomFieldInput>>;
    defaultAmount?: InputMaybe<Scalars['Float']>;
    defaultSubscriptionAmount?: InputMaybe<Scalars['Float']>;
    excludedChannels?: InputMaybe<Array<Scalars['Int']>>;
    goal?: InputMaybe<Scalars['Float']>;
    hasOneOff?: InputMaybe<Scalars['Boolean']>;
    hasSubscription?: InputMaybe<Scalars['Boolean']>;
    hasSubscriptionCustomOptions?: InputMaybe<Scalars['Boolean']>;
    isGoalEnabled?: InputMaybe<Scalars['Boolean']>;
    maxAmount?: InputMaybe<Scalars['Float']>;
    maxSubscriptionAmount?: InputMaybe<Scalars['Float']>;
    minAmount?: InputMaybe<Scalars['Float']>;
    minSubscriptionAmount?: InputMaybe<Scalars['Float']>;
    privacyFields?: InputMaybe<Array<Scalars['String']>>;
    privacyNote?: InputMaybe<Scalars['String']>;
    receiptNotificationId?: InputMaybe<Scalars['Int']>;
    requiredFields?: InputMaybe<Array<Scalars['String']>>;
    seoDescription?: InputMaybe<Scalars['String']>;
    seoTitle?: InputMaybe<Scalars['String']>;
    shownFields?: InputMaybe<Array<Scalars['String']>>;
    slug?: InputMaybe<Scalars['String']>;
    tags?: InputMaybe<Array<Scalars['String']>>;
    template?: InputMaybe<Scalars['String']>;
    thankyouTemplate?: InputMaybe<Scalars['String']>;
    title?: InputMaybe<Scalars['String']>;
    type?: InputMaybe<CampaignType>;
    visibility?: InputMaybe<WebDocumentVisibility>;
};
export type CampaignResponse = {
    __typename?: 'CampaignResponse';
    campaign?: Maybe<Campaign>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum CampaignType {
    Donation = "DONATION",
    Lead = "LEAD"
}
export type ChangePlanResponse = {
    __typename?: 'ChangePlanResponse';
    success: Scalars['Boolean'];
};
export type Checkout = {
    __typename?: 'Checkout';
    application?: Maybe<Application>;
    applicationMetadata?: Maybe<Scalars['JSON']>;
    campaign: Campaign;
    checkoutUrl: Scalars['String'];
    completedDate?: Maybe<Scalars['DateTime']>;
    createDate: Scalars['DateTime'];
    donation?: Maybe<Donation>;
    donationAmount?: Maybe<Scalars['Float']>;
    donationFrequency?: Maybe<Frequency>;
    enabledPaymentMethods: Array<PaymentMethod>;
    errorMessage?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    peerCampaign?: Maybe<PeerCampaign>;
    recoveryMailSentDate?: Maybe<Scalars['DateTime']>;
    state: CheckoutState;
    supporter?: Maybe<Supporter>;
    supporterAddress?: Maybe<Scalars['String']>;
    supporterAddress2?: Maybe<Scalars['String']>;
    supporterBusinessName?: Maybe<Scalars['String']>;
    supporterCity?: Maybe<Scalars['String']>;
    supporterCountry?: Maybe<Scalars['String']>;
    supporterDateOfBirth?: Maybe<Scalars['Date']>;
    supporterEmail?: Maybe<Scalars['String']>;
    supporterEmailMarketing?: Maybe<Scalars['Boolean']>;
    supporterFirstName?: Maybe<Scalars['String']>;
    supporterFullname: Scalars['String'];
    supporterLastName?: Maybe<Scalars['String']>;
    supporterLocality?: Maybe<Scalars['String']>;
    supporterMobile?: Maybe<Scalars['String']>;
    supporterPhone?: Maybe<Scalars['String']>;
    supporterPhoneMarketing?: Maybe<Scalars['Boolean']>;
    supporterPlaceOfBirth?: Maybe<Scalars['String']>;
    supporterPostalCode?: Maybe<Scalars['String']>;
    supporterPrivacy?: Maybe<Scalars['Boolean']>;
    supporterPrivacyValues?: Maybe<Scalars['Boolean']>;
    supporterSex?: Maybe<Scalars['String']>;
    supporterSsn?: Maybe<Scalars['String']>;
    supporterType?: Maybe<Scalars['String']>;
    supporterVat?: Maybe<Scalars['String']>;
    tags: Array<Scalars['String']>;
    token: Scalars['String'];
    updateDate: Scalars['DateTime'];
};
export type CheckoutCompleteInput = {
    paymentMethodId?: InputMaybe<Scalars['Int']>;
};
export type CheckoutConnection = {
    __typename?: 'CheckoutConnection';
    edges: Array<CheckoutEdge>;
    pageInfo: PageInfo;
};
export type CheckoutEdge = {
    __typename?: 'CheckoutEdge';
    cursor: Scalars['String'];
    node: Checkout;
};
export type CheckoutFilters = {
    createDate?: InputMaybe<DateRange>;
    order?: InputMaybe<Scalars['String']>;
    q?: InputMaybe<Scalars['String']>;
    state?: InputMaybe<CheckoutState>;
    tags?: InputMaybe<Array<Scalars['String']>>;
    tagsNot?: InputMaybe<Array<Scalars['String']>>;
    updateDate?: InputMaybe<DateRange>;
};
export type CheckoutInput = {
    amount?: InputMaybe<Scalars['Float']>;
    applicationId?: InputMaybe<Scalars['Int']>;
    applicationMetadata?: InputMaybe<Scalars['JSON']>;
    campaignId?: InputMaybe<Scalars['Int']>;
    device?: InputMaybe<Scalars['String']>;
    donationData?: InputMaybe<DonationInput>;
    frequency?: InputMaybe<Frequency>;
    isPromise?: InputMaybe<Scalars['Boolean']>;
    paymentMethodId?: InputMaybe<Scalars['Int']>;
    peerCampaignId?: InputMaybe<Scalars['Int']>;
    supporterData?: InputMaybe<SupporterInput>;
    supporterId?: InputMaybe<Scalars['Int']>;
    tags?: InputMaybe<Array<Scalars['String']>>;
};
export type CheckoutPaymentInput = {
    amount?: InputMaybe<Scalars['Float']>;
    creditCardId?: InputMaybe<Scalars['Int']>;
    donationId?: InputMaybe<Scalars['Int']>;
    paymentDate?: InputMaybe<Scalars['DateTime']>;
    paymentMethodId?: InputMaybe<Scalars['Int']>;
    peerCampaignId?: InputMaybe<Scalars['Int']>;
    satispayPaymentIntentId?: InputMaybe<Scalars['String']>;
    sepaBankAccountId?: InputMaybe<Scalars['Int']>;
    state?: InputMaybe<PaymentState>;
    stripePaymentIntentId?: InputMaybe<Scalars['String']>;
};
export type CheckoutResponse = {
    __typename?: 'CheckoutResponse';
    checkout?: Maybe<Checkout>;
    userErrors?: Maybe<Array<UserError>>;
};
export type CheckoutSession = {
    __typename?: 'CheckoutSession';
    url: Scalars['String'];
};
export declare enum CheckoutState {
    Closed = "CLOSED",
    Open = "OPEN"
}
export type Comment = {
    __typename?: 'Comment';
    author: Scalars['String'];
    authorAvatar?: Maybe<Scalars['String']>;
    body: Scalars['String'];
    createDate: Scalars['DateTime'];
    id: Scalars['Int'];
    updateDate: Scalars['DateTime'];
};
export type CommentCreateInput = {
    body: Scalars['String'];
    subject: CommentSubject;
    subjectId: Scalars['Int'];
};
export type CommentResponse = {
    __typename?: 'CommentResponse';
    comment?: Maybe<Comment>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum CommentSubject {
    Checkout = "CHECKOUT",
    Donation = "DONATION",
    Supporter = "SUPPORTER"
}
export type CommentUpdateInput = {
    body: Scalars['String'];
};
export type CostExample = {
    __typename?: 'CostExample';
    amount: Scalars['Float'];
    availableQuantity: Scalars['Int'];
    description: Scalars['String'];
    image?: Maybe<Media>;
    monitorQuantity: Scalars['Boolean'];
    name: Scalars['String'];
    quantity: Scalars['Int'];
    uuid: Scalars['String'];
};
export type CostExampleInput = {
    amount: Scalars['Float'];
    availableQuantity: Scalars['Int'];
    description: Scalars['String'];
    imageId?: InputMaybe<Scalars['Int']>;
    monitorQuantity: Scalars['Boolean'];
    name: Scalars['String'];
    quantity: Scalars['Int'];
    uuid: Scalars['String'];
};
export type Country = {
    __typename?: 'Country';
    code: Scalars['String'];
    name: Scalars['String'];
};
export type CountryFilters = {
    q?: InputMaybe<Scalars['String']>;
};
export type CountryResponse = {
    __typename?: 'CountryResponse';
    results: Array<Country>;
};
export declare enum Currencies {
    Eur = "EUR",
    Gbp = "GBP",
    Usd = "USD"
}
export type CustomEntityUsage = {
    __typename?: 'CustomEntityUsage';
    count: Scalars['Int'];
    entity: CustomFieldEntity;
};
export type CustomField = {
    __typename?: 'CustomField';
    key: Scalars['String'];
    meta: CustomFieldDefinition;
    type: CustomFieldType;
    value?: Maybe<Scalars['String']>;
};
export type CustomFieldDefinition = {
    __typename?: 'CustomFieldDefinition';
    dateMaxValue?: Maybe<Scalars['Date']>;
    dateMinValue?: Maybe<Scalars['Date']>;
    datetimeMaxValue?: Maybe<Scalars['DateTime']>;
    datetimeMinValue?: Maybe<Scalars['DateTime']>;
    decimalMaxValue?: Maybe<Scalars['Float']>;
    decimalMinValue?: Maybe<Scalars['Float']>;
    description?: Maybe<Scalars['String']>;
    entity: CustomFieldEntity;
    hasSitefrontVisibility: Scalars['Boolean'];
    hidden: Scalars['Boolean'];
    id: Scalars['Int'];
    integerMaxValue?: Maybe<Scalars['Int']>;
    integerMinValue?: Maybe<Scalars['Int']>;
    key: Scalars['String'];
    name: Scalars['String'];
    position: Scalars['Int'];
    textChoices?: Maybe<Array<Scalars['String']>>;
    textMaxLength?: Maybe<Scalars['Int']>;
    textMinLength?: Maybe<Scalars['Int']>;
    textUseChoices: Scalars['Boolean'];
    type: CustomFieldType;
};
export type CustomFieldDefinitionCreateInput = {
    dateMaxValue?: InputMaybe<Scalars['String']>;
    dateMinValue?: InputMaybe<Scalars['String']>;
    datetimeMaxValue?: InputMaybe<Scalars['String']>;
    datetimeMinValue?: InputMaybe<Scalars['String']>;
    decimalMaxValue?: InputMaybe<Scalars['Float']>;
    decimalMinValue?: InputMaybe<Scalars['Float']>;
    description?: InputMaybe<Scalars['String']>;
    entity: CustomFieldEntity;
    hasSitefrontVisibility?: InputMaybe<Scalars['Boolean']>;
    hidden?: InputMaybe<Scalars['Boolean']>;
    integerMaxValue?: InputMaybe<Scalars['Int']>;
    integerMinValue?: InputMaybe<Scalars['Int']>;
    key: Scalars['String'];
    name: Scalars['String'];
    position?: InputMaybe<Scalars['Int']>;
    textChoices?: InputMaybe<Array<Scalars['String']>>;
    textMaxLength?: InputMaybe<Scalars['Int']>;
    textMinLength?: InputMaybe<Scalars['Int']>;
    textUseChoices?: InputMaybe<Scalars['Boolean']>;
    type: CustomFieldType;
};
export type CustomFieldDefinitionResponse = {
    __typename?: 'CustomFieldDefinitionResponse';
    customFieldDefinition?: Maybe<CustomFieldDefinition>;
    userErrors?: Maybe<Array<UserError>>;
};
export type CustomFieldDefinitionUpdateInput = {
    dateMaxValue?: InputMaybe<Scalars['String']>;
    dateMinValue?: InputMaybe<Scalars['String']>;
    datetimeMaxValue?: InputMaybe<Scalars['String']>;
    datetimeMinValue?: InputMaybe<Scalars['String']>;
    decimalMaxValue?: InputMaybe<Scalars['Float']>;
    decimalMinValue?: InputMaybe<Scalars['Float']>;
    description?: InputMaybe<Scalars['String']>;
    hasSitefrontVisibility?: InputMaybe<Scalars['Boolean']>;
    hidden?: InputMaybe<Scalars['Boolean']>;
    integerMaxValue?: InputMaybe<Scalars['Int']>;
    integerMinValue?: InputMaybe<Scalars['Int']>;
    name?: InputMaybe<Scalars['String']>;
    position?: InputMaybe<Scalars['Int']>;
    textChoices?: InputMaybe<Array<Scalars['String']>>;
    textMaxLength?: InputMaybe<Scalars['Int']>;
    textMinLength?: InputMaybe<Scalars['Int']>;
    textUseChoices?: InputMaybe<Scalars['Boolean']>;
};
export declare enum CustomFieldEntity {
    Article = "ARTICLE",
    Blog = "BLOG",
    Campaign = "CAMPAIGN",
    Donation = "DONATION",
    Page = "PAGE",
    Project = "PROJECT",
    Supporter = "SUPPORTER"
}
export type CustomFieldEntityFilter = {
    key: Scalars['String'];
    operator: CustomFieldEntityFilterOperator;
    value?: InputMaybe<Scalars['String']>;
};
export declare enum CustomFieldEntityFilterOperator {
    Contains = "CONTAINS",
    Endswith = "ENDSWITH",
    Eq = "EQ",
    Gt = "GT",
    Gte = "GTE",
    Icontains = "ICONTAINS",
    Lt = "LT",
    Lte = "LTE",
    Neq = "NEQ",
    Startswith = "STARTSWITH"
}
export type CustomFieldFilters = {
    entity?: InputMaybe<CustomFieldEntity>;
    hidden?: InputMaybe<Scalars['Boolean']>;
};
export type CustomFieldInput = {
    key: Scalars['String'];
    value?: InputMaybe<Scalars['String']>;
};
export declare enum CustomFieldType {
    Boolean = "BOOLEAN",
    Date = "DATE",
    Datetime = "DATETIME",
    Decimal = "DECIMAL",
    File = "FILE",
    Integer = "INTEGER",
    MultilineText = "MULTILINE_TEXT",
    Richtext = "RICHTEXT",
    Text = "TEXT"
}
export type CustomNotificationInput = {
    emailSubject?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
};
export type CustomerPortal = {
    __typename?: 'CustomerPortal';
    dashboard: Scalars['String'];
    paymentMethod: Scalars['String'];
};
export type DateRange = {
    end?: InputMaybe<Scalars['Date']>;
    start?: InputMaybe<Scalars['Date']>;
};
export type DateTimeRange = {
    end?: InputMaybe<Scalars['DateTime']>;
    start?: InputMaybe<Scalars['DateTime']>;
};
export type Domain = {
    __typename?: 'Domain';
    cnameIsValid: Scalars['Boolean'];
    host: Scalars['String'];
    id: Scalars['Int'];
    managedBy: Scalars['String'];
    status: DomainStatus;
    type: DomainType;
};
export declare enum DomainStatus {
    Active = "ACTIVE",
    Pending = "PENDING"
}
export declare enum DomainType {
    Primary = "PRIMARY",
    Redirect = "REDIRECT"
}
export type DomainsResponse = {
    __typename?: 'DomainsResponse';
    domain?: Maybe<Domain>;
    userErrors?: Maybe<Array<UserError>>;
};
export type Donation = {
    __typename?: 'Donation';
    amount: Scalars['Float'];
    campaign: Campaign;
    checkout?: Maybe<Checkout>;
    code: Scalars['String'];
    completedDate?: Maybe<Scalars['DateTime']>;
    costExample?: Maybe<CostExample>;
    createDate: Scalars['DateTime'];
    customfields: Array<CustomField>;
    device?: Maybe<Scalars['String']>;
    frequency?: Maybe<Frequency>;
    id: Scalars['Int'];
    isPublic: Scalars['Boolean'];
    note?: Maybe<Scalars['String']>;
    paymentMethod?: Maybe<PaymentMethod>;
    peerCampaign?: Maybe<PeerCampaign>;
    receiptUrl?: Maybe<Scalars['String']>;
    state: DonationState;
    supporter: Supporter;
    tags: Array<Scalars['String']>;
    totalPaid: Scalars['Float'];
    totalPayments: Scalars['Int'];
    updateDate: Scalars['DateTime'];
};
export type DonationConnection = {
    __typename?: 'DonationConnection';
    edges: Array<DonationEdge>;
    pageInfo: PageInfo;
};
export type DonationDomain = {
    filters?: InputMaybe<DonationFiltersInput>;
    ids?: InputMaybe<Array<Scalars['Int']>>;
};
export type DonationEdge = {
    __typename?: 'DonationEdge';
    cursor: Scalars['String'];
    node: Donation;
};
export type DonationFiltersInput = {
    campaigns?: InputMaybe<Array<Scalars['Int']>>;
    createDate?: InputMaybe<DateRange>;
    createDatetime?: InputMaybe<DateTimeRange>;
    frequencies?: InputMaybe<Array<Frequency>>;
    order?: InputMaybe<Scalars['String']>;
    paymentMethods?: InputMaybe<Array<Scalars['Int']>>;
    peerCampaigns?: InputMaybe<Array<Scalars['Int']>>;
    q?: InputMaybe<Scalars['String']>;
    supporterType?: InputMaybe<SupporterType>;
    supporters?: InputMaybe<Array<Scalars['Int']>>;
    tags?: InputMaybe<Array<Scalars['String']>>;
    tagsNot?: InputMaybe<Array<Scalars['String']>>;
    totalPaid?: InputMaybe<IntRange>;
    totalPayments?: InputMaybe<IntRange>;
    updateDate?: InputMaybe<DateRange>;
};
export type DonationInput = {
    amount?: InputMaybe<Scalars['Float']>;
    customfields?: InputMaybe<Array<CustomFieldInput>>;
    device?: InputMaybe<Scalars['String']>;
    frequency?: InputMaybe<Frequency>;
    isPublic?: InputMaybe<Scalars['Boolean']>;
    note?: InputMaybe<Scalars['String']>;
    tags?: InputMaybe<Array<Scalars['String']>>;
};
export type DonationPaymentInput = {
    amount?: InputMaybe<Scalars['Float']>;
    frequency?: InputMaybe<Frequency>;
    paymentDate?: InputMaybe<Scalars['DateTime']>;
    paymentMethodId?: InputMaybe<Scalars['Int']>;
};
export type DonationResponse = {
    __typename?: 'DonationResponse';
    donation?: Maybe<Donation>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum DonationState {
    Active = "ACTIVE",
    Done = "DONE",
    Draft = "DRAFT",
    PastDue = "PAST_DUE",
    Pending = "PENDING",
    Revoked = "REVOKED"
}
export declare enum ErrorCode {
    BadInput = "BAD_INPUT",
    NotFound = "NOT_FOUND",
    NotUnique = "NOT_UNIQUE",
    Protected = "PROTECTED"
}
export type Events = TimelineActivityEvent | TimelineBasicEvent | TimelineCommentEvent;
export type EventsConnection = {
    __typename?: 'EventsConnection';
    edges: Array<EventsEdge>;
    pageInfo: PageInfo;
};
export type EventsEdge = {
    __typename?: 'EventsEdge';
    cursor: Scalars['String'];
    node: Events;
};
export type ExistingDomainInput = {
    host: Scalars['String'];
};
export declare enum ExportFormat {
    Csv = "CSV",
    Xlsx = "XLSX"
}
export type Field = {
    __typename?: 'Field';
    content?: Maybe<Scalars['String']>;
    default?: Maybe<Scalars['JSON']>;
    id: Scalars['String'];
    info?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    max?: Maybe<Scalars['Int']>;
    min?: Maybe<Scalars['Int']>;
    options: Array<FieldOptions>;
    type: Scalars['String'];
};
export type FieldOptions = {
    __typename?: 'FieldOptions';
    label: Scalars['String'];
    value: Scalars['String'];
};
export declare enum FlowType {
    Anonymous = "ANONYMOUS",
    SupporterDataOptional = "SUPPORTER_DATA_OPTIONAL",
    SupporterDataRequired = "SUPPORTER_DATA_REQUIRED"
}
export type Form = {
    __typename?: 'Form';
    allowCustomAmount: Scalars['Boolean'];
    allowCustomSubscriptionAmount: Scalars['Boolean'];
    asks: Array<Scalars['Float']>;
    asksSubscription: Array<Scalars['Float']>;
    defaultAmount?: Maybe<Scalars['Float']>;
    defaultSubscriptionAmount?: Maybe<Scalars['Float']>;
    hasOneOff: Scalars['Boolean'];
    hasSubscription: Scalars['Boolean'];
    hasSubscriptionCustomOptions: Scalars['Boolean'];
    id: Scalars['Int'];
    maxAmount?: Maybe<Scalars['Float']>;
    maxSubscriptionAmount?: Maybe<Scalars['Float']>;
    minAmount?: Maybe<Scalars['Float']>;
    minSubscriptionAmount?: Maybe<Scalars['Float']>;
    name: Scalars['String'];
    note?: Maybe<Scalars['String']>;
    requiredFields: Array<Scalars['String']>;
    shownFields: Array<Scalars['String']>;
};
export type FormConnection = {
    __typename?: 'FormConnection';
    edges: Array<FormEdge>;
    pageInfo: PageInfo;
};
export type FormEdge = {
    __typename?: 'FormEdge';
    cursor: Scalars['String'];
    node: Form;
};
export type FormFilters = {
    order?: InputMaybe<Scalars['String']>;
    q?: InputMaybe<Scalars['String']>;
};
export type FormInput = {
    allowCustomAmount?: InputMaybe<Scalars['Boolean']>;
    allowCustomSubscriptionAmount?: InputMaybe<Scalars['Boolean']>;
    asks: Array<Scalars['Float']>;
    asksSubscription: Array<Scalars['Float']>;
    defaultAmount?: InputMaybe<Scalars['Float']>;
    defaultSubscriptionAmount?: InputMaybe<Scalars['Float']>;
    hasOneOff?: InputMaybe<Scalars['Boolean']>;
    hasSubscription?: InputMaybe<Scalars['Boolean']>;
    hasSubscriptionCustomOptions?: InputMaybe<Scalars['Boolean']>;
    maxAmount?: InputMaybe<Scalars['Float']>;
    maxSubscriptionAmount?: InputMaybe<Scalars['Float']>;
    minAmount?: InputMaybe<Scalars['Float']>;
    minSubscriptionAmount?: InputMaybe<Scalars['Float']>;
    name: Scalars['String'];
    note?: InputMaybe<Scalars['String']>;
    requiredFields: Array<Scalars['String']>;
    shownFields: Array<Scalars['String']>;
};
export declare enum Frequency {
    Annually = "ANNUALLY",
    Monthly = "MONTHLY",
    Oneoff = "ONEOFF"
}
export type IntRange = {
    end?: InputMaybe<Scalars['Int']>;
    start?: InputMaybe<Scalars['Int']>;
};
export type Invite = {
    __typename?: 'Invite';
    email?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    invitationAcceptDate?: Maybe<Scalars['String']>;
    invitationSentDate?: Maybe<Scalars['String']>;
    invitationStatus: StaffInvitationStatus;
    organization: Organization;
    partnerEmail?: Maybe<Scalars['String']>;
    partnerName?: Maybe<Scalars['String']>;
    permissions: Array<StaffPermission>;
    role: StaffRole;
    token: Scalars['String'];
};
export type InviteInput = {
    email: Scalars['String'];
    permissions?: InputMaybe<Array<StaffPermission>>;
    role: StaffRole;
};
export type ManualPaymentInput = {
    amount: Scalars['Float'];
    paymentDate: Scalars['DateTime'];
    paymentMethodId?: InputMaybe<Scalars['Int']>;
};
export type ManualPaymentMethodInput = {
    channels?: InputMaybe<Array<Scalars['Int']>>;
    description?: InputMaybe<Scalars['String']>;
    hasOneoffSupport?: InputMaybe<Scalars['Boolean']>;
    hasSubscriptionSupport?: InputMaybe<Scalars['Boolean']>;
    instructions?: InputMaybe<Scalars['String']>;
    label: Scalars['String'];
};
export type Media = {
    __typename?: 'Media';
    alt: Scalars['String'];
    createDate: Scalars['String'];
    height: Scalars['Int'];
    id: Scalars['Int'];
    medium: Scalars['String'];
    name: Scalars['String'];
    size: Scalars['Int'];
    small: Scalars['String'];
    square: Scalars['String'];
    url: Scalars['String'];
    width: Scalars['Int'];
};
export type MediaConnection = {
    __typename?: 'MediaConnection';
    edges: Array<MediaEdge>;
    pageInfo: PageInfo;
};
export type MediaEdge = {
    __typename?: 'MediaEdge';
    cursor: Scalars['String'];
    node: Media;
};
export type MediaResponse = {
    __typename?: 'MediaResponse';
    media?: Maybe<Media>;
    userErrors?: Maybe<Array<UserError>>;
};
export type Menu = {
    __typename?: 'Menu';
    handle: Scalars['String'];
    id: Scalars['Int'];
    items: Array<MenuItem>;
    name: Scalars['String'];
};
export type MenuInput = {
    handle: Scalars['String'];
    items: Array<MenuItemInput>;
    name: Scalars['String'];
};
export type MenuItem = {
    __typename?: 'MenuItem';
    id: Scalars['Int'];
    label: Scalars['String'];
    link: Scalars['String'];
    type: MenuItemType;
};
export type MenuItemInput = {
    label: Scalars['String'];
    link?: InputMaybe<Scalars['String']>;
};
export declare enum MenuItemType {
    Article = "ARTICLE",
    Blog = "BLOG",
    Campaign = "CAMPAIGN",
    External = "EXTERNAL",
    Homepage = "HOMEPAGE",
    Page = "PAGE",
    Project = "PROJECT"
}
export type MenuResponse = {
    __typename?: 'MenuResponse';
    menu?: Maybe<Menu>;
    userErrors?: Maybe<Array<UserError>>;
};
export type Mutation = {
    __typename?: 'Mutation';
    activityCreate: ActivityResponse;
    activityDelete: ActivityResponse;
    activityDone: ActivityResponse;
    activityUndone: ActivityResponse;
    activityUpdate: ActivityResponse;
    applicationCreatePrivate: Application;
    applicationPrivateRefreshToken: AccessToken;
    applicationUninstall: Application;
    applicationUpdatePrivate: Application;
    articlesCreate: ArticlesResponse;
    articlesDelete: ArticlesResponse;
    articlesUpdate: ArticlesResponse;
    assetCreate: Asset;
    assetDelete: Asset;
    assetDuplicate: Asset;
    assetUpdate: Asset;
    billingCancelChangePlan: ChangePlanResponse;
    billingChangePlan: ChangePlanResponse;
    billingCreateCheckoutSession: CheckoutSession;
    blogsCreate: BlogsResponse;
    blogsDelete: BlogsResponse;
    blogsUpdate: BlogsResponse;
    campaignCommentCreate: CampaignCommentResponse;
    campaignCommentDelete: CampaignCommentResponse;
    campaignCommentUpdate: CampaignCommentResponse;
    campaignCreate: CampaignResponse;
    campaignDelete: CampaignResponse;
    campaignDuplicate: CampaignResponse;
    campaignUpdate: CampaignResponse;
    checkoutComplete: CheckoutResponse;
    checkoutCreate: CheckoutResponse;
    checkoutRegisterPayment: CheckoutResponse;
    checkoutSendRecoveryEmail: CheckoutResponse;
    checkoutUpdate: CheckoutResponse;
    commentCreate: CommentResponse;
    commentDelete: CommentResponse;
    commentUpdate: CommentResponse;
    customfieldDefinitionCreate: CustomFieldDefinitionResponse;
    customfieldDefinitionDelete: CustomFieldDefinitionResponse;
    customfieldDefinitionUpdate: CustomFieldDefinitionResponse;
    domainsCheckStatus: DomainsResponse;
    domainsConnectExisting: DomainsResponse;
    domainsDelete: DomainsResponse;
    domainsSetPrimary: DomainsResponse;
    donationBulkDelete: Scalars['Boolean'];
    donationDelete: Donation;
    donationExport: Scalars['String'];
    donationImport: Task;
    donationReceiptSend: Scalars['Boolean'];
    donationRegisterPayment: DonationResponse;
    donationRevoke: Donation;
    donationUpdate: Donation;
    formCreate: Form;
    formDelete: Form;
    formUpdate: Form;
    inviteCreate: Invite;
    inviteResend: Invite;
    inviteRevoke: Invite;
    inviteUpdate: Invite;
    manualPaymentMethodCreate: PaymentMethodResponse;
    manualPaymentMethodDelete: PaymentMethodResponse;
    manualPaymentMethodUpdate: PaymentMethodResponse;
    mediaCreate: Media;
    mediaDelete: MediaResponse;
    menuCreate: MenuResponse;
    menuDelete: MenuResponse;
    menuUpdate: MenuResponse;
    notificationCreate: Notification;
    notificationSend: Notification;
    notificationUpdate: Notification;
    organizationUpdate: OrganizationResponse;
    organizationUpdateLegalData: OrganizationResponse;
    pagesCreate: PagesResponse;
    pagesDelete: PagesResponse;
    pagesUpdate: PagesResponse;
    paperDocumentUpdate: PaperDocument;
    partnerInviteUpdate: Invite;
    paymentExport: Scalars['String'];
    paymentRefund: PaymentResponse;
    paymentUpdate: PaymentResponse;
    paypalAccountReset?: Maybe<Scalars['Void']>;
    paypalActivate: PayPalAccount;
    paypalGenerateOnboardingLink: PayPalLink;
    paypalRefreshOrganizationAccount?: Maybe<Scalars['Void']>;
    peerCampaignCreate: PeerCampaignResponse;
    peerCampaignDelete: PeerCampaignResponse;
    peerCampaignUpdate: PeerCampaignResponse;
    privacyDefinitionCreate: PrivacyDefinitionResponse;
    privacyDefinitionDelete: PrivacyDefinitionResponse;
    privacyDefinitionUpdate: PrivacyDefinitionResponse;
    projectCreate: ProjectResponse;
    projectDelete: ProjectResponse;
    projectRemoveItem: ProjectResponse;
    projectUpdate: ProjectResponse;
    projectUpdateItems: ProjectResponse;
    redirectsCreate: RedirectResponse;
    redirectsDelete: RedirectResponse;
    redirectsUpdate: RedirectResponse;
    satispayActivate: SatispayAccount;
    segmentCreate: SegmentResponse;
    segmentDelete: SegmentResponse;
    segmentUpdate: SegmentResponse;
    staffSendPasswordReset: StaffResponse;
    staffSetPermissions: StaffResponse;
    staffUpdate: StaffResponse;
    storeThemeInstall: Theme;
    stripeActivate: StripeAccount;
    stripeCheckoutIntentCreate: StripeCheckoutResponse;
    stripeGenerateDashboardLink: StripeLink;
    stripeGenerateOnboardingLink: StripeLink;
    stripeTerminalCheckoutIntentCreate: StripeCheckoutResponse;
    supporterBulkTags: Scalars['Boolean'];
    supporterCreate: Supporter;
    supporterDelete: Supporter;
    supporterExport: Scalars['String'];
    supporterImport: Task;
    supporterMerge: Supporter;
    supporterRemovePrivacy: SupporterResponse;
    supporterSendTaxCertificate: Supporter;
    supporterSetPrivacy: SupporterResponse;
    supporterUpdate: Supporter;
    templateClone: Asset;
    terminalConnectionTokenCreate: Scalars['String'];
    terminalDelete: Scalars['String'];
    terminalLocationCreate: StripeTerminalLocation;
    terminalLocationDelete?: Maybe<Scalars['Void']>;
    terminalLocationUpdate: StripeTerminalLocation;
    terminalRegister: StripeTerminal;
    terminalUpdateLabel: StripeTerminal;
    themeCreate: Theme;
    themeDelete: Theme;
    themeDuplicate: Theme;
    themeGenerateDownload: Scalars['String'];
    themeInitDevelopment: Theme;
    themePublish: Theme;
    themePublishDevelopment: Theme;
    themeUpdate: Theme;
    themeUpgrade: Theme;
    themeUpload: ThemeUploadResponse;
    totemDelete: TotemResponse;
    totemRegister: TotemResponse;
    webhooksCreate: Webhook;
    webhooksDelete: Webhook;
    webhooksUpdate: Webhook;
    websiteUpdate: Website;
};
export type MutationActivityCreateArgs = {
    data: ActivityCreateInput;
};
export type MutationActivityDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationActivityDoneArgs = {
    id: Scalars['Int'];
};
export type MutationActivityUndoneArgs = {
    id: Scalars['Int'];
};
export type MutationActivityUpdateArgs = {
    data: ActivityUpdateInput;
    id: Scalars['Int'];
};
export type MutationApplicationCreatePrivateArgs = {
    data: ApplicationPrivateInput;
};
export type MutationApplicationPrivateRefreshTokenArgs = {
    id: Scalars['Int'];
};
export type MutationApplicationUninstallArgs = {
    id: Scalars['Int'];
};
export type MutationApplicationUpdatePrivateArgs = {
    data: ApplicationPrivateInput;
    id: Scalars['Int'];
};
export type MutationArticlesCreateArgs = {
    data: ArticleInput;
};
export type MutationArticlesDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationArticlesUpdateArgs = {
    data: ArticleInput;
    id: Scalars['Int'];
};
export type MutationAssetCreateArgs = {
    data: AssetInput;
};
export type MutationAssetDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationAssetDuplicateArgs = {
    name: Scalars['String'];
    sourceId: Scalars['Int'];
};
export type MutationAssetUpdateArgs = {
    data: AssetInput;
    id: Scalars['Int'];
};
export type MutationBillingChangePlanArgs = {
    planType: BillingPlanType;
};
export type MutationBillingCreateCheckoutSessionArgs = {
    planType: BillingPlanType;
};
export type MutationBlogsCreateArgs = {
    data: BlogInput;
};
export type MutationBlogsDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationBlogsUpdateArgs = {
    data: BlogInput;
    id: Scalars['Int'];
};
export type MutationCampaignCommentCreateArgs = {
    data: CampaignCommentCreateInput;
};
export type MutationCampaignCommentDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationCampaignCommentUpdateArgs = {
    data: CampaignCommentUpdateInput;
    id: Scalars['Int'];
};
export type MutationCampaignCreateArgs = {
    data: CampaignInput;
};
export type MutationCampaignDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationCampaignDuplicateArgs = {
    id: Scalars['Int'];
};
export type MutationCampaignUpdateArgs = {
    data: CampaignInput;
    id: Scalars['Int'];
};
export type MutationCheckoutCompleteArgs = {
    data: CheckoutCompleteInput;
    token: Scalars['String'];
};
export type MutationCheckoutCreateArgs = {
    data: CheckoutInput;
};
export type MutationCheckoutRegisterPaymentArgs = {
    data: CheckoutPaymentInput;
    token: Scalars['String'];
};
export type MutationCheckoutSendRecoveryEmailArgs = {
    token: Scalars['String'];
};
export type MutationCheckoutUpdateArgs = {
    data: CheckoutInput;
    token: Scalars['String'];
};
export type MutationCommentCreateArgs = {
    data: CommentCreateInput;
};
export type MutationCommentDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationCommentUpdateArgs = {
    data: CommentUpdateInput;
    id: Scalars['Int'];
};
export type MutationCustomfieldDefinitionCreateArgs = {
    data: CustomFieldDefinitionCreateInput;
};
export type MutationCustomfieldDefinitionDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationCustomfieldDefinitionUpdateArgs = {
    data: CustomFieldDefinitionUpdateInput;
    id: Scalars['Int'];
};
export type MutationDomainsCheckStatusArgs = {
    id: Scalars['Int'];
};
export type MutationDomainsConnectExistingArgs = {
    data: ExistingDomainInput;
};
export type MutationDomainsDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationDomainsSetPrimaryArgs = {
    id: Scalars['Int'];
};
export type MutationDonationBulkDeleteArgs = {
    filters: DonationFiltersInput;
};
export type MutationDonationDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationDonationExportArgs = {
    domain: DonationDomain;
    format: ExportFormat;
};
export type MutationDonationImportArgs = {
    createMissingCampaigns: Scalars['Boolean'];
    createMissingPaymentMethod: Scalars['Boolean'];
    fallbackCampaignId?: InputMaybe<Scalars['Int']>;
    file: Scalars['Upload'];
    importAnonymousPayments: Scalars['Boolean'];
};
export type MutationDonationReceiptSendArgs = {
    id: Scalars['Int'];
};
export type MutationDonationRegisterPaymentArgs = {
    data: DonationPaymentInput;
    id: Scalars['Int'];
};
export type MutationDonationRevokeArgs = {
    id: Scalars['Int'];
};
export type MutationDonationUpdateArgs = {
    data: DonationInput;
    id: Scalars['Int'];
};
export type MutationFormCreateArgs = {
    data: FormInput;
};
export type MutationFormDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationFormUpdateArgs = {
    data: FormInput;
    id: Scalars['Int'];
};
export type MutationInviteCreateArgs = {
    data: InviteInput;
};
export type MutationInviteResendArgs = {
    id: Scalars['Int'];
};
export type MutationInviteRevokeArgs = {
    id: Scalars['Int'];
};
export type MutationInviteUpdateArgs = {
    data: InviteInput;
    id: Scalars['Int'];
};
export type MutationManualPaymentMethodCreateArgs = {
    data: ManualPaymentMethodInput;
};
export type MutationManualPaymentMethodDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationManualPaymentMethodUpdateArgs = {
    data: ManualPaymentMethodInput;
    id: Scalars['Int'];
};
export type MutationMediaCreateArgs = {
    file: Scalars['Upload'];
};
export type MutationMediaDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationMenuCreateArgs = {
    data: MenuInput;
};
export type MutationMenuDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationMenuUpdateArgs = {
    data: MenuInput;
    id: Scalars['Int'];
};
export type MutationNotificationCreateArgs = {
    code: NotificationCode;
    data: CustomNotificationInput;
};
export type MutationNotificationSendArgs = {
    code: NotificationCode;
    data: NotificationSendInput;
    id?: InputMaybe<Scalars['Int']>;
};
export type MutationNotificationUpdateArgs = {
    code: NotificationCode;
    data: NotificationInput;
    id?: InputMaybe<Scalars['Int']>;
};
export type MutationOrganizationUpdateArgs = {
    data: OrganizationInput;
};
export type MutationOrganizationUpdateLegalDataArgs = {
    data: OrganizationLegalInput;
};
export type MutationPagesCreateArgs = {
    data: PageInput;
};
export type MutationPagesDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationPagesUpdateArgs = {
    data: PageInput;
    id: Scalars['Int'];
};
export type MutationPaperDocumentUpdateArgs = {
    code: PaperDocumentCode;
    data: PaperDocumentInput;
    key?: InputMaybe<Scalars['String']>;
};
export type MutationPartnerInviteUpdateArgs = {
    id: Scalars['Int'];
    state: StaffInvitationStatus;
};
export type MutationPaymentExportArgs = {
    domain: PaymentDomain;
    format: ExportFormat;
};
export type MutationPaymentRefundArgs = {
    id: Scalars['Int'];
};
export type MutationPaymentUpdateArgs = {
    data: ManualPaymentInput;
    id: Scalars['Int'];
};
export type MutationPeerCampaignCreateArgs = {
    data: PeerCampaignInput;
};
export type MutationPeerCampaignDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationPeerCampaignUpdateArgs = {
    data: PeerCampaignInput;
    id: Scalars['Int'];
};
export type MutationPrivacyDefinitionCreateArgs = {
    data: PrivacyDefinitionCreateInput;
};
export type MutationPrivacyDefinitionDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationPrivacyDefinitionUpdateArgs = {
    data: PrivacyDefinitionUpdateInput;
    id: Scalars['Int'];
};
export type MutationProjectCreateArgs = {
    data: ProjectInput;
};
export type MutationProjectDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationProjectRemoveItemArgs = {
    campaignId: Scalars['Int'];
    id: Scalars['Int'];
};
export type MutationProjectUpdateArgs = {
    data: ProjectInput;
    id: Scalars['Int'];
};
export type MutationProjectUpdateItemsArgs = {
    campaignIds: Array<Scalars['Int']>;
    id: Scalars['Int'];
};
export type MutationRedirectsCreateArgs = {
    data: RedirectInput;
};
export type MutationRedirectsDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationRedirectsUpdateArgs = {
    data: RedirectInput;
    id: Scalars['Int'];
};
export type MutationSatispayActivateArgs = {
    authenticationCode: Scalars['String'];
};
export type MutationSegmentCreateArgs = {
    data: SegmentInput;
};
export type MutationSegmentDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationSegmentUpdateArgs = {
    data: SegmentInput;
    id: Scalars['Int'];
};
export type MutationStaffSendPasswordResetArgs = {
    id: Scalars['Int'];
};
export type MutationStaffSetPermissionsArgs = {
    id: Scalars['Int'];
    permissions: Array<StaffPermission>;
};
export type MutationStaffUpdateArgs = {
    data: StaffInput;
    id: Scalars['Int'];
};
export type MutationStoreThemeInstallArgs = {
    uuid: Scalars['String'];
};
export type MutationStripeCheckoutIntentCreateArgs = {
    checkoutToken: Scalars['String'];
    paymentTypes: StripePaymentTypeInput;
};
export type MutationStripeTerminalCheckoutIntentCreateArgs = {
    checkoutToken: Scalars['String'];
};
export type MutationSupporterBulkTagsArgs = {
    action: SupporterBulkTagAction;
    filters: SupporterFiltersInput;
    tags: Array<Scalars['String']>;
};
export type MutationSupporterCreateArgs = {
    data: SupporterInput;
};
export type MutationSupporterDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationSupporterExportArgs = {
    domain: SupporterDomain;
    format: ExportFormat;
};
export type MutationSupporterImportArgs = {
    file: Scalars['Upload'];
    overrideSupporters: Scalars['Boolean'];
};
export type MutationSupporterMergeArgs = {
    data: SupporterInput;
    duplicatesIds: Array<Scalars['Int']>;
    masterId: Scalars['Int'];
};
export type MutationSupporterRemovePrivacyArgs = {
    code: Scalars['String'];
    id: Scalars['Int'];
};
export type MutationSupporterSendTaxCertificateArgs = {
    id: Scalars['Int'];
    method: NotificationMethods;
};
export type MutationSupporterSetPrivacyArgs = {
    data: SupporterPrivacyInput;
    id: Scalars['Int'];
};
export type MutationSupporterUpdateArgs = {
    data: SupporterInput;
    id: Scalars['Int'];
};
export type MutationTemplateCloneArgs = {
    name: Scalars['String'];
    parentThemeUuid: Scalars['String'];
    sourceId: Scalars['Int'];
};
export type MutationTerminalConnectionTokenCreateArgs = {
    locationId?: InputMaybe<Scalars['String']>;
};
export type MutationTerminalDeleteArgs = {
    id: Scalars['String'];
};
export type MutationTerminalLocationCreateArgs = {
    data: TerminalLocationInput;
};
export type MutationTerminalLocationDeleteArgs = {
    id: Scalars['String'];
};
export type MutationTerminalLocationUpdateArgs = {
    data: TerminalLocationInput;
    id: Scalars['String'];
};
export type MutationTerminalRegisterArgs = {
    data: TerminalRegisterInput;
};
export type MutationTerminalUpdateLabelArgs = {
    id: Scalars['String'];
    label: Scalars['String'];
};
export type MutationThemeCreateArgs = {
    data: ThemeInput;
};
export type MutationThemeDeleteArgs = {
    uuid: Scalars['String'];
};
export type MutationThemeDuplicateArgs = {
    uuid: Scalars['String'];
};
export type MutationThemeGenerateDownloadArgs = {
    uuid: Scalars['String'];
};
export type MutationThemeInitDevelopmentArgs = {
    uuid: Scalars['String'];
};
export type MutationThemePublishArgs = {
    uuid: Scalars['String'];
};
export type MutationThemePublishDevelopmentArgs = {
    devUuid: Scalars['String'];
    themeUuid: Scalars['String'];
};
export type MutationThemeUpdateArgs = {
    data: ThemeInput;
    uuid: Scalars['String'];
};
export type MutationThemeUpgradeArgs = {
    uuid: Scalars['String'];
};
export type MutationThemeUploadArgs = {
    file: Scalars['Upload'];
};
export type MutationTotemDeleteArgs = {
    deviceId: Scalars['String'];
};
export type MutationTotemRegisterArgs = {
    data: TotemInput;
};
export type MutationWebhooksCreateArgs = {
    data: WebhookInput;
};
export type MutationWebhooksDeleteArgs = {
    id: Scalars['Int'];
};
export type MutationWebhooksUpdateArgs = {
    data: WebhookInput;
    id: Scalars['Int'];
};
export type MutationWebsiteUpdateArgs = {
    data: WebsiteInput;
};
export type Notification = {
    __typename?: 'Notification';
    code: NotificationCode;
    description?: Maybe<Scalars['String']>;
    emailBcc?: Maybe<Scalars['String']>;
    emailBody?: Maybe<Scalars['String']>;
    emailDesign: Scalars['JSON'];
    emailReplyTo?: Maybe<Scalars['String']>;
    emailSender?: Maybe<Scalars['String']>;
    emailSubject?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    name: Scalars['String'];
    sendByEmail: Scalars['Boolean'];
    sendBySms: Scalars['Boolean'];
    smsBody?: Maybe<Scalars['String']>;
};
export declare enum NotificationCode {
    CheckoutSendLink = "CHECKOUT_SEND_LINK",
    DonationAbandoned = "DONATION_ABANDONED",
    DonationInstructions = "DONATION_INSTRUCTIONS",
    DonationReceived = "DONATION_RECEIVED",
    DonationRefunded = "DONATION_REFUNDED",
    P2PDonationReceived = "P2P_DONATION_RECEIVED",
    P2PWelcome = "P2P_WELCOME",
    StaffDonationReceived = "STAFF_DONATION_RECEIVED",
    StaffDonationRefunded = "STAFF_DONATION_REFUNDED",
    SupporterLogin = "SUPPORTER_LOGIN",
    TaxCertificate = "TAX_CERTIFICATE"
}
export type NotificationFilters = {
    code?: InputMaybe<NotificationCode>;
    group?: InputMaybe<Scalars['String']>;
};
export type NotificationInput = {
    emailBcc: Scalars['String'];
    emailBody: Scalars['String'];
    emailDesign: Scalars['String'];
    emailReplyTo?: InputMaybe<Scalars['String']>;
    emailSender?: InputMaybe<Scalars['String']>;
    emailSubject?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    sendByEmail: Scalars['Boolean'];
    sendBySms: Scalars['Boolean'];
    smsBody: Scalars['String'];
};
export declare enum NotificationMethods {
    Email = "EMAIL",
    Sms = "SMS"
}
export type NotificationSendInput = {
    checkoutId?: InputMaybe<Scalars['String']>;
    donationId?: InputMaybe<Scalars['Int']>;
    message?: InputMaybe<Scalars['String']>;
    recipient: Scalars['String'];
    subject: Scalars['String'];
    supporterId: Scalars['Int'];
};
export declare enum OnboardingStatus {
    Active = "ACTIVE",
    Expired = "EXPIRED",
    FreePlan = "FREE_PLAN",
    MissingData = "MISSING_DATA"
}
export type Organization = {
    __typename?: 'Organization';
    addressLine1?: Maybe<Scalars['String']>;
    addressLine2?: Maybe<Scalars['String']>;
    baseSitefrontUrl: Scalars['String'];
    city?: Maybe<Scalars['String']>;
    consentScopes: Array<Scalars['String']>;
    contactEmail?: Maybe<Scalars['String']>;
    contactPhone?: Maybe<Scalars['String']>;
    country?: Maybe<Country>;
    currency: Currencies;
    domain: Scalars['String'];
    id: Scalars['Int'];
    isInvoiceRequired?: Maybe<Scalars['Boolean']>;
    jwtPassKey: Scalars['String'];
    legalName?: Maybe<Scalars['String']>;
    logo?: Maybe<Media>;
    name: Scalars['String'];
    onboardingStatus: OnboardingStatus;
    owner: User;
    planType?: Maybe<BillingPlanType>;
    postalCode?: Maybe<Scalars['String']>;
    privacyPolicy?: Maybe<Scalars['String']>;
    reference: Scalars['String'];
    senderEmail?: Maybe<Scalars['String']>;
    senderEmailStatus: OrganizationSenderEmailStatus;
    sitefrontUrl: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    taxIdentificationNumber?: Maybe<Scalars['String']>;
    tos?: Maybe<Scalars['String']>;
    vat?: Maybe<Scalars['String']>;
    vatExchange?: Maybe<Scalars['String']>;
};
export type OrganizationInput = {
    addressLine1?: InputMaybe<Scalars['String']>;
    addressLine2?: InputMaybe<Scalars['String']>;
    city?: InputMaybe<Scalars['String']>;
    contactEmail?: InputMaybe<Scalars['String']>;
    contactPhone?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    currency: Currencies;
    isInvoiceRequired?: InputMaybe<Scalars['Boolean']>;
    legalName?: InputMaybe<Scalars['String']>;
    logo?: InputMaybe<Scalars['Int']>;
    name: Scalars['String'];
    postalCode?: InputMaybe<Scalars['String']>;
    senderEmail?: InputMaybe<Scalars['String']>;
    state?: InputMaybe<Scalars['String']>;
    taxIdentificationNumber?: InputMaybe<Scalars['String']>;
    vat?: InputMaybe<Scalars['String']>;
    vatExchange?: InputMaybe<Scalars['String']>;
};
export type OrganizationLegalInput = {
    consentScopes: Array<Scalars['String']>;
    privacyPolicy: Scalars['String'];
    tos: Scalars['String'];
};
export type OrganizationResponse = {
    __typename?: 'OrganizationResponse';
    organization?: Maybe<Organization>;
    userErrors?: Maybe<Array<UserError>>;
};
export type OrganizationSenderEmailStatus = {
    __typename?: 'OrganizationSenderEmailStatus';
    dkim: Scalars['Boolean'];
    dkimValue?: Maybe<Scalars['String']>;
    readyToSend?: Maybe<Scalars['Boolean']>;
    spf: Scalars['Boolean'];
    spfValue?: Maybe<Scalars['String']>;
    verificationString?: Maybe<Scalars['String']>;
    verified: Scalars['Boolean'];
};
export type OrganizationsFilters = {
    name?: InputMaybe<Scalars['String']>;
};
export type Page = {
    __typename?: 'Page';
    content?: Maybe<Scalars['String']>;
    cover?: Maybe<Media>;
    createDate: Scalars['DateTime'];
    customfields: Array<CustomField>;
    id: Scalars['Int'];
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    sitefrontUrl: Scalars['String'];
    slug: Scalars['String'];
    template?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    updateDate: Scalars['DateTime'];
    url: Scalars['String'];
    visibility: WebDocumentVisibility;
};
export type PageConnection = {
    __typename?: 'PageConnection';
    edges: Array<PageEdge>;
    pageInfo: PageInfo;
};
export type PageEdge = {
    __typename?: 'PageEdge';
    cursor: Scalars['String'];
    node: Page;
};
export type PageInfo = {
    __typename?: 'PageInfo';
    endCursor?: Maybe<Scalars['String']>;
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor?: Maybe<Scalars['String']>;
    total: Scalars['Int'];
};
export type PageInput = {
    content?: InputMaybe<Scalars['String']>;
    coverId?: InputMaybe<Scalars['Int']>;
    customfields?: InputMaybe<Array<CustomFieldInput>>;
    seoDescription?: InputMaybe<Scalars['String']>;
    seoTitle?: InputMaybe<Scalars['String']>;
    slug?: InputMaybe<Scalars['String']>;
    template?: InputMaybe<Scalars['String']>;
    title?: InputMaybe<Scalars['String']>;
    visibility?: InputMaybe<WebDocumentVisibility>;
};
export type PagesFiltersInput = {
    q?: InputMaybe<Scalars['String']>;
};
export type PagesResponse = {
    __typename?: 'PagesResponse';
    page?: Maybe<Page>;
    userErrors?: Maybe<Array<UserError>>;
};
export type PaginationInput = {
    after?: InputMaybe<Scalars['String']>;
    before?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    last?: InputMaybe<Scalars['Int']>;
};
export type PaperDocument = {
    __typename?: 'PaperDocument';
    code: PaperDocumentCode;
    content?: Maybe<Scalars['String']>;
    contextFields: Array<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    group: Scalars['String'];
    name: Scalars['String'];
    previewUrl: Scalars['String'];
    style?: Maybe<Scalars['String']>;
};
export declare enum PaperDocumentCode {
    DonationReceipt = "DONATION_RECEIPT"
}
export type PaperDocumentInput = {
    content?: InputMaybe<Scalars['String']>;
    style?: InputMaybe<Scalars['String']>;
};
export type PayPalAccount = {
    __typename?: 'PayPalAccount';
    hasPayments: Scalars['Boolean'];
    isEnabled?: Maybe<Scalars['Boolean']>;
    merchantId?: Maybe<Scalars['String']>;
    paymentsReceivable?: Maybe<Scalars['Boolean']>;
    primaryEmail?: Maybe<Scalars['String']>;
    primaryEmailConfirmed?: Maybe<Scalars['Boolean']>;
    trackingId?: Maybe<Scalars['String']>;
};
export type PayPalLink = {
    __typename?: 'PayPalLink';
    url: Scalars['String'];
};
export type Payment = {
    __typename?: 'Payment';
    amount: Scalars['Float'];
    createDate: Scalars['DateTime'];
    donation?: Maybe<Donation>;
    id: Scalars['Int'];
    netAmount?: Maybe<Scalars['Float']>;
    paymentDate?: Maybe<Scalars['DateTime']>;
    paymentMethod?: Maybe<PaymentMethod>;
    state: PaymentState;
    stripeIntentId?: Maybe<Scalars['String']>;
    supporter?: Maybe<Supporter>;
    updateDate: Scalars['DateTime'];
};
export type PaymentConnection = {
    __typename?: 'PaymentConnection';
    edges: Array<PaymentEdge>;
    pageInfo: PageInfo;
};
export type PaymentDomain = {
    filters?: InputMaybe<PaymentFiltersInput>;
    ids?: InputMaybe<Array<Scalars['Int']>>;
};
export type PaymentEdge = {
    __typename?: 'PaymentEdge';
    cursor: Scalars['String'];
    node: Payment;
};
export type PaymentFiltersInput = {
    createDate?: InputMaybe<DateRange>;
    donation?: InputMaybe<Scalars['Int']>;
    order?: InputMaybe<Scalars['String']>;
    paymentDate?: InputMaybe<DateRange>;
    paymentMethod?: InputMaybe<Scalars['Int']>;
    q?: InputMaybe<Scalars['String']>;
    state?: InputMaybe<Array<PaymentState>>;
    supporter?: InputMaybe<Scalars['Int']>;
    updateDate?: InputMaybe<DateRange>;
};
export type PaymentMethod = {
    __typename?: 'PaymentMethod';
    channels: Array<Scalars['Int']>;
    description?: Maybe<Scalars['String']>;
    hasOneoffSupport: Scalars['Boolean'];
    hasSubscriptionSupport: Scalars['Boolean'];
    id: Scalars['Int'];
    instructions?: Maybe<Scalars['String']>;
    label?: Maybe<Scalars['String']>;
    processor: PaymentProcessor;
};
export type PaymentMethodResponse = {
    __typename?: 'PaymentMethodResponse';
    paymentMethod?: Maybe<PaymentMethod>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum PaymentProcessor {
    Manual = "MANUAL",
    Paypal = "PAYPAL",
    Satispay = "SATISPAY",
    Stripe = "STRIPE"
}
export type PaymentResponse = {
    __typename?: 'PaymentResponse';
    payment?: Maybe<Payment>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum PaymentState {
    Failed = "FAILED",
    Paid = "PAID",
    Pending = "PENDING",
    Refunded = "REFUNDED"
}
export type PeerCampaign = {
    __typename?: 'PeerCampaign';
    campaign?: Maybe<Campaign>;
    content?: Maybe<Scalars['String']>;
    createDate: Scalars['DateTime'];
    customMessage?: Maybe<Scalars['String']>;
    goal?: Maybe<Scalars['Float']>;
    id: Scalars['Int'];
    isGoalEnabled: Scalars['Boolean'];
    receiptNotificationId?: Maybe<Scalars['Int']>;
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    sitefrontUrl: Scalars['String'];
    slug: Scalars['String'];
    supporter?: Maybe<Supporter>;
    supporterName?: Maybe<Scalars['String']>;
    template?: Maybe<Scalars['String']>;
    thankyouTemplate?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    updateDate: Scalars['DateTime'];
    url: Scalars['String'];
    visibility: WebDocumentVisibility;
};
export type PeerCampaignConnection = {
    __typename?: 'PeerCampaignConnection';
    edges: Array<PeerCampaignEdge>;
    pageInfo: PageInfo;
};
export type PeerCampaignEdge = {
    __typename?: 'PeerCampaignEdge';
    cursor: Scalars['String'];
    node: PeerCampaign;
};
export type PeerCampaignFilters = {
    campaignId?: InputMaybe<Scalars['Int']>;
    channels?: InputMaybe<Array<Scalars['String']>>;
    ids?: InputMaybe<Array<Scalars['Int']>>;
    order?: InputMaybe<Scalars['String']>;
    q?: InputMaybe<Scalars['String']>;
    supporterId?: InputMaybe<Scalars['Int']>;
    tags?: InputMaybe<Array<Scalars['String']>>;
    tagsNot?: InputMaybe<Array<Scalars['String']>>;
};
export type PeerCampaignInput = {
    campaignId: Scalars['Int'];
    content?: InputMaybe<Scalars['String']>;
    coverId?: InputMaybe<Scalars['Int']>;
    customMessage?: InputMaybe<Scalars['String']>;
    goal?: InputMaybe<Scalars['Float']>;
    isGoalEnabled?: InputMaybe<Scalars['Boolean']>;
    receiptNotificationId?: InputMaybe<Scalars['Int']>;
    seoDescription?: InputMaybe<Scalars['String']>;
    seoTitle?: InputMaybe<Scalars['String']>;
    slug?: InputMaybe<Scalars['String']>;
    supporterId: Scalars['Int'];
    supporterName?: InputMaybe<Scalars['String']>;
    template?: InputMaybe<Scalars['String']>;
    thankyouTemplate?: InputMaybe<Scalars['String']>;
    title?: InputMaybe<Scalars['String']>;
    visibility?: InputMaybe<WebDocumentVisibility>;
};
export type PeerCampaignResponse = {
    __typename?: 'PeerCampaignResponse';
    peerCampaign?: Maybe<PeerCampaign>;
    userErrors?: Maybe<Array<UserError>>;
};
export type Plan = {
    __typename?: 'Plan';
    interval: Scalars['String'];
    items: Array<PlanItem>;
    nextPaymentAt: Scalars['Int'];
    nextPhasePlanType?: Maybe<BillingPlanType>;
    paymentMethod?: Maybe<PlanPaymentMethod>;
    planType: BillingPlanType;
};
export type PlanItem = {
    __typename?: 'PlanItem';
    amount: Scalars['Int'];
    currency: Currencies;
    name: Scalars['String'];
    quantity: Scalars['Int'];
};
export type PlanPaymentMethod = {
    __typename?: 'PlanPaymentMethod';
    brand?: Maybe<Scalars['String']>;
    last4: Scalars['String'];
    type: PlanPaymentMethodType;
};
export declare enum PlanPaymentMethodType {
    Card = "CARD",
    Sdd = "SDD"
}
export type PrivacyDefinition = {
    __typename?: 'PrivacyDefinition';
    code: Scalars['String'];
    consentScopes: Array<Scalars['String']>;
    createDate: Scalars['DateTime'];
    id: Scalars['Int'];
    isDefault: Scalars['Boolean'];
    isRequired: Scalars['Boolean'];
    label: Scalars['String'];
    message?: Maybe<Scalars['String']>;
    updateDate: Scalars['DateTime'];
};
export type PrivacyDefinitionConnection = {
    __typename?: 'PrivacyDefinitionConnection';
    edges: Array<PrivacyDefinitionEdge>;
    pageInfo: PageInfo;
};
export type PrivacyDefinitionCreateInput = {
    code: Scalars['String'];
    consentScopes?: InputMaybe<Array<Scalars['String']>>;
    isDefault?: InputMaybe<Scalars['Boolean']>;
    isRequired?: InputMaybe<Scalars['Boolean']>;
    label: Scalars['String'];
    message?: InputMaybe<Scalars['String']>;
};
export type PrivacyDefinitionEdge = {
    __typename?: 'PrivacyDefinitionEdge';
    cursor: Scalars['String'];
    node: PrivacyDefinition;
};
export type PrivacyDefinitionFilters = {
    code?: InputMaybe<Scalars['String']>;
    isDefault?: InputMaybe<Scalars['Boolean']>;
    isRequired?: InputMaybe<Scalars['Boolean']>;
    label?: InputMaybe<Scalars['String']>;
};
export type PrivacyDefinitionResponse = {
    __typename?: 'PrivacyDefinitionResponse';
    privacyDefinition?: Maybe<PrivacyDefinition>;
    userErrors?: Maybe<Array<UserError>>;
};
export type PrivacyDefinitionUpdateInput = {
    code?: InputMaybe<Scalars['String']>;
    consentScopes?: InputMaybe<Array<Scalars['String']>>;
    isDefault?: InputMaybe<Scalars['Boolean']>;
    isRequired?: InputMaybe<Scalars['Boolean']>;
    label?: InputMaybe<Scalars['String']>;
    message?: InputMaybe<Scalars['String']>;
};
export type Project = {
    __typename?: 'Project';
    campaignsOrder: ProjectCampaignsOrder;
    content?: Maybe<Scalars['String']>;
    cover?: Maybe<Media>;
    createDate: Scalars['DateTime'];
    customfields: Array<CustomField>;
    id: Scalars['Int'];
    items: Array<ProjectCampaignItem>;
    rules: Array<ProjectRule>;
    rulesMatch: ProjectRuleMatchType;
    seoDescription?: Maybe<Scalars['String']>;
    seoTitle?: Maybe<Scalars['String']>;
    sitefrontUrl: Scalars['String'];
    slug: Scalars['String'];
    template?: Maybe<Scalars['String']>;
    title: Scalars['String'];
    type: ProjectType;
    updateDate: Scalars['DateTime'];
    url: Scalars['String'];
    visibility: WebDocumentVisibility;
};
export type ProjectCampaignItem = {
    __typename?: 'ProjectCampaignItem';
    campaign: Campaign;
    id: Scalars['Int'];
    position: Scalars['Int'];
};
export declare enum ProjectCampaignsOrder {
    AlphaAz = "ALPHA_AZ",
    AlphaZa = "ALPHA_ZA",
    Manual = "MANUAL",
    Newer = "NEWER",
    Older = "OLDER"
}
export type ProjectConnection = {
    __typename?: 'ProjectConnection';
    edges: Array<ProjectEdge>;
    pageInfo: PageInfo;
};
export type ProjectEdge = {
    __typename?: 'ProjectEdge';
    cursor: Scalars['String'];
    node: Project;
};
export type ProjectFilters = {
    order?: InputMaybe<Scalars['String']>;
    q?: InputMaybe<Scalars['String']>;
};
export type ProjectInput = {
    campaignsOrder?: InputMaybe<ProjectCampaignsOrder>;
    content?: InputMaybe<Scalars['String']>;
    coverId?: InputMaybe<Scalars['Int']>;
    customfields?: InputMaybe<Array<CustomFieldInput>>;
    rules?: InputMaybe<Array<ProjectRuleInput>>;
    rulesMatch?: InputMaybe<ProjectRuleMatchType>;
    seoDescription?: InputMaybe<Scalars['String']>;
    seoTitle?: InputMaybe<Scalars['String']>;
    slug?: InputMaybe<Scalars['String']>;
    template?: InputMaybe<Scalars['String']>;
    title: Scalars['String'];
    type?: InputMaybe<ProjectType>;
    visibility?: InputMaybe<WebDocumentVisibility>;
};
export type ProjectResponse = {
    __typename?: 'ProjectResponse';
    project?: Maybe<Project>;
    userErrors?: Maybe<Array<UserError>>;
};
export type ProjectRule = {
    __typename?: 'ProjectRule';
    field: ProjectRuleField;
    operator: ProjectRuleOperator;
    uuid: Scalars['String'];
    value: Scalars['String'];
};
export declare enum ProjectRuleField {
    Tags = "TAGS",
    Title = "TITLE"
}
export type ProjectRuleInput = {
    field: ProjectRuleField;
    operator: ProjectRuleOperator;
    uuid: Scalars['String'];
    value: Scalars['String'];
};
export declare enum ProjectRuleMatchType {
    All = "ALL",
    Any = "ANY"
}
export declare enum ProjectRuleOperator {
    Contains = "CONTAINS",
    EndsWith = "ENDS_WITH",
    EqualsTo = "EQUALS_TO",
    NotContains = "NOT_CONTAINS",
    NotEqualsTo = "NOT_EQUALS_TO",
    StartsWith = "STARTS_WITH"
}
export declare enum ProjectType {
    Dynamic = "DYNAMIC",
    Manual = "MANUAL"
}
export type Query = {
    __typename?: 'Query';
    activities: ActivityConnection;
    activity: Activity;
    application: Application;
    applications: Array<Application>;
    applicationsAvailable: Array<Application>;
    article: Article;
    articles: ArticleConnection;
    asset?: Maybe<Asset>;
    assetLayout?: Maybe<Asset>;
    assets: Array<Asset>;
    billingPlans?: Maybe<Plan>;
    blog: Blog;
    blogs: BlogConnection;
    campaign: Campaign;
    campaignComment: CampaignComment;
    campaignComments: CampaignCommentConnection;
    campaignTags: StrConnection;
    campaigns: CampaignConnection;
    checkout: Checkout;
    checkouts: CheckoutConnection;
    checkoutsAbandoned: CheckoutConnection;
    checkoutsAdminGenerated: CheckoutConnection;
    countries: CountryResponse;
    customerPortal: CustomerPortal;
    customfieldDefinition: CustomFieldDefinition;
    customfieldDefinitions: Array<CustomFieldDefinition>;
    customfieldDefinitionsEntitiesUsage: Array<CustomEntityUsage>;
    domain?: Maybe<Domain>;
    domains: Array<Domain>;
    donation: Donation;
    donationTags: StrConnection;
    donations: DonationConnection;
    form: Form;
    forms: FormConnection;
    invite: Invite;
    invites: Array<Invite>;
    manualPaymentMethod: PaymentMethod;
    manualPaymentMethods: Array<PaymentMethod>;
    media: MediaConnection;
    mediaSingle: Media;
    menu: Menu;
    menuByHandle: Menu;
    menus: Array<Menu>;
    notification: Notification;
    notifications: Array<Notification>;
    organization: Organization;
    organizations: Array<Organization>;
    owner: Staff;
    page: Page;
    pages: PageConnection;
    paperDocument: PaperDocument;
    payment: Payment;
    paymentMethods: Array<PaymentMethod>;
    payments: PaymentConnection;
    paypal?: Maybe<PayPalAccount>;
    peerCampaign: PeerCampaign;
    peerCampaigns: PeerCampaignConnection;
    plan?: Maybe<Plan>;
    privacyDefinition: PrivacyDefinition;
    privacyDefinitions: PrivacyDefinitionConnection;
    project: Project;
    projects: ProjectConnection;
    redirect: Redirect;
    redirects: RedirectConnection;
    satispay?: Maybe<SatispayAccount>;
    segment: Segment;
    segments: SegmentConnection;
    staff: Staff;
    staffs: Array<Staff>;
    storeTheme: StoreTheme;
    storeThemes: Array<StoreTheme>;
    stripe?: Maybe<StripeAccount>;
    stripeCustomerCards: Array<StripeCard>;
    supporter: Supporter;
    supporterSavedCards: Array<StripeCard>;
    supporterTags: StrConnection;
    supporters: SupporterConnection;
    terminal: StripeTerminal;
    terminalLocation: StripeTerminalLocation;
    terminalLocations: Array<StripeTerminalLocation>;
    terminals: Array<StripeTerminal>;
    terminalsByLocation: Array<StripeTerminal>;
    theme: Theme;
    themeCurrent: Theme;
    themeSections: Array<SectionSchemaItem>;
    themeSettings: Array<SectionSchemaItem>;
    themes: Array<Theme>;
    timeline: EventsConnection;
    totem: Totem;
    totems: TotemConnection;
    unsplash: UnsplashResults;
    user: Staff;
    webhook: Webhook;
    webhooks: Array<Webhook>;
    website: Website;
};
export type QueryActivitiesArgs = {
    filters?: InputMaybe<ActivityFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryActivityArgs = {
    id: Scalars['Int'];
};
export type QueryApplicationArgs = {
    id: Scalars['Int'];
};
export type QueryApplicationsArgs = {
    filters?: InputMaybe<ApplicationFilters>;
};
export type QueryArticleArgs = {
    id: Scalars['Int'];
};
export type QueryArticlesArgs = {
    filters?: InputMaybe<ArticlesFiltersInput>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryAssetArgs = {
    key: Scalars['String'];
    themeUuid: Scalars['String'];
};
export type QueryAssetLayoutArgs = {
    templateKey: Scalars['String'];
    themeUuid: Scalars['String'];
};
export type QueryAssetsArgs = {
    filters: AssetsFiltersInput;
};
export type QueryBlogArgs = {
    id: Scalars['Int'];
};
export type QueryBlogsArgs = {
    filters?: InputMaybe<BlogsFiltersInput>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryCampaignArgs = {
    id: Scalars['Int'];
};
export type QueryCampaignCommentArgs = {
    id: Scalars['Int'];
};
export type QueryCampaignCommentsArgs = {
    filters?: InputMaybe<CampaignCommentsFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryCampaignTagsArgs = {
    pagination?: InputMaybe<PaginationInput>;
    q?: InputMaybe<Scalars['String']>;
};
export type QueryCampaignsArgs = {
    filters?: InputMaybe<CampaignFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryCheckoutArgs = {
    token: Scalars['String'];
};
export type QueryCheckoutsArgs = {
    filters?: InputMaybe<CheckoutFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryCheckoutsAbandonedArgs = {
    filters?: InputMaybe<CheckoutFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryCheckoutsAdminGeneratedArgs = {
    filters?: InputMaybe<CheckoutFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryCountriesArgs = {
    filters?: InputMaybe<CountryFilters>;
};
export type QueryCustomfieldDefinitionArgs = {
    id: Scalars['Int'];
};
export type QueryCustomfieldDefinitionsArgs = {
    filters?: InputMaybe<CustomFieldFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryDomainArgs = {
    id: Scalars['Int'];
};
export type QueryDonationArgs = {
    id: Scalars['Int'];
};
export type QueryDonationTagsArgs = {
    pagination?: InputMaybe<PaginationInput>;
    q?: InputMaybe<Scalars['String']>;
};
export type QueryDonationsArgs = {
    filters?: InputMaybe<DonationFiltersInput>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryFormArgs = {
    id: Scalars['Int'];
};
export type QueryFormsArgs = {
    filters?: InputMaybe<FormFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryInviteArgs = {
    id: Scalars['Int'];
};
export type QueryInvitesArgs = {
    filters: StaffInviteFilters;
};
export type QueryManualPaymentMethodArgs = {
    id: Scalars['Int'];
};
export type QueryMediaArgs = {
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryMediaSingleArgs = {
    id: Scalars['Int'];
};
export type QueryMenuArgs = {
    id: Scalars['Int'];
};
export type QueryMenuByHandleArgs = {
    handle: Scalars['String'];
};
export type QueryNotificationArgs = {
    code: NotificationCode;
    id?: InputMaybe<Scalars['Int']>;
};
export type QueryNotificationsArgs = {
    filters?: InputMaybe<NotificationFilters>;
};
export type QueryOrganizationsArgs = {
    filters?: InputMaybe<OrganizationsFilters>;
};
export type QueryPageArgs = {
    id: Scalars['Int'];
};
export type QueryPagesArgs = {
    filters?: InputMaybe<PagesFiltersInput>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryPaperDocumentArgs = {
    code: PaperDocumentCode;
    key?: InputMaybe<Scalars['String']>;
};
export type QueryPaymentArgs = {
    id: Scalars['Int'];
};
export type QueryPaymentsArgs = {
    filters?: InputMaybe<PaymentFiltersInput>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryPeerCampaignArgs = {
    id: Scalars['Int'];
};
export type QueryPeerCampaignsArgs = {
    filters?: InputMaybe<PeerCampaignFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryPrivacyDefinitionArgs = {
    id: Scalars['Int'];
};
export type QueryPrivacyDefinitionsArgs = {
    filters?: InputMaybe<PrivacyDefinitionFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryProjectArgs = {
    id: Scalars['Int'];
};
export type QueryProjectsArgs = {
    filters?: InputMaybe<ProjectFilters>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryRedirectArgs = {
    id: Scalars['Int'];
};
export type QueryRedirectsArgs = {
    filters?: InputMaybe<RedirectsFiltersInput>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QuerySegmentArgs = {
    id: Scalars['Int'];
};
export type QuerySegmentsArgs = {
    filters?: InputMaybe<SegmentFiltersInput>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryStaffArgs = {
    id: Scalars['Int'];
};
export type QueryStaffsArgs = {
    filters?: InputMaybe<StaffFiltersInput>;
};
export type QueryStoreThemeArgs = {
    uuid: Scalars['String'];
};
export type QueryStripeCustomerCardsArgs = {
    stripeCustomerId: Scalars['String'];
};
export type QuerySupporterArgs = {
    id: Scalars['Int'];
};
export type QuerySupporterSavedCardsArgs = {
    id: Scalars['Int'];
    limit?: InputMaybe<Scalars['Int']>;
};
export type QuerySupporterTagsArgs = {
    pagination?: InputMaybe<PaginationInput>;
    q?: InputMaybe<Scalars['String']>;
};
export type QuerySupportersArgs = {
    filters?: InputMaybe<SupporterFiltersInput>;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryTerminalArgs = {
    id: Scalars['String'];
};
export type QueryTerminalLocationArgs = {
    id: Scalars['String'];
};
export type QueryTerminalLocationsArgs = {
    filters?: InputMaybe<TerminalLocationFilters>;
};
export type QueryTerminalsByLocationArgs = {
    locationId: Scalars['String'];
};
export type QueryThemeArgs = {
    uuid: Scalars['String'];
};
export type QueryThemeSectionsArgs = {
    themeUuid: Scalars['String'];
};
export type QueryThemeSettingsArgs = {
    themeUuid: Scalars['String'];
};
export type QueryThemesArgs = {
    filters?: InputMaybe<ThemesFiltersInput>;
};
export type QueryTimelineArgs = {
    filters: TimelineFilterInput;
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryTotemArgs = {
    deviceId: Scalars['String'];
};
export type QueryTotemsArgs = {
    pagination?: InputMaybe<PaginationInput>;
};
export type QueryUnsplashArgs = {
    page?: Scalars['Int'];
    perPage?: Scalars['Int'];
    query: Scalars['String'];
};
export type QueryWebhookArgs = {
    id: Scalars['Int'];
};
export type Redirect = {
    __typename?: 'Redirect';
    destinationUrl: Scalars['String'];
    id: Scalars['Int'];
    sourcePath: Scalars['String'];
};
export type RedirectConnection = {
    __typename?: 'RedirectConnection';
    edges: Array<RedirectEdge>;
    pageInfo: PageInfo;
};
export type RedirectEdge = {
    __typename?: 'RedirectEdge';
    cursor: Scalars['String'];
    node: Redirect;
};
export type RedirectInput = {
    destinationUrl: Scalars['String'];
    sourcePath: Scalars['String'];
};
export type RedirectResponse = {
    __typename?: 'RedirectResponse';
    redirect?: Maybe<Redirect>;
    userErrors?: Maybe<Array<UserError>>;
};
export type RedirectsFiltersInput = {
    q?: InputMaybe<Scalars['String']>;
};
export type SatispayAccount = {
    __typename?: 'SatispayAccount';
    keyId: Scalars['String'];
};
export type Section = {
    __typename?: 'Section';
    blockOrder: Array<Scalars['String']>;
    blocks: Array<BlockItem>;
    disabled: Scalars['Boolean'];
    settings: Scalars['JSON'];
    type: Scalars['String'];
};
export type SectionItem = {
    __typename?: 'SectionItem';
    key: Scalars['String'];
    section: Section;
};
export type SectionSchema = {
    __typename?: 'SectionSchema';
    blocks?: Maybe<Array<BlockSchema>>;
    cssClass?: Maybe<Scalars['String']>;
    limit?: Maybe<Scalars['Int']>;
    maxBlocks?: Maybe<Scalars['Int']>;
    name: Scalars['String'];
    presets?: Maybe<SectionSchemaPresets>;
    settings?: Maybe<Array<Field>>;
    tag?: Maybe<Scalars['String']>;
    templates?: Maybe<Array<Scalars['String']>>;
};
export type SectionSchemaItem = {
    __typename?: 'SectionSchemaItem';
    key: Scalars['String'];
    schema: SectionSchema;
};
export type SectionSchemaPresets = {
    __typename?: 'SectionSchemaPresets';
    blocks?: Maybe<Array<Block>>;
    settings?: Maybe<Scalars['JSON']>;
};
export type Segment = {
    __typename?: 'Segment';
    createDate: Scalars['DateTime'];
    entity: SegmentEntity;
    filters: Scalars['JSON'];
    id: Scalars['Int'];
    name: Scalars['String'];
    updateDate: Scalars['DateTime'];
};
export type SegmentConnection = {
    __typename?: 'SegmentConnection';
    edges: Array<SegmentEdge>;
    pageInfo: PageInfo;
};
export type SegmentEdge = {
    __typename?: 'SegmentEdge';
    cursor: Scalars['String'];
    node: Segment;
};
export declare enum SegmentEntity {
    Supporter = "SUPPORTER"
}
export type SegmentFiltersInput = {
    entity: SegmentEntity;
    order?: InputMaybe<Scalars['String']>;
    q?: InputMaybe<Scalars['String']>;
};
export type SegmentInput = {
    entity: SegmentEntity;
    filters: Scalars['String'];
    name: Scalars['String'];
};
export type SegmentResponse = {
    __typename?: 'SegmentResponse';
    segment?: Maybe<Segment>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum Sex {
    Female = "FEMALE",
    Male = "MALE"
}
export declare enum SexFilter {
    Female = "FEMALE",
    Male = "MALE",
    NotSpecified = "NOT_SPECIFIED"
}
export type Staff = {
    __typename?: 'Staff';
    bio?: Maybe<Scalars['String']>;
    createDate?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    id: Scalars['Int'];
    isOwner: Scalars['Boolean'];
    lang: Scalars['String'];
    lastLoginDate?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    partnerId?: Maybe<Scalars['Int']>;
    permissions: Array<StaffPermission>;
    role: StaffRole;
    state: StaffStatus;
    timezone: Scalars['String'];
    userId?: Maybe<Scalars['Int']>;
};
export type StaffFiltersInput = {
    state?: InputMaybe<StaffStatus>;
    type?: InputMaybe<StaffType>;
};
export type StaffInput = {
    bio?: InputMaybe<Scalars['String']>;
    role?: InputMaybe<StaffRole>;
    state?: InputMaybe<StaffStatus>;
};
export declare enum StaffInvitationStatus {
    Accepted = "ACCEPTED",
    Canceled = "CANCELED",
    Pending = "PENDING",
    Rejected = "REJECTED"
}
export declare enum StaffInvitationType {
    Internal = "INTERNAL",
    Partner = "PARTNER"
}
export type StaffInviteFilters = {
    state?: InputMaybe<StaffInvitationStatus>;
    type?: InputMaybe<StaffInvitationType>;
};
export declare enum StaffPermission {
    ActivityRead = "ACTIVITY_READ",
    ActivityWrite = "ACTIVITY_WRITE",
    ApplicationInstall = "APPLICATION_INSTALL",
    ApplicationRead = "APPLICATION_READ",
    CampaignRead = "CAMPAIGN_READ",
    CampaignWrite = "CAMPAIGN_WRITE",
    DboxRead = "DBOX_READ",
    DboxWrite = "DBOX_WRITE",
    DonationExport = "DONATION_EXPORT",
    DonationRead = "DONATION_READ",
    DonationWrite = "DONATION_WRITE",
    PaymentRead = "PAYMENT_READ",
    PaymentWrite = "PAYMENT_WRITE",
    ProjectRead = "PROJECT_READ",
    ProjectWrite = "PROJECT_WRITE",
    ReportsRead = "REPORTS_READ",
    SitefrontContent = "SITEFRONT_CONTENT",
    SitefrontNavigation = "SITEFRONT_NAVIGATION",
    SitefrontThemes = "SITEFRONT_THEMES",
    SitefrontThemesCode = "SITEFRONT_THEMES_CODE",
    SupporterExport = "SUPPORTER_EXPORT",
    SupporterRead = "SUPPORTER_READ",
    SupporterWrite = "SUPPORTER_WRITE"
}
export type StaffResponse = {
    __typename?: 'StaffResponse';
    staff?: Maybe<Staff>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum StaffRole {
    Admin = "ADMIN",
    User = "USER"
}
export declare enum StaffStatus {
    Active = "ACTIVE",
    Deleted = "DELETED",
    Suspended = "SUSPENDED"
}
export declare enum StaffType {
    Internal = "INTERNAL",
    Partner = "PARTNER"
}
export type StoreTheme = {
    __typename?: 'StoreTheme';
    desktopScreenshot?: Maybe<Scalars['String']>;
    documentationUrl?: Maybe<Scalars['String']>;
    mobileScreenshot?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    partnerName?: Maybe<Scalars['String']>;
    slug: Scalars['String'];
    supportUrl?: Maybe<Scalars['String']>;
    tagline?: Maybe<Scalars['String']>;
    uuid: Scalars['String'];
    version: Scalars['String'];
};
export type StrConnection = {
    __typename?: 'StrConnection';
    edges: Array<StrEdge>;
    pageInfo: PageInfo;
};
export type StrEdge = {
    __typename?: 'StrEdge';
    cursor: Scalars['String'];
    node: Scalars['String'];
};
export type StripeAccount = {
    __typename?: 'StripeAccount';
    accountId?: Maybe<Scalars['String']>;
    chargesEnabled?: Maybe<Scalars['Boolean']>;
    detailsSubmitted?: Maybe<Scalars['Boolean']>;
    hasOneoffSupport: Scalars['Boolean'];
    hasSubscriptionSupport: Scalars['Boolean'];
    pubKey: Scalars['String'];
};
export type StripeCard = {
    __typename?: 'StripeCard';
    brand: StripeCardBrand;
    country: Scalars['String'];
    expMonth: Scalars['Int'];
    expYear: Scalars['Int'];
    fingerprint: Scalars['String'];
    funding: StripeCardFunding;
    id: Scalars['String'];
    last4: Scalars['String'];
};
export declare enum StripeCardBrand {
    Amex = "AMEX",
    Diners = "DINERS",
    Discover = "DISCOVER",
    Jcb = "JCB",
    Mastercard = "MASTERCARD",
    Unionpay = "UNIONPAY",
    Unknown = "UNKNOWN",
    Visa = "VISA"
}
export declare enum StripeCardFunding {
    Credit = "CREDIT",
    Debit = "DEBIT",
    Prepaid = "PREPAID",
    Unknown = "UNKNOWN"
}
export type StripeCheckoutIntent = {
    __typename?: 'StripeCheckoutIntent';
    clientSecret: Scalars['String'];
};
export type StripeCheckoutResponse = {
    __typename?: 'StripeCheckoutResponse';
    checkout?: Maybe<StripeCheckoutIntent>;
    userErrors?: Maybe<Array<UserError>>;
};
export type StripeLink = {
    __typename?: 'StripeLink';
    url: Scalars['String'];
};
export declare enum StripePaymentType {
    CreditCard = "CREDIT_CARD",
    Pos = "POS",
    SepaDirectDebit = "SEPA_DIRECT_DEBIT"
}
export type StripePaymentTypeInput = {
    types: Array<StripePaymentType>;
};
export type StripeTerminal = {
    __typename?: 'StripeTerminal';
    id: Scalars['String'];
    label: Scalars['String'];
    location?: Maybe<StripeTerminalLocation>;
    locationId?: Maybe<Scalars['String']>;
    serialNumber: Scalars['String'];
    status: Scalars['String'];
};
export type StripeTerminalLocation = {
    __typename?: 'StripeTerminalLocation';
    addressCity: Scalars['String'];
    addressCountry: Scalars['String'];
    addressLine1: Scalars['String'];
    addressLine2?: Maybe<Scalars['String']>;
    addressPostalCode: Scalars['String'];
    addressState: Scalars['String'];
    displayName: Scalars['String'];
    id: Scalars['String'];
    terminalCount: Scalars['Int'];
};
export type Supporter = {
    __typename?: 'Supporter';
    activeRegularDonations: Array<Donation>;
    address?: Maybe<Scalars['String']>;
    address2?: Maybe<Scalars['String']>;
    averageDonation: Scalars['String'];
    businessName?: Maybe<Scalars['String']>;
    certificationUrl?: Maybe<Scalars['String']>;
    city?: Maybe<Scalars['String']>;
    code: Scalars['String'];
    country?: Maybe<Scalars['String']>;
    createDate: Scalars['DateTime'];
    customfields: Array<CustomField>;
    dateOfBirth?: Maybe<Scalars['Date']>;
    email?: Maybe<Scalars['String']>;
    emailMarketing?: Maybe<Scalars['Boolean']>;
    firstName?: Maybe<Scalars['String']>;
    fullName?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    image?: Maybe<Scalars['String']>;
    job?: Maybe<Scalars['String']>;
    lastName?: Maybe<Scalars['String']>;
    lastOneoffDonation?: Maybe<Donation>;
    locality?: Maybe<Scalars['String']>;
    mobile?: Maybe<Scalars['String']>;
    note?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    phoneMarketing?: Maybe<Scalars['Boolean']>;
    placeOfBirth?: Maybe<Scalars['String']>;
    postalCode?: Maybe<Scalars['String']>;
    postalMarketing?: Maybe<Scalars['Boolean']>;
    privacy?: Maybe<Scalars['Boolean']>;
    privacyValues: Array<SupporterPrivacyValue>;
    profilationMarketing?: Maybe<Scalars['Boolean']>;
    savedCards: Array<StripeCard>;
    sex?: Maybe<Sex>;
    smsMarketing?: Maybe<Scalars['Boolean']>;
    sourceCampaign?: Maybe<Campaign>;
    sourcePeerCampaign?: Maybe<PeerCampaign>;
    ssn?: Maybe<Scalars['String']>;
    stripeCustomerId?: Maybe<Scalars['String']>;
    supporterType?: Maybe<SupporterType>;
    tags: Array<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    totalDonated: Scalars['String'];
    totalDonations: Scalars['Int'];
    vat?: Maybe<Scalars['String']>;
};
export declare enum SupporterBulkTagAction {
    Add = "ADD",
    Remove = "REMOVE"
}
export type SupporterConnection = {
    __typename?: 'SupporterConnection';
    edges: Array<SupporterEdge>;
    pageInfo: PageInfo;
};
export type SupporterDomain = {
    filters?: InputMaybe<SupporterFiltersInput>;
    ids?: InputMaybe<Array<Scalars['Int']>>;
};
export type SupporterEdge = {
    __typename?: 'SupporterEdge';
    cursor: Scalars['String'];
    node: Supporter;
};
export type SupporterFiltersInput = {
    campaigns?: InputMaybe<Array<Scalars['Int']>>;
    city?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    createDate?: InputMaybe<DateRange>;
    customfields?: InputMaybe<Array<CustomFieldEntityFilter>>;
    dateOfBirth?: InputMaybe<DateRange>;
    email?: InputMaybe<Scalars['String']>;
    emailMarketing?: InputMaybe<Scalars['Boolean']>;
    firstDonationDate?: InputMaybe<DateRange>;
    haveEmail?: InputMaybe<Scalars['Boolean']>;
    havePhone?: InputMaybe<Scalars['Boolean']>;
    haveSsn?: InputMaybe<Scalars['Boolean']>;
    haveVat?: InputMaybe<Scalars['Boolean']>;
    ids?: InputMaybe<Array<Scalars['Int']>>;
    isOneoffSupporter?: InputMaybe<Scalars['Boolean']>;
    isRegularSupporter?: InputMaybe<Scalars['Boolean']>;
    lastDonationDate?: InputMaybe<DateRange>;
    order?: InputMaybe<Scalars['String']>;
    peerCampaigns?: InputMaybe<Array<Scalars['Int']>>;
    phoneMarketing?: InputMaybe<Scalars['Boolean']>;
    placeOfBirth?: InputMaybe<Scalars['String']>;
    postalMarketing?: InputMaybe<Scalars['Boolean']>;
    privacyValues?: InputMaybe<Array<Scalars['String']>>;
    profilationMarketing?: InputMaybe<Scalars['Boolean']>;
    q?: InputMaybe<Scalars['String']>;
    query?: InputMaybe<Scalars['String']>;
    sex?: InputMaybe<SexFilter>;
    smsMarketing?: InputMaybe<Scalars['Boolean']>;
    tags?: InputMaybe<Array<Scalars['String']>>;
    tagsNot?: InputMaybe<Array<Scalars['String']>>;
    totalDonated?: InputMaybe<IntRange>;
    totalDonations?: InputMaybe<IntRange>;
    type?: InputMaybe<SupporterType>;
    updateDate?: InputMaybe<DateRange>;
};
export type SupporterInput = {
    address?: InputMaybe<Scalars['String']>;
    address2?: InputMaybe<Scalars['String']>;
    businessName?: InputMaybe<Scalars['String']>;
    certificationUrl?: InputMaybe<Scalars['String']>;
    city?: InputMaybe<Scalars['String']>;
    country?: InputMaybe<Scalars['String']>;
    customfields?: InputMaybe<Array<CustomFieldInput>>;
    dateOfBirth?: InputMaybe<Scalars['Date']>;
    email?: InputMaybe<Scalars['String']>;
    emailMarketing?: InputMaybe<Scalars['Boolean']>;
    externalRef?: InputMaybe<Scalars['String']>;
    firstName?: InputMaybe<Scalars['String']>;
    image?: InputMaybe<Scalars['String']>;
    job?: InputMaybe<Scalars['String']>;
    lastName?: InputMaybe<Scalars['String']>;
    locality?: InputMaybe<Scalars['String']>;
    mobile?: InputMaybe<Scalars['String']>;
    note?: InputMaybe<Scalars['String']>;
    phone?: InputMaybe<Scalars['String']>;
    phoneMarketing?: InputMaybe<Scalars['Boolean']>;
    placeOfBirth?: InputMaybe<Scalars['String']>;
    postalCode?: InputMaybe<Scalars['String']>;
    postalMarketing?: InputMaybe<Scalars['Boolean']>;
    privacyValues?: InputMaybe<Array<SupporterPrivacyInput>>;
    profilationMarketing?: InputMaybe<Scalars['Boolean']>;
    sex?: InputMaybe<Sex>;
    smsMarketing?: InputMaybe<Scalars['Boolean']>;
    sourceCampaignId?: InputMaybe<Scalars['Int']>;
    sourcePeerCampaignId?: InputMaybe<Scalars['Int']>;
    ssn?: InputMaybe<Scalars['String']>;
    supporterType?: InputMaybe<SupporterType>;
    tags?: InputMaybe<Array<Scalars['String']>>;
    title?: InputMaybe<Scalars['String']>;
    vat?: InputMaybe<Scalars['String']>;
};
export type SupporterPrivacyInput = {
    code: Scalars['String'];
    date?: InputMaybe<Scalars['String']>;
    value: Scalars['Boolean'];
};
export type SupporterPrivacyValue = {
    __typename?: 'SupporterPrivacyValue';
    code: Scalars['String'];
    date?: Maybe<Scalars['DateTime']>;
    label: Scalars['String'];
    value: Scalars['Boolean'];
};
export type SupporterResponse = {
    __typename?: 'SupporterResponse';
    supporter?: Maybe<Supporter>;
    userErrors?: Maybe<Array<UserError>>;
};
export declare enum SupporterType {
    Company = "COMPANY",
    Family = "FAMILY",
    Group = "GROUP",
    Individual = "INDIVIDUAL",
    Organization = "ORGANIZATION"
}
export type Task = {
    __typename?: 'Task';
    taskId: Scalars['String'];
};
export declare enum TemplateType {
    Blog = "BLOG",
    Campaign = "CAMPAIGN",
    Homepage = "HOMEPAGE",
    Page = "PAGE"
}
export type TerminalLocationFilters = {
    q?: InputMaybe<Scalars['String']>;
};
export type TerminalLocationInput = {
    addressCity: Scalars['String'];
    addressCountry: Scalars['String'];
    addressLine1: Scalars['String'];
    addressLine2?: InputMaybe<Scalars['String']>;
    addressPostalCode: Scalars['String'];
    addressState: Scalars['String'];
    displayName: Scalars['String'];
};
export type TerminalRegisterInput = {
    label: Scalars['String'];
    locationId: Scalars['String'];
    registrationCode: Scalars['String'];
};
export type Theme = {
    __typename?: 'Theme';
    createDate: Scalars['String'];
    documentationUrl?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    isCurrent: Scalars['Boolean'];
    isDevelopment?: Maybe<Scalars['Boolean']>;
    isPublished?: Maybe<Scalars['Boolean']>;
    name: Scalars['String'];
    parent?: Maybe<Theme>;
    shouldUpgrade: Scalars['Boolean'];
    slug: Scalars['String'];
    supportUrl?: Maybe<Scalars['String']>;
    themeData?: Maybe<ThemeData>;
    updateDate: Scalars['String'];
    uuid: Scalars['String'];
    version: Scalars['String'];
};
export type ThemeData = {
    __typename?: 'ThemeData';
    sections: Array<SectionItem>;
    settings: Scalars['JSON'];
};
export type ThemeInput = {
    isDevelopment: Scalars['Boolean'];
    name: Scalars['String'];
    slug: Scalars['String'];
    version: Scalars['String'];
};
export type ThemeUploadError = {
    __typename?: 'ThemeUploadError';
    error: Scalars['String'];
    path: Scalars['String'];
};
export type ThemeUploadResponse = {
    __typename?: 'ThemeUploadResponse';
    errors: Array<ThemeUploadError>;
    success: Scalars['Boolean'];
    theme?: Maybe<Theme>;
};
export type ThemesFiltersInput = {
    isDevelopment?: Scalars['Boolean'];
    isPublished?: Scalars['Boolean'];
};
export type TimelineActivityEvent = {
    __typename?: 'TimelineActivityEvent';
    activity?: Maybe<Activity>;
    createDate: Scalars['DateTime'];
    eventDate: Scalars['DateTime'];
    id: Scalars['Int'];
    type: TimelineEventTopic;
};
export type TimelineBasicEvent = {
    __typename?: 'TimelineBasicEvent';
    createDate: Scalars['DateTime'];
    eventDate: Scalars['DateTime'];
    id: Scalars['Int'];
    payload: Scalars['JSON'];
    type: TimelineEventTopic;
};
export type TimelineCommentEvent = {
    __typename?: 'TimelineCommentEvent';
    comment?: Maybe<Comment>;
    createDate: Scalars['DateTime'];
    eventDate: Scalars['DateTime'];
    id: Scalars['Int'];
    type: TimelineEventTopic;
};
export declare enum TimelineEventSubject {
    Checkout = "CHECKOUT",
    Donation = "DONATION",
    Supporter = "SUPPORTER"
}
export declare enum TimelineEventTopic {
    ActivityCreated = "ACTIVITY_CREATED",
    ActivityDeleted = "ACTIVITY_DELETED",
    ActivityUpdated = "ACTIVITY_UPDATED",
    CampaignCreated = "CAMPAIGN_CREATED",
    CampaignDeleted = "CAMPAIGN_DELETED",
    CampaignUpdated = "CAMPAIGN_UPDATED",
    CheckoutClosed = "CHECKOUT_CLOSED",
    CheckoutCreated = "CHECKOUT_CREATED",
    CheckoutUpdated = "CHECKOUT_UPDATED",
    CommentCreated = "COMMENT_CREATED",
    DonationCreated = "DONATION_CREATED",
    DonationUpdated = "DONATION_UPDATED",
    PaymentCreated = "PAYMENT_CREATED",
    PaymentUpdated = "PAYMENT_UPDATED",
    SupporterCreated = "SUPPORTER_CREATED",
    SupporterDeleted = "SUPPORTER_DELETED",
    SupporterDonationCreated = "SUPPORTER_DONATION_CREATED",
    SupporterUpdated = "SUPPORTER_UPDATED",
    TotemRegistered = "TOTEM_REGISTERED"
}
export type TimelineFilterInput = {
    subject: TimelineEventSubject;
    subjectId: Scalars['Int'];
};
export type Totem = {
    __typename?: 'Totem';
    campaignId?: Maybe<Scalars['Int']>;
    cover?: Maybe<Media>;
    customText: Scalars['JSON'];
    deviceId: Scalars['String'];
    flowType: FlowType;
    id: Scalars['Int'];
    name: Scalars['String'];
    terminal?: Maybe<StripeTerminal>;
    terminalId: Scalars['String'];
};
export type TotemConnection = {
    __typename?: 'TotemConnection';
    edges: Array<TotemEdge>;
    pageInfo: PageInfo;
};
export type TotemEdge = {
    __typename?: 'TotemEdge';
    cursor: Scalars['String'];
    node: Totem;
};
export type TotemInput = {
    campaignId?: InputMaybe<Scalars['Int']>;
    coverId?: InputMaybe<Scalars['Int']>;
    customText?: InputMaybe<Scalars['JSON']>;
    deviceId: Scalars['String'];
    flowType?: FlowType;
    name: Scalars['String'];
    terminalId: Scalars['String'];
};
export type TotemResponse = {
    __typename?: 'TotemResponse';
    totem?: Maybe<Totem>;
    userErrors?: Maybe<Array<UserError>>;
};
export type UnsplashPhoto = {
    __typename?: 'UnsplashPhoto';
    description?: Maybe<Scalars['String']>;
    downloadLink: Scalars['String'];
    full: Scalars['String'];
    id: Scalars['String'];
    raw: Scalars['String'];
    regular: Scalars['String'];
    small: Scalars['String'];
    thumb: Scalars['String'];
};
export type UnsplashResults = {
    __typename?: 'UnsplashResults';
    page: Scalars['Int'];
    results: Array<UnsplashPhoto>;
    total: Scalars['Int'];
    totalPages: Scalars['Int'];
};
export type User = {
    __typename?: 'User';
    email: Scalars['String'];
    id: Scalars['Int'];
    name?: Maybe<Scalars['String']>;
    verificationToken?: Maybe<Scalars['String']>;
};
export type UserError = {
    __typename?: 'UserError';
    code: ErrorCode;
    field?: Maybe<Scalars['String']>;
    message?: Maybe<Scalars['String']>;
};
export declare enum WebDocumentVisibility {
    Archived = "ARCHIVED",
    Published = "PUBLISHED",
    Unpublished = "UNPUBLISHED"
}
export type Webhook = {
    __typename?: 'Webhook';
    id: Scalars['Int'];
    topics: Array<WebhookEventTopic>;
    url: Scalars['String'];
};
export declare enum WebhookEventTopic {
    CampaignCreated = "CAMPAIGN_CREATED",
    CampaignDeleted = "CAMPAIGN_DELETED",
    CampaignUpdated = "CAMPAIGN_UPDATED",
    CheckoutClosed = "CHECKOUT_CLOSED",
    CheckoutCreated = "CHECKOUT_CREATED",
    CheckoutPaid = "CHECKOUT_PAID",
    CheckoutUpdated = "CHECKOUT_UPDATED",
    DonationCreated = "DONATION_CREATED",
    DonationUpdated = "DONATION_UPDATED",
    PaymentCreated = "PAYMENT_CREATED",
    PaymentUpdated = "PAYMENT_UPDATED",
    SupporterCreated = "SUPPORTER_CREATED",
    SupporterDeleted = "SUPPORTER_DELETED",
    SupporterUpdated = "SUPPORTER_UPDATED"
}
export type WebhookInput = {
    topics: Array<WebhookEventTopic>;
    url: Scalars['String'];
};
export type Website = {
    __typename?: 'Website';
    description: Scalars['String'];
    facebookPixel?: Maybe<Scalars['String']>;
    googleAnalytics?: Maybe<Scalars['String']>;
    limitWithPassword: Scalars['Boolean'];
    password: Scalars['String'];
    passwordMessage: Scalars['String'];
    title: Scalars['String'];
};
export type WebsiteInput = {
    description: Scalars['String'];
    facebookPixel: Scalars['String'];
    googleAnalytics: Scalars['String'];
    limitWithPassword: Scalars['Boolean'];
    password: Scalars['String'];
    passwordMessage: Scalars['String'];
    title: Scalars['String'];
};
export type CampaignCreateMutationVariables = Exact<{
    data: CampaignInput;
}>;
export type CampaignCreateMutation = {
    __typename?: 'Mutation';
    campaignCreate: {
        __typename?: 'CampaignResponse';
        campaign?: {
            __typename?: 'Campaign';
            id: number;
            title: string;
            type: CampaignType;
            content?: string | null;
            note?: string | null;
        } | null;
        userErrors?: Array<{
            __typename?: 'UserError';
            code: ErrorCode;
            field?: string | null;
            message?: string | null;
        }> | null;
    };
};
export type CampaignsListQueryVariables = Exact<{
    pagination?: InputMaybe<PaginationInput>;
    filters?: InputMaybe<CampaignFilters>;
}>;
export type CampaignsListQuery = {
    __typename?: 'Query';
    campaigns: {
        __typename?: 'CampaignConnection';
        pageInfo: {
            __typename?: 'PageInfo';
            total: number;
            startCursor?: string | null;
            endCursor?: string | null;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
        edges: Array<{
            __typename?: 'CampaignEdge';
            cursor: string;
            node: {
                __typename?: 'Campaign';
                id: number;
                title: string;
                type: CampaignType;
                visibility: WebDocumentVisibility;
                cover?: {
                    __typename?: 'Media';
                    square: string;
                } | null;
            };
        }>;
    };
};
export type GetOrganizationInfoQueryVariables = Exact<{
    [key: string]: never;
}>;
export type GetOrganizationInfoQuery = {
    __typename?: 'Query';
    organization: {
        __typename?: 'Organization';
        name: string;
        logo?: {
            __typename?: 'Media';
            square: string;
        } | null;
    };
};
export type CampaignQueryVariables = Exact<{
    campaignId: Scalars['Int'];
}>;
export type CampaignQuery = {
    __typename?: 'Query';
    campaign: {
        __typename?: 'Campaign';
        id: number;
        title: string;
        content?: string | null;
        visibility: WebDocumentVisibility;
        slug: string;
        type: CampaignType;
        createDate: any;
        cover?: {
            __typename?: 'Media';
            id: number;
            small: string;
            url: string;
        } | null;
    };
};
export type CampaignUpdateDetailMutationVariables = Exact<{
    id: Scalars['Int'];
    data: CampaignInput;
}>;
export type CampaignUpdateDetailMutation = {
    __typename?: 'Mutation';
    campaignUpdate: {
        __typename?: 'CampaignResponse';
        campaign?: {
            __typename?: 'Campaign';
            id: number;
            title: string;
        } | null;
        userErrors?: Array<{
            __typename?: 'UserError';
            code: ErrorCode;
            field?: string | null;
            message?: string | null;
        }> | null;
    };
};
export declare const CampaignCreateDocument: DocumentNode<CampaignCreateMutation, Exact<{
    data: CampaignInput;
}>>;
export declare const CampaignsListDocument: DocumentNode<CampaignsListQuery, Exact<{
    pagination?: InputMaybe<PaginationInput> | undefined;
    filters?: InputMaybe<CampaignFilters> | undefined;
}>>;
export declare const GetOrganizationInfoDocument: DocumentNode<GetOrganizationInfoQuery, Exact<{
    [key: string]: never;
}>>;
export declare const CampaignDocument: DocumentNode<CampaignQuery, Exact<{
    campaignId: Scalars['Int'];
}>>;
export declare const CampaignUpdateDetailDocument: DocumentNode<CampaignUpdateDetailMutation, Exact<{
    id: Scalars['Int'];
    data: CampaignInput;
}>>;
