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
        avatar: text("avatar", { mode: "text" }).notNull(),
        title: text("title", { mode: "text" }).notNull(),
    },
    (table) => {
        return {
            ogImageIdIdx: index("og_image_id_idx").on(table.ogImageId),
        };
    },
);
