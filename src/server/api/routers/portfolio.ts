import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { asc, eq, gt, inArray, sql } from "drizzle-orm";
import {
    portfolio, portfolioService,
    portfolioTag,
    portfolioTechnology,
    posts,
} from "~/server/db/schema";
import { db } from "~/server/db";
import slugify from "slugify";
import cloudinary from "~/server/helpers/cloudinary";

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
        sort: z.enum(["mr", "mv"]).default("mr"),
        tags: z.array(z.string()).optional(),
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
        query = query.where(inArray(portfolioTag.name, tags));
      }

      // Add pagination with limit and cursor
      const items = await query
        .where(gt(portfolio.id, cursor))
        .innerJoin(portfolioTag, eq(portfolio.id, portfolioTag.portfolio_id))
        .limit(8);

      const nextCursor =
        items && items.length > 0 ? items[items.length - 1]?.id : null;

      return {
        items,
        cursor: nextCursor,
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        url: z.string().url(),
        name: z.string(),
        description: z.string().optional(),
        profession: z.string(),
        tags: z.array(z.string()),
        technologies: z.array(z.string()),
        typographies: z.array(z.string()),
        services: z.array(z.string()),
        mobile_image_url: z.string().url(),
        desktop_image_url: z.string().url(),
        mobile_image_id: z.string(),
        desktop_image_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {

        // const mobile_image = await cloudinary.uploader.rename(input.mobile_image_id,  )
        

     await ctx.db.transaction(async (tx) => {
        const portfolioData = await tx
          .insert(portfolio)
          .values({
            email: input.email,
            url: input.url,
            name: input.name,
            slug: "",
            description: input.description,
            profession: input.profession,
            desktop_image_url: input.desktop_image_id,
            desktop_image_id: input.desktop_image_id,
            mobile_image_url: input.mobile_image_id,
            mobile_image_id: input.mobile_image_id,
          })
          .returning({ insertId: portfolio.id });
        const portfolio_id = portfolioData[0]?.insertId;
        const slug = slugify(`${input.name}-${portfolio_id}`);

        if (portfolio_id) {
          await tx
            .update(portfolio)
            .set({
              slug,
            })
            .where(eq(portfolio.id, portfolio_id));

          const tags = input.tags.map((item) => {
            return {
              portfolio_id,
              name: item,
            };
          });

          const technologies = input.technologies.map((item) => {
            return {
              portfolio_id,
              name: item,
            };
          });

          const services = input.services.map((item) => {
            return {
              portfolio_id,
              name: item,
            };
          });

          await tx.insert(portfolioTag).values(tags);
          await tx.insert(portfolioTechnology).values(technologies);
          await tx.insert(portfolioService).values(services);
        }
      });

      return null;
    }),
});
