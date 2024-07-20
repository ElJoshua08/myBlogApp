import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 px-3 py-4 -z-10">
      <Image
        src="/waves/waveTop.svg"
        alt=""
        aria-hidden
        width={2000}
        height={10}
        className="absolute left-0 top-0 -translate-y-2 md:-translate-y-5 lg:-translate-y-10"
      />
      {children}
      <Image
        src="/waves/waveBottom.svg"
        alt=""
        aria-hidden
        width={2000}
        height={50}
        className="absolute bottom-0 left-0 -z-10 fill-current text-purple-200"
      />
    </div>
  );
}
