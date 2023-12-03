import React from 'react';
import "./product.css";
import { Link } from 'react-router-dom';

export default function Product({data}) {
  return (
    <Link to={data._id} style={{"textDecoration":"none", "color": "inherit"}}>
      <div className='productComp'>
        <div className='productImageWrapper'>
          <img className='productImage' src = {data.images && data.images[0]} alt=""/>
        </div>
        <div className='productDetailWrapper'>
          <div className='productDetailPrice'>₹ {data.rent.price}</div>
          <div className='productDetailAbout'>{data.title}</div>
          <div className='productDeatilLocationAndDateWarapper'>
              <div className='productDetailLocation'>{data.location.city} {data.location.state}</div>
              <div className='productDetailDate'>{Math.floor((new Date() - new Date(data.updatedAt)) / (1000 * 60 * 60 * 24))} day ago</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
