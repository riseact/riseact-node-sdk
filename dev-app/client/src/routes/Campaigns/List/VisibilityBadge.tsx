import { Badge, BadgeProps } from '@chakra-ui/react';
import { WebDocumentVisibility } from '@common/gql/graphql';
import { tWebDocumentVisibility } from '@utils/enumTranslate';
import { FC } from 'react';

interface Props extends BadgeProps {
  value: WebDocumentVisibility;
}

const COLORS = {
  [WebDocumentVisibility.Published]: 'green',
  [WebDocumentVisibility.Unpublished]: 'gray',
  [WebDocumentVisibility.Archived]: 'gray',
};

const VisibilityBadge: FC<Props> = ({ value, ...props }) => {
  const color = COLORS[value];

  return (
    <Badge colorScheme={color} {...props}>
      {tWebDocumentVisibility(value)}
    </Badge>
  );
};

export default VisibilityBadge;
