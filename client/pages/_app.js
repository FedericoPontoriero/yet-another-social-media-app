import { ToastContainer } from 'react-toastify'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'
import { UserProvider } from '../context';


import Nav from "../components/Nav";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <Nav />
      <ToastContainer position='top-center' />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
