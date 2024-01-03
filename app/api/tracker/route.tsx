import { URLSearchParams } from "url";
import { redirect } from "next/navigation";
import env from "../../../lib/env";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = getSearchParam(searchParams, "id");

    console.log("===", id, "===");

    const title = "My Blog Post is Super Good";
    const avatar =
        "https://lh3.googleusercontent.com/a/ACg8ocJ4477pnN5d6B3xu7EAB-KTgIrcDP3BDwKcPYntEsQ12DE=s96-c";

    redirect(
        `${env.NEXT_PUBLIC_HOSTNAME}/api/og?title=${encodeURIComponent(
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
