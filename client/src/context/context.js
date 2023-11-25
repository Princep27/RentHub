import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context with a default value
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [user, setUserValue] = useState({});
  const [isLogin,setLoginValue] = useState(false);
  const [productFilter,setProductFilterValue] = useState({search:"",state:"",city:""});


  const setUser = (newValue) => {
    setUserValue(newValue);
  };

  const setIsLogin = (newValue) => {
    setLoginValue(newValue);
  }

  const setProductFilter = (newValue)=>{
    setProductFilterValue(newValue);
  }


  return (
    <MyContext.Provider value={{ user, isLogin, productFilter, setUser, setIsLogin, setProductFilter }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};

