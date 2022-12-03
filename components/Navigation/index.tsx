import Link from "next/link";
import { Zilla_Slab } from "@next/font/google";

const zillaSlab = Zilla_Slab({
  weight: ["400", "600", "700"],
  variable: "--font-zilla-slab",
});

export default function Navigation() {
  return (
    <div className="py-4 px-3 flex align-center justify-between border-b-2">
      <button className="text-lg">
        <Link href="/profile">Richard</Link>
      </button>
      <Link className="text-4xl font-title font-bold uppercase" href="/">
        Newsjs
      </Link>
      <div>
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
