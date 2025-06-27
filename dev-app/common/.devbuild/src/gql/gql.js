/* eslint-disable */
import * as types from './graphql';
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
const documents = {
    "\n  mutation CampaignCreate($data: CampaignInput!) {\n    campaignCreate(data: $data) {\n      campaign {\n        id\n        title\n        type\n        content\n        note\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": types.CampaignCreateDocument,
    "\n  query CampaignsList($pagination: PaginationInput, $filters: CampaignFilters) {\n    campaigns(pagination: $pagination, filters: $filters) {\n      pageInfo {\n        total\n        startCursor\n        endCursor\n        hasNextPage\n        hasPreviousPage\n      }\n\n      edges {\n        cursor\n        node {\n          id\n          title\n          type\n          visibility\n          cover {\n            square\n          }\n        }\n      }\n    }\n  }\n": types.CampaignsListDocument,
    "\n  query GetOrganizationInfo {\n    organization {\n      name\n      logo {\n        square\n      }\n    }\n  }\n": types.GetOrganizationInfoDocument,
    "\n  query Campaign($campaignId: Int!) {\n    campaign(id: $campaignId) {\n      id\n      title\n      content\n      visibility\n      slug\n      type\n      cover {\n        id\n        small\n        url\n      }\n      createDate\n    }\n  }\n": types.CampaignDocument,
    "\n  mutation CampaignUpdateDetail($id: Int!, $data: CampaignInput!) {\n    campaignUpdate(id: $id, data: $data) {\n      campaign {\n        id\n        title\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": types.CampaignUpdateDetailDocument,
};
export function graphql(source) {
    return documents[source] ?? {};
}
