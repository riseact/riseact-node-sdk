import { graphql } from './gql';

export const ORGANIZATION_INFO_QUERY = graphql(`
  query GetOrganizationInfo {
    organization {
      name
      logo {
        square
      }
    }
  }
`);

export const CAMPAIGN_DETAILS_QUERY = graphql(`
  query Campaign($campaignId: Int!) {
    campaign(id: $campaignId) {
      id
      title
      content
      visibility
      slug
      type
      cover {
        id
        small
        url
      }
      createDate
    }
  }
`);

export const CAMPAIGN_UPDATE_MUTATION = graphql(`
  mutation CampaignUpdateDetail($id: Int!, $data: CampaignInput!) {
    campaignUpdate(id: $id, data: $data) {
      campaign {
        id
        title
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`);
