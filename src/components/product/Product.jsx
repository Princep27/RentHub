import React from 'react';
import "./product.css";

export default function Product() {
  return (
    <div className='productComp'>
      <div className='productImageWrapper'>
        <img className='productImage' src = "https://source.unsplash.com/random/1280x720/?old+vehicle" alt=""/>
      </div>
      <div className='productDetailWrapper'>
         <div className='productDetailPrice'>₹ 1,00,000</div>
         <div className='productDetailAbout'>Mahindra XUV300, 4 Year old</div>
         <div className='productDeatilLocationAndDateWarapper'>
            <div className='productDetailLocation'>Rau Indore</div>
            <div className='productDetailDate'>1 day ago</div>
         </div>
      </div>
    </div>
  )
}
