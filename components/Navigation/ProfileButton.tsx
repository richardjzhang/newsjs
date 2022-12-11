import { useSession } from "next-auth/react";

export default function ProfileButton() {
  const { data, status } = useSession();
  const authenticated = status === "authenticated";
  const user = data?.user;
  if (user && authenticated) {
    return (
      <div className="flex justify-start items-center text-lg">{user.name}</div>
    );
  }

  return null;
}
