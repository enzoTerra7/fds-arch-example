import { useState } from "react";

type EditableClient = {
  id: string;
  name: string;
  description: string;
};

export function useEditClientModal() {
  const [selectedClient, setSelectedClient] = useState<EditableClient | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  function openModal(client: EditableClient) {
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
