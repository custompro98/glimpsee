"use server";

import { db } from "@/lib/database";
import { ogImageBlogs, ogImageViews, ogImages } from "@/lib/database/tables";
import { and, count, desc, eq, isNull } from "drizzle-orm";

interface ListResult<T> {
  records: T[];
  hasPrev: boolean;
  hasNext: boolean;
}

export async function list(
  userId: string,
  pagination: { page?: number; limit?: number },
) {
  "use server";

  const page = pagination.page || 1;
  const limit = pagination.limit || 10;
  const offset = (page - 1) * limit;

  const countQuery = db
    .select({
      ogImageId: ogImageViews.ogImageId,
      impressions: count().as("impressions"),
    })
    .from(ogImageViews)
    .groupBy(ogImageViews.ogImageId)
    .as("counts");

  const ogImageRecords = await db
    .select()
    .from(ogImages)
    .innerJoin(ogImageBlogs, eq(ogImages.id, ogImageBlogs.ogImageId))
    .leftJoin(countQuery, eq(ogImages.id, countQuery.ogImageId))
    .where(
      and(
        eq(ogImages.userId, parseInt(userId, 10)),
        isNull(ogImages.deletedAt),
      ),
    )
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
