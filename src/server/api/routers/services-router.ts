import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const servicesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany();
  }),
});
