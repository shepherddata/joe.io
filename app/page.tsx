import Link from 'next/link';

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-6">Choose a profile</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Select the area you'd like to explore.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/fullstack" className="px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold">
            Full Stack Developer
          </Link>
          <Link href="/datascience" className="px-8 py-6 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-semibold">
            Data Scientist / Analyst
          </Link>
        </div>
      </div>
    </div>
  );
}
