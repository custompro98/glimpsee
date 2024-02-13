import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const ogImages = sqliteTable("og_images", {
  id: integer("id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  user_id: integer("user_id", { mode: "number" })
    .notNull()
    .references(() => users.id),
  type: text("type", { enum: ["blog"] }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

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
      ogImageIdIdx: index("og_image_id_idx").on(table.ogImageId),
    };
  },
);
