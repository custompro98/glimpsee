import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="has-background-primary">
      <head>
        <link rel="stylesheet" href="/css/styles.css" />

        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_HOSTNAME}/api/og?id=${52}`}
        />
      </head>
      <body className={inter.className}>
        <main className="hero is-fullheight flex-direction-column is-justify-content-center">
          {children}
        </main>
      </body>
    </html>
  );
}
