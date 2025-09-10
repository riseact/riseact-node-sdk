import { isApolloError } from '@apollo/client';
import { ORGANIZATION_INFO_QUERY } from '@common/queries';
import { OrganizationCredentialsResponseBody, OrganizationInfoResponseQuery, OrganizationInfoResponseBody } from '@common/types';
import safeAsyncHandler from '@utils/safeAsyncHandler';
import { RequestHandler } from 'express';

// Get the organization info from the GraphQL API.
export const OrganizationInfoHandler: RequestHandler<null, OrganizationInfoResponseBody, null> = safeAsyncHandler(async (req, res) => {
  try {
    // Create a GraphQL client for the user's organization
    const graphqlClient = await req.riseact.network.createGqlClient(req.organizationDomain);

    // Get the organization type from the common package
    const { data, error } = await graphqlClient.query<OrganizationInfoResponseQuery>({
      // Get the organization query from the common package
      query: ORGANIZATION_INFO_QUERY,
    });

    if (error) {
      if (error) console.debug(error);
      return res.sendStatus(500);
    }

    // Return the organization data
    return res.json({
      name: data.organization.name,
      logoUrl: data.organization.logo?.square,
    });
  } catch (err: any) {
    if (isApolloError(err) && (err.cause as any).statusCode) {
      return res.sendStatus((err.cause as any).statusCode);
    }
    console.error(err);
    return res.sendStatus(500);
  }
});

// Get the organization client token from DB. This is useless, but it shows how to use your prisma client.
export const OrganizationCredentialsHandler: RequestHandler<null, OrganizationCredentialsResponseBody, null> = safeAsyncHandler(async (req, res) => {
  // Get the organization credentials from the database
  const credentials = await req.riseact.storage.getCredentialsByOrganizationDomain(req.organizationDomain);

  if (!credentials) {
    return res.sendStatus(500);
  }

  // Return the organization data
  return res.json({
    clientToken: credentials.clientToken,
    organizationDomain: req.organizationDomain,
  });
});
