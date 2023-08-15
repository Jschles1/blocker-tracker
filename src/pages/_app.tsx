import { type Session } from "next-auth";
import { type NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppType, AppProps } from "next/app";
import { Jost } from "next/font/google";
import { api } from "~/lib/api";
import "~/styles/globals.css";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const jost = Jost({
  weight: ["400", "700", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const Page = getLayout(<Component {...pageProps} />);
  return (
    <SessionProvider session={session as Session}>
      <>
        <style jsx global>{`
          body {
            font-family: ${jost.style.fontFamily};
          }
        `}</style>
      </>
      {Page}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
