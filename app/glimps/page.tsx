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
                      <img
                        className="mr-2"
                        src={image.og_image_blog.icon}
                        height="16px"
                        width="16px"
                      />
                    )}
                    {image.og_image_blog.title}
                  </th>
                  <td>{image.og_image_blog.textColor}</td>
                  <td>{image.og_image_blog.backgroundColor}</td>
                  <td>{image.counts?.impressions || 0}</td>
                  <td>
                    <span className="icon">
                      <Icon path={mdiPencil} size={1} />
                    </span>
                    <span className="icon">
                      <Icon path={mdiDelete} size={1} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(listResults.hasPrev && (
          <button className="button">
            <Link href={`/glimps?page=${page - 1}`}>Prev</Link>
          </button>
        )) || <div></div>}
        {(listResults.hasNext && (
          <button className="button">
            <Link href={`/glimps?page=${page + 1}`}>Next</Link>
          </button>
        )) || <div></div>}
      </div>
    </section>
  );
}
