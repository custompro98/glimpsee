import Link from "next/link";

export default function Images() {
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                My blog post
                            </th>
                            <td className="px-6 py-4">#FFFFFF</td>
                            <td className="px-6 py-4">
                                <Link
                                    className="text-blue-500 underline"
                                    href="https://lh3.googleusercontent.com/a/ACg8ocJ4477pnN5d6B3xu7EAB-KTgIrcDP3BDwKcPYntEsQ12DE=s96-c"
                                >
                                    Avatar
                                </Link>
                            </td>
                            <td>
                                <div className="flex flex-row space-x-2">
                                    <img
                                        src="/pencil.svg"
                                        height="16px"
                                        width="16px"
                                    />
                                    <img
                                        src="/trash.svg"
                                        height="16px"
                                        width="16px"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
