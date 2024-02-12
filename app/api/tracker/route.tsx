import { URLSearchParams } from "url";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { eq, and, isNull } from "drizzle-orm";
import { db } from "@/lib/database";
import { ogImageBlogs, ogImages } from "@/lib/database/tables";
import { isPresent } from "@/lib/util";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idParam = z.number().safeParse(getSearchParam(searchParams, "id"));

  if (!idParam.success) {
    return notFound();
  }

  const [ogImageRecord] = await db
    .select()
    .from(ogImages)
    .innerJoin(ogImageBlogs, eq(ogImages.id, ogImageBlogs.ogImageId))
    .where(and(eq(ogImages.id, idParam.data), isNull(ogImages.deletedAt)))
    .limit(1)
    .execute();

  if (!isPresent(ogImageRecord)) {
    return notFound();
  }

  const title = ogImageRecord.og_image_blog.title;
  const avatar = ogImageRecord.og_image_blog.icon;

  redirect(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/og?title=${encodeURIComponent(
      title,
    )}&avatar=${encodeURIComponent(avatar)}`,
  );
}

function getSearchParam(
  searchParams: URLSearchParams,
  keyword: string,
): string | undefined {
  const hasKeyword = searchParams.has(keyword);

  if (!hasKeyword) {
    return;
  }

  return searchParams.get(keyword)?.slice(0, 100);
}
