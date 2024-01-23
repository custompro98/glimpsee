"use server";

import { db } from "@/lib/database";
import { ogImageBlogs, ogImages, users } from "@/lib/database/tables";
import { eq } from "drizzle-orm";

export async function list(email?: string | null) {
  "use server";

  if (!email) {
    return [];
  }

  const ogImageRecords = await db
    .select()
    .from(ogImages)
    .innerJoin(ogImageBlogs, eq(ogImages.id, ogImageBlogs.ogImageId))
    .innerJoin(users, eq(users.email, email))
    .where(eq(ogImages.user_id, users.id))
    .execute();

  return ogImageRecords;
}
