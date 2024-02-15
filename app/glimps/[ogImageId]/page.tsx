import { z } from "zod";
import Link from "next/link";
import { get, edit } from "./actions";
import { isPresent } from "@/lib/util";
import { notFound } from "next/navigation";

const paramsSchema = z
  .object({
    ogImageId: z.coerce.number(),
  })
  .strip();

type Params = z.infer<typeof paramsSchema>;

export default async function Edit({ params }: { params: Params }) {
  const validatedParams = paramsSchema.parse(params);

  const record = await get(validatedParams.ogImageId);

  if (!isPresent(record)) {
    notFound();
  }

  return (
    <section className="container">
      <form action={edit}>
        <input
          className="input"
          type="hidden"
          name="og_image_id"
          defaultValue={record.og_images.id}
          required
        />
        <div className="field">
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="my really good blog post"
            defaultValue={record.og_image_blog.title}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="text" className="label">
            Text color
          </label>
          <input
            className="input"
            type="text"
            name="text"
            placeholder="#000000"
            defaultValue={record.og_image_blog.textColor}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="background" className="label">
            Background color
          </label>
          <input
            className="input"
            type="text"
            name="background"
            placeholder="#FFFFFF"
            defaultValue={record.og_image_blog.backgroundColor}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="icon" className="label">
            Icon
          </label>
          <input
            className="input"
            type="text"
            name="icon"
            placeholder="https://example.com/my-public-image.png"
            defaultValue={record.og_image_blog.icon}
            required
          />
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <Link className="button" href="/glimps">
              Cancel
            </Link>
          </div>
          <div className="control">
            <button className="button is-primary">Update</button>
          </div>
        </div>
      </form>
    </section>
  );
}
