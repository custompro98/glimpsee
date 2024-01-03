"use client";

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Oggify Me",
//     description: "Generate OG images for social media posts",
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta
                    property="og:image"
                    content={`${
                        process.env.NEXT_PUBLIC_HOSTNAME
                    }/api/og?title=${encodeURIComponent(
                        "My Blog Post is Super Good",
                    )}&avatar=${encodeURIComponent(
                        "https://lh3.googleusercontent.com/a/ACg8ocJ4477pnN5d6B3xu7EAB-KTgIrcDP3BDwKcPYntEsQ12DE=s96-c",
                    )}`}
                />
            </head>
            <body className={inter.className}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
