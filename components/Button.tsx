import Link from "next/link";
import { zillaSlab } from "utils/fonts";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  className,
  href,
  onClick,
}: ButtonProps) {
  const button = (
    <button
      className={`${zillaSlab.variable} ${className} border border-slate-400 rounded px-3 py-2 text-s text-slate-500 leading-none`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  if (href) {
    return <Link href={href}>{button}</Link>;
  }

  return button;
}
