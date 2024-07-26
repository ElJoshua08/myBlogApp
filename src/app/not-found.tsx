import Link from "next/link";
import { HiMiniArrowUturnLeft } from "react-icons/hi2";
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-grow flex-col items-center justify-center">
      <h1 className="flex items-center gap-5 text-8xl font-semibold">
        Error <span className="text-accent">404</span>
      </h1>
      <p className="text-base text-gray-600">
        {"Sorry we couldn't find the page you're looking for."}
      </p>

      <Link
        href="/"
        className="mt-5 flex items-center gap-2 text-xl text-gray-400 transition-colors hover:text-blue-300"
      >
        Go back home <HiMiniArrowUturnLeft className="inline-block" />
      </Link>
    </div>
  );
}
