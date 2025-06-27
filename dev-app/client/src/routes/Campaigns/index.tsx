import { FC } from 'react';
import { Outlet, RouteProps } from 'react-router-dom';
import { FiltersProvider, PaginationProvider, SelectionProvider } from '@riseact/elements';
import { DonationFiltersInput } from '@common/gql/graphql';
import List from './List';
import Detail from './Detail';
import Create from './Create';

const paramFields: Array<keyof DonationFiltersInput> = ['q', 'order', 'tags', 'tagsNot'];

interface Filters {
  name: string;
}

const Campaigns: FC<RouteProps> & {
  List: typeof List;
  Detail: typeof Detail;
  Create: typeof Create;
} = () => {
  return (
    <FiltersProvider<Filters> paramStateOptions={{ fields: paramFields }}>
      <SelectionProvider<number>>
        <PaginationProvider>
          <Outlet />
        </PaginationProvider>
      </SelectionProvider>
    </FiltersProvider>
  );
};

Campaigns.List = List;
Campaigns.Detail = Detail;
Campaigns.Create = Create;

export default Campaigns;
