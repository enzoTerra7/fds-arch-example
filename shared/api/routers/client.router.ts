import prisma from "@/prisma/client";
import { createTRPCRouter, protectedProcedure } from "../init";
import z from "zod";
import { BASE_PAGINATION_SCHEMA } from "@/shared/constants/pagination";
import { ClientStatus } from "@/prisma/generated/prisma/enums";

export const clientRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      BASE_PAGINATION_SCHEMA.extend({
        search: z.string().optional(),
        status: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search, status } = input;

      const [items, totalCount] = await Promise.all([
        prisma.client.findMany({
          take: pageSize,
          skip: (page - 1) * pageSize,
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
            ...(status && {
              status: {
                equals: status as ClientStatus,
              },
            }),
          },
          select: {
            name: true,
            id: true,
            description: true,
            status: true,
            createdAt: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.client.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      return {
        items,
        totalCount,
        page,
        pageSize,
        hasNextPage,
        hasPrevPage,
        totalPages,
      };
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return prisma.client.create({
        data: {
          name: input.name,
          description: input.description,
          userId: ctx.auth.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.client.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
          description: input.description,
        },
        select: {
          id: true,
          name: true,
          description: true,
          updatedAt: true,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return prisma.client.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
});
