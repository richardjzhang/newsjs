import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Button from "components/Button";

export default function NavigationButtons() {
  const { status } = useSession();
  return (
    <>
      {status === "authenticated" && (
        <>
          <Button className="mr-2 h-full" href="/post/create">
            Create
          </Button>
          <Button onClick={signOut}>Logout</Button>
        </>
      )}
      {status === "unauthenticated" && <Button href="/login">Sign in </Button>}
    </>
  );
}
