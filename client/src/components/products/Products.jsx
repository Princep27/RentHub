import React from 'react'
import Product from '../product/Product'
import "./products.css";

export default function Products({prod}) {
  return (
    <div className='products'>
        {prod && prod.map((p,index)=><Product key={index} data={p}/>)}
    </div>
  )
}
