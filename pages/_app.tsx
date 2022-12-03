import "styles/globals.css";
import type { AppProps } from "next/app";
import { Playfair_Display, Zilla_Slab } from "@next/font/google";
import Layout from "components/Layout";

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});
const zillaSlab = Zilla_Slab({
  weight: ["400", "600", "700"],
  variable: "--font-zilla-slab",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${playfair.variable} ${zillaSlab.variable}`}>
      <div className="font-body h-screen">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </main>
  );
}

export default MyApp;
