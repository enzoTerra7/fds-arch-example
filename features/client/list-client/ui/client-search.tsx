"use client";

import { useEntitySearch } from "@/shared/hooks/use-entity-search";
import { useListClientsParams } from "../model/use-list-clients-params";
import { EntitySearch } from "@/shared/ui/components/entity-search";

export function ClientListSearch() {
  const [params, setParams] = useListClientsParams();

  const { searchValue, onSearchValueChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      onSearch={onSearchValueChange}
      search={searchValue}
      placeholder="Search clients..."
    />
  );
}
