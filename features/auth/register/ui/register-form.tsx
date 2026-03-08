"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  registerFormSchema,
  RegisterFormSchemaValues,
} from "../model/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/shared/ui/components/field";
import { Input } from "@/shared/ui/components/input";
import { useRegister } from "../model/use-register";
import { toast } from "sonner";
import { Button } from "@/shared/ui/components/button";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const registerForm = useForm<RegisterFormSchemaValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { handleRegister } = useRegister({
    onError(message) {
      console.log("message", message);
      toast.error(message);
    },
    onSuccess() {
      toast.success("Successfully registered");
      router.push("/");
    },
  });

  const isPending = registerForm.formState.isSubmitting;

  return (
    <FormProvider {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(handleRegister)}
        className="space-y-6"
      >
        <Controller
          name="name"
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Type your full name"
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Type your email"
                type="email"
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Type your password"
                type="password"
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={registerForm.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Repeat your password"
                type="password"
                disabled={isPending}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          Register
        </Button>
      </form>
    </FormProvider>
  );
}
