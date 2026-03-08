import { useTRPC } from "@/app/_providers/trpc-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditClient() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.client.update.mutationOptions({
      onSuccess() {
        queryClient.invalidateQueries(trpc.client.getAll.queryOptions({}));
      },
    }),
  );
}