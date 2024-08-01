import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VlogApp :)",
  authors: [
    {
      name: "El joshua",
    },
  ],
  icons: {
    icon: "/logo/logo.png",
  },
  other: {
    "google-site-verification": "71lOWO-kMpqb6Fg-UmWYsiE6d5y_GjxB122mkNoFd9w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Utilizando `metadata` para incluir automáticamente las etiquetas meta */}
        <meta
          name="google-site-verification"
          content="71lOWO-kMpqb6Fg-UmWYsiE6d5y_GjxB122mkNoFd9w"
        />
      </head>
      <body>
        <main className="relative flex min-h-screen w-full flex-grow flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
