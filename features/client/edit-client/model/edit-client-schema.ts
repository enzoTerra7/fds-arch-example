import z from "zod";

export const editClientSchema = z.object({
  id: z.string(),
  name: z
    .string("Type a valid name")
    .min(3, "Name must have at least 3 characters"),
  description: z
    .string("Description must be filled")
    .min(3, "Description must have at least 3 characters"),
});

export type EditClientSchemaValues = z.infer<typeof editClientSchema>;