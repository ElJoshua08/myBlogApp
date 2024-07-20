import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";
import Head from "next/head";


export const metadata: Metadata = {
  title: "My blog page",
  authors: [
    {
      name: "El joshua",
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo/logo.svg" />
      </Head>
      <body className="flex min-h-screen w-full flex-col p-4">
        <Header />
        {children}
      </body>
    </html>
  );
}
