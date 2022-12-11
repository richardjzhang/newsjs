import "styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "components/Layout";
import { playfair, zillaSlab } from "utils/fonts";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={`${playfair.variable} ${zillaSlab.variable}`}>
        <div className="font-body h-screen">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </main>
    </SessionProvider>
  );
}

export default MyApp;
