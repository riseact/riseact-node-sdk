import { CampaignFilters } from '@common/gql/graphql';
import { FilterBox, FiltersDrawer, FiltersOrder, FiltersSearchBar, useDebounce, useFilters, usePagination } from '@riseact/elements';
import { PAGE_ZERO } from '@riseact/elements/lib/esm/contexts/Pagination';
import { useMemo, useState } from 'react';

const Filters = () => {
  const { setPage } = usePagination();
  const { filters, push, remove } = useFilters<CampaignFilters>();

  const [searchValue, setSearchValue] = useState(filters.q || '');
  useDebounce(searchValue, (v) => onPush('q', v));

  const onRemove = (key: keyof CampaignFilters) => {
    remove(key);
    setPage(PAGE_ZERO);
  };

  const onPush = (key: keyof CampaignFilters, value: any) => {
    push(key, value);
    setPage(PAGE_ZERO);
  };

  const chips = useMemo(() => {
    const chips = [
      {
        label: `Name: ${filters.q}`,
        show: !!filters.q,
        onRemove: () => onRemove('q'),
      },
    ];
    return chips;
  }, [filters]);

  return (
    <FilterBox chips={chips}>
      <FiltersSearchBar onSearch={setSearchValue} value={searchValue} />
      <FiltersDrawer>
        <FiltersSearchBar onSearch={setSearchValue} value={searchValue} />
      </FiltersDrawer>
      <FiltersOrder
        value={filters.order || 'asc'}
        onChange={(value) => onPush('order', value)}
        orders={[
          { label: 'Ascendent', value: 'asc' },
          { label: 'Descendent', value: 'desc' },
        ]}
      />
    </FilterBox>
  );
};

export default Filters;
