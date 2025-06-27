import { Flex } from '@chakra-ui/react';
import Navbar from '@components/Navbar';
import ROUTE from '@config/routing';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Page: FC = () => {
  return (
    <Flex direction="column">
      <Navbar
        menu={[
          { title: 'Home', to: '/' },
          { title: 'Campaigns', to: ROUTE.CAMPAIGNS },
        ]}
      />
      <Outlet />
    </Flex>
  );
};

export default Page;
