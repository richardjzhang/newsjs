import { Playfair_Display, Zilla_Slab } from "@next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-zilla-slab",
});

export { playfair, zillaSlab };
