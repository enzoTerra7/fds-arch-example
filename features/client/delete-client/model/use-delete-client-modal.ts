import { useState } from "react";

type DeletableClient = {
  id: string;
  name: string;
};

export function useDeleteClientModal() {
  const [selectedClient, setSelectedClient] = useState<DeletableClient | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  function openModal(client: DeletableClient) {
    setSelectedClient(client);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setSelectedClient(null);
    }
  }

  return { selectedClient, open, openModal, closeModal, handleOpenChange };
}
