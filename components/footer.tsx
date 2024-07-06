import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-32">
      <div className="flex justify-center items-center h-full">
        <p className="text-sm text-gray-400">Imagine by {" "} 
        <Link href="https://nuwanperera.me">Nuwan Perera</Link>
        </p>
      </div>
    </footer>
  );
}
