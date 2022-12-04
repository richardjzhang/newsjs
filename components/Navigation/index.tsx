import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Zilla_Slab } from "@next/font/google";

const zillaSlab = Zilla_Slab({
  weight: ["400", "600", "700"],
  variable: "--font-zilla-slab",
});

export default function Navigation() {
  const { data, status } = useSession();
  const authenticated = status === "authenticated";
  const user = data?.user;
  return (
    <div className="py-4 px-3 flex align-center justify-between border-b-2">
      <div className="flex flex-1">
        {user && authenticated && (
          <button className="flex justify-start items-center text-lg">
            <Link href="/profile">{user.name}</Link>
          </button>
        )}
      </div>
      <Link className="mx-4 text-4xl font-title font-bold uppercase" href="/">
        Newsjs
      </Link>
      <div className="ml-auto flex align-center justify-end flex-1">
        {status !== "loading" && (
          <button
            className={`${zillaSlab.variable} mr-2 border rounded px-3 py-2 text-s text-gray-600 leading-none`}
            onClick={() => {
              signOut();
            }}
          >
            {authenticated && "Logout"}
            {status === "unauthenticated" && <Link href="/login">Sign in</Link>}
          </button>
        )}
      </div>
    </div>
  );
}
