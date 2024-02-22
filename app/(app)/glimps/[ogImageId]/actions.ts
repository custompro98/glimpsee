"use server";

import { z } from "zod";
import { db } from "@/lib/database";
import { ogImageBlogs, ogImages, users } from "@/lib/database/tables";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isPresent } from "@/lib/util";
import { and, eq } from "drizzle-orm";

export async function get(id: number) {
  "use server";

  const session = await auth();
  const userId = session?.user?.id;

  if (!isPresent(userId)) {
    throw new Error("Please sign in.");
  }

  const [ogImage] = await db
    .select()
    .from(ogImages)
    .innerJoin(ogImageBlogs, eq(ogImages.id, ogImageBlogs.ogImageId))
    .innerJoin(
      users,
      and(eq(ogImages.userId, users.id), eq(users.id, parseInt(userId, 10))),
    )
    .where(eq(ogImages.id, id))
    .limit(1)
    .execute();

  return ogImage;
}

const schema = z.object({
  ogImageId: z.coerce.number(),
  title: z.string(),
  background: z.string(),
  text: z.string(),
  icon: z.string().url(),
});

export async function edit(formData: FormData) {
  "use server";

  const validatedInput = schema.safeParse({
    ogImageId: formData.get("og_image_id"),
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

  const [ogImage] = await db
    .select()
    .from(ogImages)
    .where(eq(ogImages.id, validatedInput.data.ogImageId))
    .limit(1)
    .execute();

  if (!isPresent(ogImage) || `${ogImage.userId}` !== userId) {
    throw new Error("This is not your Glimp.");
  }

  await db
    .update(ogImageBlogs)
    .set({
      title: validatedInput.data.title,
      backgroundColor: validatedInput.data.background,
      textColor: validatedInput.data.text,
      icon: validatedInput.data.icon,
    })
    .where(eq(ogImageBlogs.ogImageId, validatedInput.data.ogImageId));

  revalidatePath("/glimps");
  redirect("/glimps");
}
