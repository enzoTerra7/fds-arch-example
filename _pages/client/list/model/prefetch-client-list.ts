import { prefetch, trpc } from "@/shared/api/server";
import { inferInput } from "@trpc/tanstack-react-query";

export function prefetchClientList(input: GetAllClientsInput) {
  return prefetch(trpc.client.getAll.queryOptions(input));
}

type GetAllClientsInput = inferInput<typeof trpc.client.getAll>;
