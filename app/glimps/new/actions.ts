"use server";

import { z } from "zod";
import { db } from "@/lib/database";
import { ogImageBlogs, ogImages } from "@/lib/database/tables";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isPresent } from "@/lib/util";

const schema = z.object({
  title: z.string(),
  background: z.string(),
  text: z.string(),
  icon: z.string().url(),
});

export async function create(formData: FormData) {
  "use server";

  const validatedInput = schema.safeParse({
    title: formData.get("title"),
    background: formData.get("background"),
    text: formData.get("text"),
    icon: formData.get("icon"),
  });

  if (!validatedInput.success) {
    return {
      errors: validatedInput.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  const userId = session?.user?.id;

  if (!isPresent(userId)) {
    throw new Error("Please sign in.");
  }

  await db.transaction(async (trx) => {
    const [ogImageRecord] = await trx
      .insert(ogImages)
      .values({
        userId: parseInt(userId || "", 10),
        type: "blog",
      })
      .returning()
      .execute();

    await trx.insert(ogImageBlogs).values({
      title: validatedInput.data.title,
      backgroundColor: validatedInput.data.background,
      textColor: validatedInput.data.text,
      icon: validatedInput.data.icon,
      ogImageId: ogImageRecord.id,
    });
  });

  revalidatePath("/glimps");
  redirect("/glimps");
}
