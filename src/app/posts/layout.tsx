import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 px-3 py-4">
      <Image
        src="/waves/waveTop.svg"
        alt=""
        aria-hidden
        width={0}
        height={0}
        className="absolute left-0 top-0 -z-10 w-full"
      />
      {children}
      <Image
        src="/waves/waveBottom.svg"
        alt=""
        aria-hidden
        width={0}
        height={0}
        className="absolute bottom-0 left-0 -z-10 w-full"
      />
    </div>
  );
}
