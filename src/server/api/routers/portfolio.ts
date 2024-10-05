import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {asc, eq, gt, inArray, sql} from "drizzle-orm";
import {portfolio, portfolioTag} from "~/server/db/schema";
import { db } from "~/server/db";

export const portfolioRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.query.portfolio.findFirst({
        where: (portfolio, { eq }) => eq(portfolio.slug, input.slug),
        with: {
          portfolio_services: true,
          portfolio_technologies: true,
          portfolio_tags: true,
        },
      });
    }),
  fotdList: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.portfolio.findMany({
      where: (portfolio, { eq }) =>
        eq(portfolio.fotd_at, sql`CURRENT_TIMESTAMP`),
      limit: 4,
    });
  }),
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(8),
        cursor: z.number().nullish(),
        sort: z.enum(['mr', 'mv']).default('mr'),
        tags: z.array(z.string()).optional()
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit;
      const cursor = input.cursor ?? 0;
      const sort = input.sort;
      const tags = input.tags;

      let query = db.select().from(portfolio).$dynamic();

      switch (sort) {
        case "mr":
          query = query.orderBy(asc(portfolio.created_at));
          break;
        case "mv":
          query = query.orderBy(asc(portfolio.views));
          break;
      }
      if (tags && tags.length > 0) {
        query = query
            .where(inArray(portfolioTag.name, tags));
      }

      // Add pagination with limit and cursor
      const items = await query
          .where(gt(portfolio.id, cursor))
          .innerJoin(portfolioTag, eq(portfolio.id, portfolioTag.portfolio_id))
          .limit(8)

      const nextCursor =
          items && items.length > 0 ? items[items.length - 1]?.id : null;

      return {
        items,
        cursor: nextCursor,
      };;
    }),
  create: publicProcedure.query(({}) => {
    return null;
  }),
});
