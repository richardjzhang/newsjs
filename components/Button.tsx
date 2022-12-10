import Link from "next/link";
import { Zilla_Slab } from "@next/font/google";

const zillaSlab = Zilla_Slab({
  weight: ["400", "600", "700"],
  variable: "--font-zilla-slab",
});

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
