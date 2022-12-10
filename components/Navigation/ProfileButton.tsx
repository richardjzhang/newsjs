import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ProfileButton() {
  const { data, status } = useSession();
  const authenticated = status === "authenticated";
  const user = data?.user;
  if (user && authenticated) {
    return (
      <button className="flex justify-start items-center text-lg">
        {user.name}
      </button>
    );
  }

  return null;
}
