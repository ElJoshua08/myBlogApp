import Link from "next/link";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-grow flex-col items-center justify-center">
      <h1 className="flex items-center gap-5 text-8xl font-semibold">
        Error <span className="text-accent-DEFUALT">404</span>
      </h1>
      <p className="text-base text-gray-600">
        {"Sorry we couldn't find the page you're looking for."}
      </p>
      
      <Link href="/" className="flex gap-2 items-center text-gray-400 hover:text-blue-300 transition-colors mt-5 text-xl">
        Go back home <HiMiniArrowUturnLeft className="inline-block" />
      </Link>
    </div>
  );
}
