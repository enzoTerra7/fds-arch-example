"use client";
import type { RegisterFormSchemaValues } from "./register-schema";
import { REGISTER_CALLBACK_URL } from "../config/constants";
import { authClient } from "@/shared/auth/client";
import { SuccessContext } from "better-auth/react";

export function useRegister({
  onSuccess,
  onError,
}: {
  onSuccess: (ctx: SuccessContext) => void;
  onError: (message: string) => void;
}) {
  async function handleRegister(values: RegisterFormSchemaValues) {
    try {
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: values.name,
          callbackURL: REGISTER_CALLBACK_URL,
        },
        {
          onSuccess,
          onError({ error }) {
            onError(error.message);
          },
        },
      );
    } catch {
      onError("Something went wrong");
    }
  }

  return {
    handleRegister,
  };
}
