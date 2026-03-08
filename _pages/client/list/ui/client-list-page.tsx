import {
  ClientList,
  ClientListLoading,
  listClientsParamsLoader,
} from "@/features/client/list-client";
import { requireAuth } from "@/shared/auth/utils";
import { SearchParams } from "nuqs";
import type { PageProps } from "@/shared/types/page";
import { prefetchClientList } from "../model/prefetch-client-list";
import { WidgetClientContainer } from "@/widgets/clients/clients-list";
import { HydrateClient } from "@/shared/api/server";
import { Suspense } from "react";

export async function ClientListPage({
  searchParams,
}: PageProps<unknown, SearchParams>) {
  await requireAuth();

  const params = await listClientsParamsLoader(searchParams);

  prefetchClientList(params);

  return (
    <WidgetClientContainer>
      <HydrateClient>
        <Suspense fallback={<ClientListLoading />}>
          <ClientList />
        </Suspense>
      </HydrateClient>
    </WidgetClientContainer>
  );
}
