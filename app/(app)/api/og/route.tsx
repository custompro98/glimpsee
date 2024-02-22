import { z } from "zod";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { URLSearchParams } from "url";
import { db } from "@/lib/database";
import { ogImageBlogs, ogImageViews, ogImages } from "@/lib/database/tables";
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

  const viewerIp = headers().get("x-forwarded-for");

  if (viewerIp !== "::1") {
    await db.insert(ogImageViews).values({
      ogImageId: ogImageRecord.og_images.id,
      ipAddress: viewerIp,
    });
  }

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
          style={{
            borderRadius: 128,
            marginRight: "16px",
          }}
          alt="brand logo"
          src={
            avatar
              ? decodeURIComponent(avatar)
              : `${process.env.NEXT_PUBLIC_HOSTNAME}/glimpsee-logo.jpeg`
          }
          width="128"
          height="128"
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
