import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/styles.css" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_HOSTNAME}/api/og?id=${52}`}
        />
      </head>
      <body className={`${inter.className} hero is-fullheight`}>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <footer className="footer has-background-grey-darker">
          <div className="content has-text-centered has-text-light">
            <p>
              <strong className="has-text-light">Glimpsee</strong> by{" "}
              <Link
                href="https://github.com/custompro98"
                className="has-text-link"
              >
                custompro98
              </Link>
              .
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
