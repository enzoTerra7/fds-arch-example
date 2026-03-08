import { useTRPC } from "@/app/_providers/trpc-provider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useListClientsParams } from "./use-list-clients-params";

export function useSuspenseGetAllClients() {
  const trpc = useTRPC();
  const [params] = useListClientsParams();

  return useSuspenseQuery(trpc.client.getAll.queryOptions(params));
}
