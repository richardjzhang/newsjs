import { useSession } from "next-auth/react";
import Navigation from "components/Navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { data: session, status } = useSession();
  return (
    <div className="h-full">
      <Navigation />
      <div className="py-5 h-[calc(100%-4.625rem)]">{children}</div>
    </div>
  );
}
