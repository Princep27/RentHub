import React, { useState } from 'react';
import "./home.css";
import Header from '../../components/header/Header';
import Products from '../../components/products/Products';
import Footer from '../../components/footer/Footer';
import {BiFilter} from "react-icons/bi";
import {ImCross} from "react-icons/im";

export default function Home() {

  const [isOpen,setIsOpen] = useState(false);
  function handleFilterButton(){
    setIsOpen(!isOpen);
  }

  return (
    <>
        <div style={{opacity:isOpen?'0.5':'1'}}>
          <Header/>
          <div className='homeWrapper'>
            <div className='heading'>
              <p>Recent</p>
              <div className='homeProductFilterButton' onClick={handleFilterButton}>Filter<BiFilter/></div>
            </div>
            <div className='productWrapperTop'>
                <Products/>
            </div>
          </div>
        </div>
        

        <div className='filterSideBar' style={{right:isOpen?'0vw':'-100vw'}}>
             <div className='homeFilterInputFieldWrapper'>
              <ImCross className='filterSideBarCross' onClick={handleFilterButton}/>
             </div>
          </div>
        <Footer/>
    </>
  )
}
