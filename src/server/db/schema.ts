import {relations, sql} from "drizzle-orm";
import {
    index,
    integer,
    pgTableCreator,
    primaryKey,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import {type AdapterAccount} from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `devfolio_${name}`);

export const tableTimestamps = {
    created_at: timestamp("created_at", {withTimezone: true})
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updated_at: timestamp("updated_at", {withTimezone: true}).$onUpdate(
        () => new Date())
};

export const posts = createTable(
    "post",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}),
        createdById: varchar("created_by", {length: 255})
            .notNull()
            .references(() => users.id),
        createdAt: timestamp("created_at", {withTimezone: true})
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at", {withTimezone: true}).$onUpdate(
            () => new Date(),
        ),
    },
    (example) => ({
        createdByIdIdx: index("created_by_idx").on(example.createdById),
        nameIndex: index("name_idx").on(example.name),
    }),
);

export const users = createTable("user", {
    id: varchar("id", {length: 255})
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", {length: 255}),
    email: varchar("email", {length: 255}).notNull(),
    emailVerified: timestamp("email_verified", {
        mode: "date",
        withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
    image: varchar("image", {length: 255}),
});

export const usersRelations = relations(users, ({many}) => ({
    accounts: many(accounts),
}));

export const accounts = createTable(
    "account",
    {
        userId: varchar("user_id", {length: 255})
            .notNull()
            .references(() => users.id),
        type: varchar("type", {length: 255})
            .$type<AdapterAccount["type"]>()
            .notNull(),
        provider: varchar("provider", {length: 255}).notNull(),
        providerAccountId: varchar("provider_account_id", {
            length: 255,
        }).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: varchar("token_type", {length: 255}),
        scope: varchar("scope", {length: 255}),
        id_token: text("id_token"),
        session_state: varchar("session_state", {length: 255}),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
        userIdIdx: index("account_user_id_idx").on(account.userId),
    }),
);

export const accountsRelations = relations(accounts, ({one}) => ({
    user: one(users, {fields: [accounts.userId], references: [users.id]}),
}));

export const sessions = createTable(
    "session",
    {
        sessionToken: varchar("session_token", {length: 255})
            .notNull()
            .primaryKey(),
        userId: varchar("user_id", {length: 255})
            .notNull()
            .references(() => users.id),
        expires: timestamp("expires", {
            mode: "date",
            withTimezone: true,
        }).notNull(),
    },
    (session) => ({
        userIdIdx: index("session_user_id_idx").on(session.userId),
    }),
);

export const sessionsRelations = relations(sessions, ({one}) => ({
    user: one(users, {fields: [sessions.userId], references: [users.id]}),
}));

export const verificationTokens = createTable(
    "verification_token",
    {
        identifier: varchar("identifier", {length: 255}).notNull(),
        token: varchar("token", {length: 255}).notNull(),
        expires: timestamp("expires", {
            mode: "date",
            withTimezone: true,
        }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({columns: [vt.identifier, vt.token]}),
    }),
);

export const portfolio = createTable(
    "portfolio",
    {
        id: serial("id").primaryKey(),
        name: text("name").notNull(),
        description: text("description"),
        devTitle: text("dev_title"),
        slug: text('slug').notNull(),
        email: text("email").unique(),
        url: text("url"),
        views: integer("views").default(0),
        fotd_at: timestamp("fotd_at"),
        desktop_image: text("desktop_image"),
        mobile_image: text("mobile_image"),
        approved_at: timestamp("approved_at"),
        ...tableTimestamps,
    },
    (table) => ({
        name_idx: index("name_idx").on(table.name),
        slug_idx: index("slug_idx").on(table.name),
    }),
);

export const portfolioTag = createTable("portfolio_tag", {
    id: serial("id").primaryKey(),
    portfolio_id: integer("portfolio_id").references(() => portfolio.id),
    name: text("name").notNull(),
});

export const portfolioService = createTable("portfolio_service", {
    id: serial("id").primaryKey(),
    portfolio_id: integer("portfolio_id").references(() => portfolio.id),
    name: text("name").notNull(),
});

export const portfolioTechnology = createTable("portfolio_technology", {
    id: serial("id").primaryKey(),
    portfolio_id: integer("portfolio_id").references(() => portfolio.id),
    name: text("name").notNull(),
});

export const porfolioTagRelaitions = relations(portfolioTag, ({one}) => ({
    portfolio: one(portfolio, {
        fields: [portfolioTag.portfolio_id],
        references: [portfolio.id],
    }),
}));

export const portfolioServiceRelaitions = relations(
    portfolioService,
    ({one}) => ({
        portfolio: one(portfolio, {
            fields: [portfolioService.portfolio_id],
            references: [portfolio.id],
        }),
    }),
);

export const porfolioTechnologyRelaitions = relations(
    portfolioTechnology,
    ({one}) => ({
        portfolio: one(portfolio, {
            fields: [portfolioTechnology.portfolio_id],
            references: [portfolio.id],
        }),
    }),
);

export const porfolioRelaitions = relations(portfolio, ({many}) => ({
    portfolio_tags: many(portfolioTag),
    portfolio_technologies: many(portfolioTechnology),
    portfolio_services: many(portfolioService),
}));
