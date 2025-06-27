import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import NavButton from './NavButton';

interface Props {
  menu: Array<{
    title: string;
    to: string;
  }>;
}

const Navbar: FC<Props> = ({ menu }) => {
  return (
    <HStack px={6} justify="start" borderBottom="1px solid" borderColor="gray.200">
      {menu.map(({ title, to }) => (
        <NavButton key={title} title={title} to={to} />
      ))}
    </HStack>
  );
};

export default Navbar;
