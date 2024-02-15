import { z } from "zod";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { URLSearchParams } from "url";
import { db } from "@/lib/database";
import { ogImageBlogs, ogImages } from "@/lib/database/tables";
import { isPresent } from "@/lib/util";
import { headers } from "next/headers";

export const runtime = "edge";

enum Keyword {
  Id = "id",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idParam = z.coerce
    .number()
    .safeParse(getSearchParam(searchParams, Keyword.Id));

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

  console.log(headers().get("x-forwarded-for"));

  const title = ogImageRecord.og_image_blog.title;
  const avatar = ogImageRecord.og_image_blog.icon;
  const textColor = ogImageRecord.og_image_blog.textColor;
  const backgroundColor = ogImageRecord.og_image_blog.backgroundColor;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: textColor,
          background: backgroundColor,
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <img
          alt="brand logo"
          src={
            avatar
              ? decodeURIComponent(avatar)
              : `${process.env.NEXT_PUBLIC_HOSTNAME}/argo.png`
          }
          width="64px"
          height="64px"
        />
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

function getSearchParam(
  searchParams: URLSearchParams,
  keyword: Keyword,
): string | undefined {
  const hasKeyword = searchParams.has(keyword);

  if (!hasKeyword) {
    return;
  }

  return searchParams.get(keyword)?.slice(0, 100);
}
