import useOrganizationInfo from '@hooks/useOrganization';
import { Card, Loading, PageContainer, PageTitle } from '@riseact/elements';
import { Case, Default, Switch } from 'react-if';

const Home = () => {
  const { data, loading, error } = useOrganizationInfo();

  return (
    <PageContainer>
      <PageTitle title="Welcome to your first Riseact App" subtitle="A strongly opinionated React framework for building Riseact Apps" />

      <Switch>
        <Case condition={loading}>
          <Loading />
        </Case>
        <Case condition={!!error}>
          <Card title="Error">There was an error while fetching the data. Please try again later.</Card>
        </Case>
        <Default>
          <Card title="A short mini-guide to create Riseact Apps">
            Welcome <strong>{data?.name}!</strong>👋
            <br />
            This is your first Riseact App!
            <br />
            This app is a demo of the Riseact framework.
            <br />
          </Card>
        </Default>
      </Switch>
    </PageContainer>
  );
};

export default Home;
