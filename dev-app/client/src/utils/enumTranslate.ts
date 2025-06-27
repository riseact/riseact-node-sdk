import { CampaignType, WebDocumentVisibility } from '@common/gql/graphql';

export const tWebDocumentVisibility = (type: WebDocumentVisibility) => {
  switch (type) {
    case WebDocumentVisibility.Published:
      return 'Published';
    case WebDocumentVisibility.Unpublished:
      return 'Unpublished';
  }
};

export const tCampaignType = (type: CampaignType) => {
  switch (type) {
    case CampaignType.Donation:
      return 'Donation';
    case CampaignType.Lead:
      return 'Lead';
  }
};
