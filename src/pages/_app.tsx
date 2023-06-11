import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import type { Session } from 'next-auth';
import type { NextComponentType } from 'next';

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps: { session, ...pageProps},
}: AppLayoutProps<{ session: Session}>) => {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page)

  return getLayout(<SessionProvider session={session}><Component {...pageProps} /></SessionProvider>)
}

export default App;
