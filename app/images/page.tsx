import Link from "next/link";
import { list } from "./actions";
import { getServerSession } from "next-auth";

export default async function Images() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return (
      <div>
        Please <Link href="/api/auth/signin">sign in</Link>
      </div>
    );
  }
  const images = await list(session.user.email);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Background Color
              </th>
              <th scope="col" className="px-6 py-3">
                Icon
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => {
              return (
                <tr
                  key={image.og_images.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {image.og_image_blog.title}
                  </th>
                  <td className="px-6 py-4">
                    {image.og_image_blog.backgroundColor}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      className="text-blue-500 underline"
                      href={image.og_image_blog.icon}
                    >
                      Avatar
                    </Link>
                  </td>
                  <td>
                    <div className="flex flex-row space-x-2">
                      <img src="/pencil.svg" height="16px" width="16px" />
                      <img src="/trash.svg" height="16px" width="16px" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
