import { useQuery } from '@apollo/client';
import { Button, Center, Checkbox, Flex, HStack, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { graphql } from '@common/gql';
import { Card, Loading, PageContainer, PageTitle, Pagination, SelectionBar, useFilters, usePagination, useSelection } from '@riseact/elements';
import { FC } from 'react';
import { Case, Default, Switch, When } from 'react-if';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import { CampaignFilters } from '@common/gql/graphql';
import ROUTE from '@config/routing';
import urlJoin from 'url-join';
import VisibilityBadge from './VisibilityBadge';
import { tCampaignType } from '@utils/enumTranslate';

const CAMPAIGNS_QUERY = graphql(`
  query CampaignsList($pagination: PaginationInput, $filters: CampaignFilters) {
    campaigns(pagination: $pagination, filters: $filters) {
      pageInfo {
        total
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }

      edges {
        cursor
        node {
          id
          title
          type
          visibility
          cover {
            square
          }
        }
      }
    }
  }
`);

const List: FC = () => {
  const navigate = useNavigate();
  const { page } = usePagination();
  const { filters } = useFilters<CampaignFilters>();

  const { loading, error, data } = useQuery(CAMPAIGNS_QUERY, {
    variables: {
      pagination: page,
      filters,
    },
  });

  const { selected, areAllSelected, toggleSelectAll, toggleSelect } = useSelection<number>(data?.campaigns.pageInfo.total);

  if (error) {
    console.log(error);
  }

  return (
    <PageContainer width="full">
      <PageTitle title="Campaigns" subtitle="Functional example of how to make paginated and serchable lists with selectable records in Riseact apps">
        <HStack spacing={2}>
          <Button colorScheme="primary" onClick={() => navigate(ROUTE.CAMPAIGNS_CREATE)}>
            Add a campaign
          </Button>
        </HStack>
      </PageTitle>

      <Card.Table>
        <Filters />
        <SelectionBar isLoading={loading} visualized={data?.campaigns.edges.length} total={data?.campaigns.pageInfo.total} />

        <Flex direction="column" overflow="auto" flexGrow={1}>
          <Switch>
            <Case condition={loading}>
              <Loading flexGrow={1} />
            </Case>

            <Case condition={!data?.campaigns.edges.length}>
              <Center h="full" flexGrow={1}>
                <Text color="text.subtitle">No records yet</Text>
              </Center>
            </Case>

            <Default>
              <Table h="full">
                <Thead>
                  <Tr>
                    <Th>
                      <Checkbox isChecked={areAllSelected} onChange={() => toggleSelectAll()} />
                    </Th>
                    <Th></Th>
                    <Th>Name</Th>
                    <Th>Visibility</Th>
                    <Th>Type</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.campaigns.edges.map((campaign) => (
                    <Tr
                      key={campaign.node.id}
                      onClick={() => navigate(urlJoin(ROUTE.CAMPAIGNS, campaign.node.id!.toString()))}
                      cursor="pointer"
                      _hover={{ bg: 'gray.50' }}
                    >
                      <Td w="20px" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          isChecked={areAllSelected || selected.includes(campaign.node.id!)}
                          onChange={() => toggleSelect(campaign.node.id!)}
                        />
                      </Td>
                      <Td>
                        <When condition={campaign.node?.cover?.square}>
                          <Image src={campaign.node?.cover?.square} width="35px" height="35px" objectFit="cover" rounded="md" />
                        </When>
                      </Td>
                      <Td w="full" overflow="hidden">
                        <Text fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
                          {campaign.node.title}
                        </Text>
                      </Td>

                      <Td>
                        <VisibilityBadge value={campaign.node.visibility} />
                      </Td>

                      <Td>
                        <Text>{tCampaignType(campaign.node.type)}</Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Default>
          </Switch>
        </Flex>
        <Pagination
          pageInfo={{
            hasNextPage: false,
            hasPreviousPage: false,
            total: 1,
            endCursor: '',
            startCursor: '',
          }}
        />
      </Card.Table>
    </PageContainer>
  );
};

export default List;
