"use server";

import { z } from "zod";
import { db } from "@/lib/database";
import { ogImageBlogs, ogImages } from "@/lib/database/tables";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const schema = z.object({
  title: z.string(),
  background: z.string(),
  icon: z.string().url(),
});

export async function create(formData: FormData) {
  "use server";

  const validatedInput = schema.safeParse({
    title: formData.get("title"),
    background: formData.get("background"),
    icon: formData.get("icon"),
  });

  if (!validatedInput.success) {
    return {
      errors: validatedInput.error.flatten().fieldErrors,
    };
  }

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
      title: validatedInput.data.title,
      backgroundColor: validatedInput.data.background,
      icon: validatedInput.data.icon,
      ogImageId: ogImageRecord.id,
    });
  });

  revalidatePath("/glimps");
  redirect("/glimps");
}
