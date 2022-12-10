import { useSession } from "next-auth/react";
import Navigation from "components/Navigation";
import LoadingSpinner from "components/LoadingSpinner";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full">
      <Navigation />
      <div className="py-5 h-[calc(100%-4.625rem)]">{children}</div>
    </div>
  );
}
