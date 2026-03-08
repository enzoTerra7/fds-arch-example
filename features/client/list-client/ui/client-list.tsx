"use client";
import { EntityList } from "@/shared/ui/components/entity-list";
import { useSuspenseGetAllClients } from "../model/use-suspense-get-all-clients";
import { ClientListItem } from "./client-list-item";
import { ClientListEmpty } from "./client-list-empty";

export function ClientList() {
  const clients = useSuspenseGetAllClients();

  return (
    <EntityList
      EmptyView={<ClientListEmpty />}
      items={clients.data.items}
      renderItem={ClientListItem}
    />
  );
}
