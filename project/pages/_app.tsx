import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../comps/Layout'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import PokemonContextProvider from '../context/Pokemon'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <link rel="icon" href="/images/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
    </Head>
    <NextNProgress
      color="#D5BB01"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
    <PokemonContextProvider>
      <Layout>
        <Component
          {...pageProps}
        />
      </Layout>
    </PokemonContextProvider>
  </>
}

export default MyApp
