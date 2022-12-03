import Link from "next/link";
import { Zilla_Slab } from "@next/font/google";

const zillaSlab = Zilla_Slab({
  weight: ["400", "600", "700"],
  variable: "--font-zilla-slab",
});

export default function Navigation() {
  return (
    <div className="py-4 px-3 flex align-center justify-between border-b-2">
      <button className="flex justify-start items-center flex-1 text-lg">
        <Link href="/profile">Richard</Link>
      </button>
      <Link className="mx-4 text-4xl font-title font-bold uppercase" href="/">
        Newsjs
      </Link>
      <div className="ml-auto flex align-center justify-end flex-1">
        <button
          className={`${zillaSlab.variable} mr-2 border rounded px-3 py-2 text-s text-gray-600 leading-none`}
        >
          <Link href="/login">Sign in</Link>
        </button>
        <button
          className={`${zillaSlab.variable} border rounded px-3 py-2 text-s text-gray-600 leading-none`}
        >
          <Link href="/signup">Sign up</Link>
        </button>
      </div>
    </div>
  );
}
