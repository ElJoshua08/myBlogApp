import { WaveBottom, WaveTop } from "@/components/Waves";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 px-3 py-4">
      <WaveTop className="absolute top-0 left-0 -z-10 w-full" />
      {children}
      <WaveBottom className="absolute bottom-0 left-0 -z-10 w-full" />
    </div>
  );
}
