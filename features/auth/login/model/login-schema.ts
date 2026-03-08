import z from "zod";

export const loginFormSchema = z.object({
  email: z.email("Type a valid e-mail"),
  password: z.string("Password is required"),
});

export type LoginFormSchemaValues = z.infer<typeof loginFormSchema>;
