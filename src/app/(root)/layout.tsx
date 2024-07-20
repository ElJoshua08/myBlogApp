import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen gap-2 p-4">
      <Header />
      {children}
    </div>
  );
}
