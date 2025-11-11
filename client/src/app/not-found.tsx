import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[99%] bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
      <Link
        href="/dashboard"
        className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
}
