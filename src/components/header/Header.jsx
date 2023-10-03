import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import {GiHamburgerMenu} from "react-icons/gi";
import {RxCross2} from "react-icons/rx";

import "./header.css";

export default function Header() {

  const [isOpen,setIsOpen] = useState(false);
  function handleClick(){
    console.log("clicked" + isOpen);
    setIsOpen(!isOpen);
  }

  return (
    <div className='headerWrapper'>
      <div className='header'>
        <div className='headerLeft'>
          <GiHamburgerMenu className='headerHamburger' onClick={handleClick}/>
          <p>RentHub</p>    
        </div>
        <div className='headerMid'>
          <input className='headerSearch' placeholder='Search Product' type="text">
          </input>
          <CiSearch className='iconSearch' />
        </div>
        <div className='headerRight'>
          <div className='loginIcon'>
            <p>Login</p>
          </div>
        </div>

      </div>

      <div className='subHeader'>
          <ul className='optionsSubHeader'>
            <li>Book</li> 
            <li>Car</li>
            <li>Bike</li>
            <li>Tablet</li>
            <li>Room</li>
            <li>Camera</li>
            <li>Mobile</li>
            <li>Laptop</li>
            <li>PC</li>
            <li>HomeAppliances</li>  
          </ul>
      </div>

      <div className='sideBar' style={{left:isOpen?'0px':'-220px'}} >
          <RxCross2 className='sideBarCross' onClick={handleClick}/>
          <ul>
            <li>HomePage</li> 
            <li>ToLet</li>
            <li>Help</li>
            <li>Contact</li>
            <li>About</li>  
          </ul>
      </div>
    </div>
  )
}
