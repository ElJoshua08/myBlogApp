import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-700">
      {/* Latest posts */}
      <h1 className={`text-4xl font-semibold ${pacifico.className}`}>
        Welcome to my blog!
      </h1>

      <p>Home page</p>
    </main>
  );
}
