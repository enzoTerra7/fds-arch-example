import { useQueryStates } from "nuqs";
import { listClientsParams } from "./get-all-clients-params";

export function useListClientsParams() {
  return useQueryStates(listClientsParams);
}
