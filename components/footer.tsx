import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-32">
      <div className="flex flex-col justify-center items-center h-full">
        <p className="text-4xl select-none">🧑🏽‍💻</p>
        <p className="text-sm text-gray-400">
          Imagine by <Link href="https://nuwanperera.me" className="rounded-full">Nuwan Perera</Link>
        </p>
      </div>
    </footer>
  );
}
