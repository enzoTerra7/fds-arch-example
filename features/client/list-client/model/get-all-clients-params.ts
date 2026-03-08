import { PAGINATION } from "@/shared/constants/pagination";
import { parseAsString, parseAsInteger, createLoader } from "nuqs/server";

export const listClientsParams = {
  page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE).withOptions({
    clearOnDefault: true,
  }),
  status: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({
      clearOnDefault: true,
    }),
  search: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
};

export const listClientsParamsLoader = createLoader(listClientsParams);
