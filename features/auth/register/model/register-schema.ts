import z from "zod";

export const registerFormSchema = z
  .object({
    name: z.string("Inform us your name"),
    email: z.email("Type a valid e-mail"),
    password: z
      .string("Password is required")
      .min(8, "Password must have 8 characters at least")
      .max(16, "Password cannot be longer then 16 characters"),
    confirmPassword: z.string("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"]
  });

export type RegisterFormSchemaValues = z.infer<typeof registerFormSchema>;
