import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect } from "react";
import axios from "axios";
import  {useMyContext} from "./context/context.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SinglePage from "./pages/singlePage/singlePage.jsx";
import AddProduct from "./pages/addProduct/AddProduct.jsx";

export const serverURL = "http://localhost:5000";
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    children:[
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      }
    ]
  },
  {
    path:"/:postId",
    element:<SinglePage/>
  },
  {
    path:"/addProduct",
    element:<AddProduct/>
  }
])

function App() {
  const {setUser, setIsLogin} = useMyContext();  

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/user/getMe`, {
          withCredentials:true 
        });
        if(response.data.success){
          setIsLogin(true);
          setUser(response.data.user);
        }else{
          setIsLogin(false);
          setUser({});
          console.log("user not loggin")
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer />
    </>      
  );
}

export default App;
