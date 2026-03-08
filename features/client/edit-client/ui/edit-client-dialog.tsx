"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/components/dialog";
import { PropsWithChildren, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  editClientSchema,
  EditClientSchemaValues,
} from "../model/edit-client-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/components/field";
import { Input } from "@/shared/ui/components/input";
import { Button } from "@/shared/ui/components/button";
import { Textarea } from "@/shared/ui/components/textarea";
import { useEditClient } from "../model/use-edit-client";

type EditClientDialogProps = {
  client: {
    id: string;
    name: string;
    description: string;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: (client: { id: string; name: string; description: string; updatedAt: Date }) => void;
  onError?: (error: string) => void;
};

export function EditClientDialog(
  props: PropsWithChildren<EditClientDialogProps>,
) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = props.open ?? internalOpen;
  const setIsOpen = props.onOpenChange ?? setInternalOpen;

  const clientForm = useForm<EditClientSchemaValues>({
    resolver: zodResolver(editClientSchema),
    defaultValues: {
      id: props.client.id,
      name: props.client.name,
      description: props.client.description,
    },
  });

  const editClient = useEditClient();

  function handleDialogOpen(open: boolean) {
    if (!open && editClient.isPending) {
      return;
    }

    setIsOpen(open);
  }

  function handleSubmit(values: EditClientSchemaValues) {
    editClient.mutate(
      {
        id: values.id,
        name: values.name,
        description: values.description,
      },
      {
        onSuccess(client) {
          setIsOpen(false);
          props.onSuccess?.(client);
        },
        onError(error) {
          props.onError?.(error.message);
        },
      },
    );
  }

  useEffect(() => {
    if (isOpen) {
      clientForm.reset({
        id: props.client.id,
        name: props.client.name,
        description: props.client.description,
      });
    }
  }, [isOpen, props.client, clientForm]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit client</DialogTitle>
          <DialogDescription>
            Update the client information.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={clientForm.handleSubmit(handleSubmit)}
          className="space-y-8 mt-4"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={clientForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      disabled={editClient.isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="description"
              control={clientForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <FieldContent>
                    <Textarea
                      {...field}
                      disabled={editClient.isPending}
                      aria-invalid={fieldState.invalid}
                      placeholder="Such a nice n calm guy"
                      className="min-h-31 font-mono text-sm"
                    />

                    <FieldDescription>
                      Provide a brief description, like his personality and
                      behavior
                    </FieldDescription>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mt-4">
            <Button disabled={editClient.isPending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}