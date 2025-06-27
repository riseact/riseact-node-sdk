export type OrganizationInfoResponseQuery = {
  organization: {
    name: string;
    logo: {
      square: string;
    };
  };
  user: {
    name: string;
  };
};

export interface OrganizationInfoResponseBody {
  name: string;
  logoUrl: string;
}

export interface OrganizationCredentialsResponseBody {
  organizationDomain: string;
  clientToken: string;
}
