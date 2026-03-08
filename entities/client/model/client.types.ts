import { Client } from "@/prisma/generated/prisma/client";

export type ClientList = Pick<
  Client,
  "id" | "name" | "description" | "status" | "createdAt"
>;
