import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import {GiHamburgerMenu} from "react-icons/gi";
import {RxCross2} from "react-icons/rx";
import {AiFillCaretLeft,AiFillCaretRight} from "react-icons/ai";
import { useRef } from 'react';
import { Form, FormControl, Stack } from 'react-bootstrap';
import { useMyContext } from '../../context/context';
import "./header.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverURL } from '../../App';

export default function Header() {
  const navigate = useNavigate();
  const {isLogin,setIsLogin,postFilter,setProductFilter} = useMyContext();
  const [searchText,setSearchText] = useState();
  const [isOpen,setIsOpen] = useState(false);
  function handleClick(){
    setIsOpen(!isOpen);
  }

  function handleSearch(e){
    e.preventDefault();

  
    setProductFilter((prevProductFilter)=>({
      ...prevProductFilter,
      search:searchText
    }));

    navigate("/");
  }

  async function handleLogout(){
    const response = await axios.get(`${serverURL}/api/user/logout`,{
      withCredentials: true,
    });

    if(response.data.success){
      toast.success(response.data.message,{ autoClose: 1000 });
      setIsLogin(false);
    }else{
      toast.success(response.data.message,{ autoClose: 1000 });
    }
  }

  const scrollRef = useRef(null);

  return (
    <div className='headerWrapper'>
      <div className='header'>
        <Stack direction="horizontal" className='px-3 pt-2' gap={3} style={{flex:'1'}}>
          <GiHamburgerMenu className='h3' onClick={handleClick} style={{"cursor":"pointer"}}/>
          <div className="h2">
            RentHub    
          </div>
        </Stack>

        {/* this searchbar is hidden when screen size is less than sm breakpoint */}
        <div className='d-md-block d-none m-auto px-5' style={{flex:'3'}}>
          <Form className='position-relative'  onSubmit={handleSearch}>
                <FormControl 
                    type="text"
                    placeholder="Search"
                    style={{
                      backgroundColor:'#D4E2D4',
                      border:'2px solid gray', 
                      borderRadius:'25px',
                      width:'100%',
                      height:'32px',
                      paddingRight:'35px'
                    }}
                    value={searchText}
                    onChange={(e)=>{setSearchText(e.target.value)}}
                />
            <div
                style={{
                  position:'absolute',
                  top:'0px',
                  right:'0px',
                  height:'32px',
                  cursor:'pointer'
                }}
            >
              <CiSearch className='mt-1 me-2' style={{fontSize:'24px'}} onClick={handleSearch} />
            </div>
          </Form>
        </div>

        <div className='headerRight'>
          {
            !isLogin?
            <Link to="/login" className='loginIcon' style={{textDecoration:'none',color:'black'}}>
              Login
            </Link>:
            <Link to="/" className='loginIcon' style={{textDecoration:'none',color:'black'}} onClick={handleLogout}>
              Logout
            </Link>
          }
          
        </div>

      </div>

      <div className='d-md-none d-block mb-3'>
        <Form className='position-relative w-75 ms-4' onSubmit={handleSearch}>
          <FormControl 
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e)=>{setSearchText(e.target.value)}}
          style={{
            backgroundColor:'#D4E2D4',
            border:'2px solid gray', 
            borderRadius:'25px',
            width:'100%',
            height:'32px',
            paddingRight:'35px'
          }}
          />
          <div
            style={{
              position:'absolute',
              top:'0px',
              right:'0px',
              height:'32px'
            }}
          >
            <CiSearch className='mt-1 me-2' style={{fontSize:'24px'}} onClick={handleSearch} />
          </div>
        </Form>
      </div>

      <div className='subHeader'>
          <AiFillCaretLeft onClick={()=>{scrollRef.current.scrollLeft -= 100}}/>
          <ul className='optionsSubHeader my-auto ' ref={scrollRef}>
            <li>Book</li> 
            <li>Car</li>
            <li>Bike</li>
            <li>Tablet</li>
            <li>Room</li>
            <li>Camera</li>
            <li>Mobile</li>
            <li>Laptop</li>
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
          <AiFillCaretRight onClick={()=>{scrollRef.current.scrollLeft += 100}}/>
      </div>

      <div className='sideBar' style={{left:isOpen?'0px':'-220px'}} >
          <RxCross2 className='sideBarCross' onClick={handleClick}/>
          <ul>
            <Link className='link' to="/"> <li>HomePage</li> </Link>
            <Link className='link' to="/addProduct"><li>ToLet</li></Link>
            <li>My Products</li>
            <li>Help</li>
            <li>Contact</li>
            <li>About</li>  
          </ul>
      </div>
    </div>
  )
}
