import { ToastContainer } from 'react-toastify'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'

import Nav from "../components/Nav";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <Nav />
      <ToastContainer position='top-center' />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
