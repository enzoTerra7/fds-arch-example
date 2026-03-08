"use client";
import type { LoginFormSchemaValues } from "../model/login-schema";
import { LOGIN_CALLBACK_URL, LOGIN_REMEMBER_ME } from "../config/constants";
import { authClient } from "@/shared/auth/client";
import { SuccessContext } from "better-auth/react";

export function useLogin({
  onSuccess,
  onError,
}: {
  onSuccess: (ctx: SuccessContext) => void;
  onError: (message: string) => void;
}) {
  async function handleLogin(values: LoginFormSchemaValues) {
    try {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
          callbackURL: LOGIN_CALLBACK_URL,
          rememberMe: LOGIN_REMEMBER_ME,
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
    handleLogin,
  };
}
