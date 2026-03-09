"use client";
import { EntityList } from "@/shared/ui/components/entity-list";
import { useSuspenseGetAllClients } from "../model/use-suspense-get-all-clients";
import { ClientListItem } from "./client-list-item";
import { ClientListEmpty } from "./client-list-empty";
import { EditClientDialog, useEditClientModal } from "../../edit-client";
import { DeleteClientAlert, useDeleteClientModal } from "../../delete-client";

export function ClientList() {
  const clients = useSuspenseGetAllClients();
  const editModal = useEditClientModal();
  const deleteModal = useDeleteClientModal();

  return (
    <>
      <EntityList
        EmptyView={<ClientListEmpty />}
        items={clients.data.items}
        renderItem={(client) => (
          <ClientListItem
            {...client}
            onEdit={() => editModal.openModal(client)}
            onDelete={() => deleteModal.openModal(client)}
          />
        )}
      />

      {editModal.selectedClient && (
        <EditClientDialog
          client={editModal.selectedClient}
          open={editModal.open}
          onOpenChange={editModal.handleOpenChange}
        />
      )}

      {deleteModal.selectedClient && (
        <DeleteClientAlert
          client={deleteModal.selectedClient}
          open={deleteModal.open}
          onOpenChange={deleteModal.handleOpenChange}
        />
      )}
    </>
  );
}
