import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
declare const documents: {
    "\n  mutation CampaignCreate($data: CampaignInput!) {\n    campaignCreate(data: $data) {\n      campaign {\n        id\n        title\n        type\n        content\n        note\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": DocumentNode<types.CampaignCreateMutation, types.Exact<{
        data: types.CampaignInput;
    }>>;
    "\n  query CampaignsList($pagination: PaginationInput, $filters: CampaignFilters) {\n    campaigns(pagination: $pagination, filters: $filters) {\n      pageInfo {\n        total\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n\n      edges {\n        cursor\n        node {\n          id\n          title\n          type\n          visibility\n          cover {\n            square\n          }\n        }\n      }\n    }\n  }\n": DocumentNode<types.CampaignsListQuery, types.Exact<{
        pagination?: types.InputMaybe<types.PaginationInput> | undefined;
        filters?: types.InputMaybe<types.CampaignFilters> | undefined;
    }>>;
    "\n  query GetOrganizationInfo {\n    organization {\n      name\n      logo {\n        square\n      }\n    }\n  }\n": DocumentNode<types.GetOrganizationInfoQuery, types.Exact<{
        [key: string]: never;
    }>>;
    "\n  query Campaign($campaignId: Int!) {\n    campaign(id: $campaignId) {\n      id\n      title\n      content\n      visibility\n      slug\n      type\n      cover {\n        id\n        small\n        url\n      }\n      createDate\n    }\n  }\n": DocumentNode<types.CampaignQuery, types.Exact<{
        campaignId: number;
    }>>;
    "\n  mutation CampaignUpdateDetail($id: Int!, $data: CampaignInput!) {\n    campaignUpdate(id: $id, data: $data) {\n      campaign {\n        id\n        title\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": DocumentNode<types.CampaignUpdateDetailMutation, types.Exact<{
        id: number;
        data: types.CampaignInput;
    }>>;
};
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function graphql(source: "\n  mutation CampaignCreate($data: CampaignInput!) {\n    campaignCreate(data: $data) {\n      campaign {\n        id\n        title\n        type\n        content\n        note\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CampaignCreate($data: CampaignInput!) {\n    campaignCreate(data: $data) {\n      campaign {\n        id\n        title\n        type\n        content\n        note\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function graphql(source: "\n  query CampaignsList($pagination: PaginationInput, $filters: CampaignFilters) {\n    campaigns(pagination: $pagination, filters: $filters) {\n      pageInfo {\n        total\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n\n      edges {\n        cursor\n        node {\n          id\n          title\n          type\n          visibility\n          cover {\n            square\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CampaignsList($pagination: PaginationInput, $filters: CampaignFilters) {\n    campaigns(pagination: $pagination, filters: $filters) {\n      pageInfo {\n        total\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n\n      edges {\n        cursor\n        node {\n          id\n          title\n          type\n          visibility\n          cover {\n            square\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function graphql(source: "\n  query GetOrganizationInfo {\n    organization {\n      name\n      logo {\n        square\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOrganizationInfo {\n    organization {\n      name\n      logo {\n        square\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function graphql(source: "\n  query Campaign($campaignId: Int!) {\n    campaign(id: $campaignId) {\n      id\n      title\n      content\n      visibility\n      slug\n      type\n      cover {\n        id\n        small\n        url\n      }\n      createDate\n    }\n  }\n"): (typeof documents)["\n  query Campaign($campaignId: Int!) {\n    campaign(id: $campaignId) {\n      id\n      title\n      content\n      visibility\n      slug\n      type\n      cover {\n        id\n        small\n        url\n      }\n      createDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function graphql(source: "\n  mutation CampaignUpdateDetail($id: Int!, $data: CampaignInput!) {\n    campaignUpdate(id: $id, data: $data) {\n      campaign {\n        id\n        title\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CampaignUpdateDetail($id: Int!, $data: CampaignInput!) {\n    campaignUpdate(id: $id, data: $data) {\n      campaign {\n        id\n        title\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export declare function graphql(source: string): unknown;
export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
export {};
