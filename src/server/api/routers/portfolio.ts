import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const portfolioRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => {

      return null;
    }),
  getAll: publicProcedure.query(({}) => {
    return null;
  }),
  create: publicProcedure.query(({}) => {
    return null;
  }),
});
