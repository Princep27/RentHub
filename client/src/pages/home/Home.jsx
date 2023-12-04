import React, { useEffect, useState } from 'react';
import "./home.css";
import Header from '../../components/header/Header';
import Products from '../../components/products/Products';
import Footer from '../../components/footer/Footer';
import {BiFilter} from "react-icons/bi";
import { State, City }  from 'country-state-city';
import { Outlet } from 'react-router-dom';
import { Button, Container, Dropdown, Modal } from 'react-bootstrap';
import { useMyContext } from '../../context/context';
import {useSearchParams} from 'react-router-dom';
import { serverURL } from '../../App';
import axios from 'axios';


export default function Home() {

  // States and contexts
  const {setProductFilter,productFilter} = useMyContext();
  const [isOpen,setIsOpen] = useState(false);
  const [filterState,setFilterState] = useState([]);
  const [filterCities,setFilterCities] = useState([]);
  const [selectedState,setSelectedState] = useState({name:"",selected:false});
  const [selectedCity,setSelectedCity] = useState({name:"",selected:false});
  const [searchParams, setSearchParams] = useSearchParams();

  //code to request Products based on Applied Filters
  const [fetchData,setFetchData] = useState([]);
  useEffect(() => {
    const fun = async()=>{
      let qcity="",qstate="",qsearch="";
      qcity =  searchParams.get('city') ? searchParams.get('city') : "";
      qstate = searchParams.get('state') ? searchParams.get('state') : "";
      qsearch = searchParams.get('search') ? searchParams.get('search') : "";
      const productData = await axios.get(`${serverURL}/api/product?city=${qcity}&state=${qstate}&search=${qsearch}`);
      setFetchData(productData);
    }
    fun();
  },[searchParams]);

  //Setting Parms URL based on Filter Applied
  useEffect(()=>setSearchParams(productFilter),[productFilter]);  

  // 
  const stateDropdown = filterState
  .filter(
    (val)=>{
      return val.name.toLowerCase().startsWith(selectedState.name.toLowerCase());
    }
  )
  .map(
      (val,index)=>{
      return <Dropdown.Item key={index} onClick={()=>setSelectedState({...val,selected:true})} >{val.name}</Dropdown.Item>
    }
  ) ;

  const cityDropdown = filterCities
  .filter((val)=>val.toLowerCase().startsWith(selectedCity.name.toLowerCase()))
  .map((val,index)=>{
    return <Dropdown.Item key={index} onClick={()=>setSelectedCity({name:val,selected:true})} >{val}</Dropdown.Item>
  })
  // Effetcs

  useEffect(()=>{
    setFilterState(
      State.getStatesOfCountry('IN').map(
        (val)=>{
          return {name:val.name,code:val.isoCode}
        }
      )
    );
  },[])

  useEffect(()=>{
    selectedState.selected && setFilterCities(City.getCitiesOfState('IN',selectedState.code).map((val)=>{ return val.name}));
  },[selectedState]);


  // Event handlers
  function handleFilterButton(){
    setIsOpen(!isOpen);
  }
  
  function handleInputStateChange(e){
    setSelectedState({name:e.target.value,selected:false});
    setSelectedCity({name:"",selected:false});
  }

  function handleInputCityChange(e){
    setSelectedCity({name:e.target.value,selected:false});
  }

  function handleApplyButton(e){
    setIsOpen(false);
    setProductFilter((prevProductFilter)=>({
      ...prevProductFilter,
      city : selectedCity.name,
      state : selectedState.name
    }))
  }


  return (
    <>
        <div >
          <Header/>
          <div className='homeWrapper'>
            <div className='heading'>
              <p>Recent</p>
              <div className='homeProductFilterButton' onClick={handleFilterButton}>Filter<BiFilter/></div>
            </div>
            <div className='productWrapperTop'>
                <Products prod={fetchData.data} />
            </div>
          </div>
        </div>
        
          <Modal show={isOpen} onHide={()=>{setIsOpen(false)}} centered>
          <div style={{backgroundColor:'#B9C9BC'}}>
          <Modal.Header closeButton>
            <h4>
              Filter
            </h4>
          </Modal.Header>
          <Container fluid className="p-4">
            <Dropdown className='my-4'>
              <div className="d-flex w-100 justify-content-center">
              <Dropdown.Toggle
                className='mx-auto'
                style={{backgroundColor:'white',border:'none',color:'gray'}}
              >
                <input 
                className='removeBorder' 
                value={selectedState.name} 
                placeholder='Select State' 
                onChange={handleInputStateChange} 
                style={{
                  border:'none',
                  width:'90%',
                }}
                />
              </Dropdown.Toggle>
              </div>
              <Dropdown.Menu style={{maxHeight:'200px', overflow:'auto'}}>
              {
                stateDropdown.length ? 
                stateDropdown
                :
                <Dropdown.Item key={'no result'} onClick={()=>setSelectedState({name:"",code:"",selected:false})}>No results</Dropdown.Item>
              }
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className='my-4'>
            <div className="d-flex w-100 justify-content-center">
            <Dropdown.Toggle style={{backgroundColor:'white',border:'none',color:'gray'}}>
              <input 
              className='removeBorder' 
              value={selectedCity.name} 
              placeholder='Select City' 
              onChange={handleInputCityChange} 
              style={{
                border:'none',
                width:'90%'
              }}
              />
            </Dropdown.Toggle>
            </div>
              <Dropdown.Menu style={{maxHeight:'200px', overflow:'auto'}}>
                  {
                    selectedState.selected &&
                    cityDropdown.length
                    ?
                    cityDropdown
                    :
                    <Dropdown.Item key={'no result'} onClick={()=>setSelectedCity({name:"",code:"",selected:false})}>No results</Dropdown.Item>
                  }
              </Dropdown.Menu>
            </Dropdown>
            <div className="d-flex w-100 justify-content-center mb-4">
              <Button 
                style={{
                  backgroundColor:'#0A3E33', 
                  border:'none',
                }}
                onClick={handleApplyButton}
              >apply</Button>
            </div>
            </Container>
          </div>
          </Modal>
        <Footer/>
        <Outlet/>
    </>
  )
}
