"use client";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
        />
        {
          // <meta
          //     property="og:image"
          //     content={`${process.env.NEXT_PUBLIC_HOSTNAME}/api/tracker?id=${some-id}`}
          // />
        }
      </head>
      <body className={`${inter.className} has-navbar-fixed-top`}>
        <SessionProvider>
          <header>
            <Navigation />
          </header>
          <main>{children}</main>
          <footer className="footer has-background-dark">
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
        </SessionProvider>
      </body>
    </html>
  );
}
