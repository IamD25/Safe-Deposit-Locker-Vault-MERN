import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children}) => {
  return (
    <div>
      <Header></Header>
      <main style={{minHeight:"80vh"}}  >
        <ToastContainer></ToastContainer>
      {children}
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Layout;
