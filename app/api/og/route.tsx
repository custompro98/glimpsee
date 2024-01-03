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
