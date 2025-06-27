import { useMutation } from '@apollo/client';
import { graphql } from '@common/gql';
import { CampaignInput, UserError } from '@common/gql/graphql';
import { PageContainer, PageTitle } from '@riseact/elements';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import ROUTE from '@config/routing';
import { useToast } from '@chakra-ui/react';

const CAMPAIGN_CREATE_MUTATION = graphql(`
  mutation CampaignCreate($data: CampaignInput!) {
    campaignCreate(data: $data) {
      campaign {
        id
        title
        type
        content
        note
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`);

const Create: FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [campaignCreate, { loading }] = useMutation(CAMPAIGN_CREATE_MUTATION);

  const handleSubmit = async (data: CampaignInput): Promise<UserError[] | undefined> => {
    try {
      const response = await campaignCreate({ variables: { data } });
      if (response.data) {
        const { campaign, userErrors } = response.data.campaignCreate;

        if (userErrors) {
          return userErrors;
        } else if (campaign) {
          toast({
            title: `Campaign ${campaign.title} created successfully`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate(ROUTE.CAMPAIGNS_DETAIL.replace(':id', campaign.id.toString()));
        }
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Something went wrong',
        description: error?.message || 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <PageContainer contained>
      <PageTitle title="Create campaign" goBack={() => navigate(ROUTE.CAMPAIGNS)} />
      <Form onSubmit={handleSubmit} isSaveLoading={loading} />
    </PageContainer>
  );
};

export default Create;
