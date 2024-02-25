import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { accounts } from "./accounts";

export const ogImages = sqliteTable(
  "og_images",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    userId: integer("user_id", { mode: "number" })
      .notNull()
      .references(() => users.id),
    // this should be NOT NULL but need a custom migration for sqlite
    accountId: integer("account_id", { mode: "number" })
      .notNull()
      .references(() => accounts.id),
    type: text("type", { enum: ["blog"] }).notNull(),

    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },
  (table) => {
    return {
      userIdIdx: index("og_image_user_id_idx").on(table.userId),
    };
  },
);

export const ogImageBlogs = sqliteTable(
  "og_image_blog",
  {
    ogImageId: integer("og_image_id", { mode: "number" })
      .notNull()
      .references(() => ogImages.id),
    title: text("title", { mode: "text" }).notNull(),
    textColor: text("text_color", { mode: "text" })
      .notNull()
      .default("#000000"),
    backgroundColor: text("background_color", { mode: "text" })
      .notNull()
      .default("#FFFFFF"),
    icon: text("icon", { mode: "text" }).notNull(),
  },
  (table) => {
    return {
      ogImageIdIdx: index("og_image_blogs_og_image_id_idx").on(table.ogImageId),
    };
  },
);

export const ogImageViews = sqliteTable(
  "og_image_views",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    ogImageId: integer("og_image_id", { mode: "number" })
      .notNull()
      .references(() => ogImages.id),
    ipAddress: text("ip_address", { mode: "text" }),

    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
    deletedAt: integer("deleted_at", { mode: "timestamp" }),
  },

  (table) => {
    return {
      ogImageIdIdx: index("og_image_views_og_image_id_idx").on(table.ogImageId),
    };
  },
);
