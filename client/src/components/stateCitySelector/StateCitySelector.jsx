import { useEffect, useState } from 'react';
import { State, City }  from 'country-state-city';
import { Dropdown} from 'react-bootstrap';

// selected State/city object format
// {
//    name:"",selected:false
// }

function StateCitySelector({selectedCity,setSelectedCity ,selectedState,setSelectedState}) {
    const [filterState,setFilterState] = useState([]);
    const [filterCities,setFilterCities] = useState([]);
  
  
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
  
    //Event Handlers
    
    function handleInputStateChange(e){
      setSelectedState({name:e.target.value,selected:false});
      setSelectedCity({name:"",selected:false});
    }
  
    function handleInputCityChange(e){
      setSelectedCity({name:e.target.value,selected:false});
    }
  
  
    return ( 
        <div>
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
        </div>
     );
}

export default StateCitySelector;