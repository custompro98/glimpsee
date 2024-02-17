import Link from "next/link";
import { list } from "./actions";
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil } from "@mdi/js";
import { auth } from "@/auth";
import { isPresent } from "@/lib/util";

enum SearchParamKeys {
  PAGE = "page",
}

interface SearchParams {
  [SearchParamKeys.PAGE]: string;
}

export default async function Images({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();

  if (!isPresent(session?.user?.id)) {
    return (
      <div>
        Please <Link href="/api/auth/signin">sign in</Link>
      </div>
    );
  }

  const page = parseInt(searchParams[SearchParamKeys.PAGE] || "1");
  const listResults = await list(session.user.id, { page });

  return (
    <section className="container">
      <div className="field is-grouped is-grouped-right">
        <Link href="/glimps/new" className="button is-primary">
          Create
        </Link>
      </div>
      <div className="table-container">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Text color</th>
              <th scope="col">Background color</th>
              <th scope="col">Impressions</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listResults.records.map((image) => {
              return (
                <tr key={image.og_images.id}>
                  <th scope="row">
                    {Boolean(image.og_image_blog.icon) && (
                      <figure className="image is-32x32 is-inline-block mr-2">
                        <img
                          className="is-rounded"
                          src={image.og_image_blog.icon}
                        />
                      </figure>
                    )}
                    {image.og_image_blog.title}
                  </th>
                  <td>{image.og_image_blog.textColor}</td>
                  <td>{image.og_image_blog.backgroundColor}</td>
                  <td>{image.counts?.impressions || 0}</td>
                  <td>
                    <Link href={`/glimps/${image.og_images.id}`}>
                      <span className="icon has-text-dark">
                        <Icon path={mdiPencil} size={1} />
                      </span>
                    </Link>
                    <span className="icon has-text-dark">
                      <Icon path={mdiDelete} size={1} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <Link
            className={`pagination-previous ${!listResults.hasPrev ? "is-disabled" : ""}`}
            href={`/glimps?page=${page - 1}`}
          >
            Previous
          </Link>
          <Link
            className={`pagination-next ${!listResults.hasNext ? "is-disabled" : ""}`}
            href={`/glimps?page=${page + 1}`}
          >
            Next
          </Link>
        </nav>
      </div>
    </section>
  );
}
