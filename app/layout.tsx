"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*

            <head>
                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_HOSTNAME}/api/tracker?id=${some-id}`}
                />
            </head>
        */}
      <body className={inter.className}>
        <SessionProvider>
          <header>
            <Navigation />
          </header>
          <main className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
