import { ImageResponse } from "next/og";
import { URLSearchParams } from "url";

export const runtime = "edge";

export enum Keyword {
  Avatar = "avatar",
  Title = "title",
  Id = "id",
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = getSearchParam(searchParams, Keyword.Title);
    const avatar = getSearchParam(searchParams, Keyword.Avatar);

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: "black",
            background: "white",
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
                : "http://localhost:3000/argo.png"
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
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
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

// export async function POST(request: Request) {
//     try {
//         const form = await request.formData();
//
//         const title = form.get("title") as string;
//         const backgroundColor = (form.get("background") as string) || undefined;
//         const icon = form.get("icon") as string;
//
//         await db.transaction(async (trx) => {
//             const [ogImageRecord] = await trx
//                 .insert(ogImages)
//                 .values({
//                     // TODO: get the user id from the session
//                     user_id: 5,
//                     type: "blog",
//                 })
//                 .returning()
//                 .execute();
//
//             const ogImageBlogRecord = await trx.insert(ogImageBlogs).values({
//                 title,
//                 backgroundColor,
//                 icon,
//                 ogImageId: ogImageRecord.id,
//             });
//         });
//
//         return NextResponse.redirect(`${env.NEXT_PUBLIC_HOSTNAME}/images`);
//     } catch (e: any) {
//         console.log(`Failed to create image: ${e.message}`);
//         return new Response("Internal server error", { status: 500 });
//     }
// }
