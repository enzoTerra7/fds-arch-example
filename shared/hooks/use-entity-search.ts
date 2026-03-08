import { useEffect, useState } from "react";
import { PAGINATION } from "../constants/pagination";

type BaseValueExtends = {
  search: string;
  page: number;
};

type UseEntitySearchProps<T extends BaseValueExtends> = {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
};

export function useEntitySearch<T extends BaseValueExtends>({
  params,
  setParams,
  debounceMs = 500,
}: UseEntitySearchProps<T>) {
  const [localSearch, setLocalSearch] = useState(params.search);

  useEffect(() => {
    if (localSearch === "" && params.search !== "") {
      setParams({ ...params, search: "", page: PAGINATION.DEFAULT_PAGE });
      return;
    }

    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({
          ...params,
          search: localSearch,
          page: PAGINATION.DEFAULT_PAGE,
        });
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [localSearch, params, setParams, debounceMs]);

  useEffect(() => {
    setLocalSearch(params.search);
  }, [params.search]);

  return {
    searchValue: localSearch,
    onSearchValueChange: setLocalSearch,
  };
}
