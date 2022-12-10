import Link from "next/link";
import ProfileButton from "components/Navigation/ProfileButton";
import NavigationButtons from "components/Navigation/NavigationButtons";

export default function Navigation() {
  return (
    <div className="py-4 px-3 flex align-center justify-between border-b-2 border-slate-300">
      <div className="flex flex-1">
        <ProfileButton />
      </div>
      <Link className="mx-4 text-4xl font-title font-bold uppercase" href="/">
        Newsjs
      </Link>
      <div className="ml-auto flex align-center justify-end flex-1">
        <NavigationButtons />
      </div>
    </div>
  );
}
