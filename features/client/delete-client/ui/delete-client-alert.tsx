"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/components/alert-dialog";
import { useDeleteClient } from "../model/use-delete-client";
import { toast } from "sonner";

type DeleteClientAlertProps = {
  client: {
    id: string;
    name: string;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export function DeleteClientAlert(props: DeleteClientAlertProps) {
  const deleteClient = useDeleteClient();

  function handleConfirm(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    deleteClient.mutate(
      { id: props.client.id },
      {
        onSuccess() {
          props.onOpenChange?.(false);
          toast.success("Client deleted successfully");
          props.onSuccess?.();
        },
        onError(error) {
          toast.error(error.message);
          props.onError?.(error.message);
        },
      },
    );
  }

  function handleOpenChange(open: boolean) {
    if (!open && deleteClient.isPending) {
      return;
    }

    props.onOpenChange?.(open);
  }

  return (
    <AlertDialog open={props.open} onOpenChange={handleOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete client</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{props.client.name}</strong>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteClient.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleConfirm}
            disabled={deleteClient.isPending}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
