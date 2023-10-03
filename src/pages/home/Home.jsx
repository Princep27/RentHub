import React from 'react';
import "./home.css";
import Header from '../../components/header/Header';
import Products from '../../components/products/Products';
import Footer from '../../components/footer/Footer';
export default function Home() {
  return (
    <>
        <Header/>
        <div className='homeWrapper'>
          <div className='heading'>Recent</div>
          <div className='productWrapperTop'>
              <Products/>
          </div>
        </div>
        <Footer/>
    </>
  )
}
