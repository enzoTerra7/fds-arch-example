"use client";

import { Client } from "@/prisma/generated/prisma/client";
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
  createClientSchema,
  CreateClientSchemaValues,
} from "../model/create-client-schema";
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
import { useCreateClient } from "../model/use-create-client";

type CreateClientDialogProps = {
  onSuccess?: (client: Client) => void;
  onError?: (error: string) => void;
  defaultFields?: Partial<CreateClientSchemaValues>;
};

export function CreateClientDialog(
  props: PropsWithChildren<CreateClientDialogProps>,
) {
  const [isOpen, setIsOpen] = useState(false);

  const clientForm = useForm<CreateClientSchemaValues>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: props.defaultFields?.name,
      description: props.defaultFields?.description,
    },
  });

  const createClient = useCreateClient();

  function handleDialogOpen(open: boolean) {
    if (!open && createClient.isPending) {
      return;
    }

    setIsOpen(open);
  }

  function handleSubmit(values: CreateClientSchemaValues) {
    createClient.mutate(
      {
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
        name: props.defaultFields?.name ?? "",
        description: props.defaultFields?.description ?? "",
      });
    }
  }, [isOpen, props.defaultFields, clientForm]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a client</DialogTitle>
          <DialogDescription>
            Provide some basic data to add the client.
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
                      disabled={createClient.isPending}
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
                      disabled={createClient.isPending}
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
            <Button disabled={createClient.isPending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
