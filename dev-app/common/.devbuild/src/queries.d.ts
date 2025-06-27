export declare const ORGANIZATION_INFO_QUERY: import("@graphql-typed-document-node/core").TypedDocumentNode<import("./gql/graphql").GetOrganizationInfoQuery, import("./gql/graphql").Exact<{
    [key: string]: never;
}>>;
export declare const CAMPAIGN_DETAILS_QUERY: import("@graphql-typed-document-node/core").TypedDocumentNode<import("./gql/graphql").CampaignQuery, import("./gql/graphql").Exact<{
    campaignId: number;
}>>;
export declare const CAMPAIGN_UPDATE_MUTATION: import("@graphql-typed-document-node/core").TypedDocumentNode<import("./gql/graphql").CampaignUpdateDetailMutation, import("./gql/graphql").Exact<{
    id: number;
    data: import("./gql/graphql").CampaignInput;
}>>;
