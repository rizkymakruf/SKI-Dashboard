import '../styles/globals.css'
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from 'react'

import App from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { LangProvider } from "context/lang";
import { GlobalProvider } from "context/global";

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (url) => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
    <GlobalProvider>
      <LangProvider>
        {getLayout(<Component {...pageProps} />)}
      </LangProvider>
    </GlobalProvider>
    </>
  )
}

export default MyApp
