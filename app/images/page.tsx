import Link from "next/link";
import { list } from "./actions";
import { getServerSession } from "next-auth";

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
  const session = await getServerSession();

  if (!session?.user?.email) {
    return (
      <div>
        Please <Link href="/api/auth/signin">sign in</Link>
      </div>
    );
  }

  const page = parseInt(searchParams[SearchParamKeys.PAGE] || "1");
  const listResults = await list(session.user.email, { page });

  return (
    <section>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Background Color</th>
              <th scope="col">Icon</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listResults.records.map((image) => {
              return (
                <tr key={image.og_images.id}>
                  <th scope="row">{image.og_image_blog.title}</th>
                  <td>{image.og_image_blog.backgroundColor}</td>
                  <td>
                    <Link href={image.og_image_blog.icon}>Avatar</Link>
                  </td>
                  <td>
                    <div>
                      <img src="/pencil.svg" height="16px" width="16px" />
                      <img src="/trash.svg" height="16px" width="16px" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          {(listResults.hasPrev && (
            <button>
              <Link href={`/images?page=${page - 1}`}>Prev</Link>
            </button>
          )) || <div></div>}
          {(listResults.hasNext && (
            <button>
              <Link href={`/images?page=${page + 1}`}>Next</Link>
            </button>
          )) || <div></div>}
        </div>
      </div>
    </section>
  );
}
