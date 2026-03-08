"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchemaValues } from "../model/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/shared/ui/components/field";
import { Input } from "@/shared/ui/components/input";
import { useLogin } from "../model/use-login";
import { toast } from "sonner";
import { Button } from "@/shared/ui/components/button";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const loginForm = useForm<LoginFormSchemaValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleLogin } = useLogin({
    onError(message) {
      console.log("message", message);
      toast.error(message);
    },
    onSuccess() {
      toast.success("Successfully logged in");
      router.push("/");
    },
  });

  const isPending = loginForm.formState.isSubmitting;

  return (
    <FormProvider {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(handleLogin)}
        className="space-y-6"
      >
        <Controller
          name="email"
          control={loginForm.control}
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
          control={loginForm.control}
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
        <Button type="submit" disabled={isPending} className="w-full">
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
