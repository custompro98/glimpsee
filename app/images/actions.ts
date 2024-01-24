"use server";

import { db } from "@/lib/database";
import { ogImageBlogs, ogImages, users } from "@/lib/database/tables";
import { desc, eq } from "drizzle-orm";

interface ListResult<T> {
  records: T[];
  hasPrev: boolean;
  hasNext: boolean;
}

export async function list(
  email: string,
  pagination: { page?: number; limit?: number },
) {
  "use server";

  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  const offset = (page - 1) * limit;

  const ogImageRecords = await db
    .select()
    .from(ogImages)
    .innerJoin(ogImageBlogs, eq(ogImages.id, ogImageBlogs.ogImageId))
    .innerJoin(users, eq(users.email, email))
    .where(eq(ogImages.user_id, users.id))
    .offset(offset)
    .limit(limit + 1)
    .orderBy(desc(ogImages.createdAt))
    .execute();

  return makeListResult(ogImageRecords, page, limit);
}

function makeListResult<T>(
  records: T[],
  page: number,
  limit: number,
): ListResult<T> {
  return {
    records: records.slice(0, limit),
    hasPrev: page > 1,
    hasNext: records.length > limit,
  };
}
