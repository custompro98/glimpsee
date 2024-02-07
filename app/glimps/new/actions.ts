"use server";

import { db } from "@/lib/database";
import { ogImageBlogs, ogImages } from "@/lib/database/tables";

export async function create({
    title,
    backgroundColor,
    icon,
}: {
    title: string;
    backgroundColor: string | undefined;
    icon: string;
}) {
    "use server";

    await db.transaction(async (trx) => {
        const [ogImageRecord] = await trx
            .insert(ogImages)
            .values({
                // TODO: get the user id from the session
                user_id: 5,
                type: "blog",
            })
            .returning()
            .execute();

        await trx.insert(ogImageBlogs).values({
            title,
            backgroundColor,
            icon,
            ogImageId: ogImageRecord.id,
        });
    });
}
