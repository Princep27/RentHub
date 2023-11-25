import axios from 'axios';
import { useState } from 'react';
import { Form, Modal,Button, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMyContext } from '../../context/context';
import { serverURL } from '../../App';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const {setIsLogin} = useMyContext();

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [rememberMe,setRememberMe] = useState(false);

    const handleLogin = async (e)=>{
        e.preventDefault();
        const response = await axios.post(`${serverURL}/api/user/login`,{
            email,
            password
        },{
            withCredentials: true
        });
        if(response.data.success){
            toast.success(response.data.message,{ autoClose: 1000 });
            setIsLogin(true);
            navigate("/");
        }else{
            toast.error(response.data.message,{ autoClose: 1000 });
        }
    }

  return (
    <>
      <Modal show={location.pathname === "/login"} centered onHide={()=>{navigate("/")}} >
        <div style={{backgroundColor:'#B9C9BC'}}>
            <Modal.Header closeButton style={{borderBottom:''}}>
                <div className="h4">Login</div>
            </Modal.Header>
            <Container className='p-4'>
                <Form centered>
                    {console.log("rendered")}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>EMAIL</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>PASSWORD</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" onClick={()=>setRememberMe(!rememberMe)} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <div className="d-flex gap-3">
                            <Button type="submit" style={{backgroundColor:'#0A3E33', border:'none'}}>
                                <Link to="/register" style={{color:"white", textDecoration:'none'}}>
                                    NEW USER
                                </Link>
                            </Button>
                            <Button type="submit" style={{backgroundColor:'#0A3E33', border:'none'}} onClick={handleLogin}>
                                LOGIN
                            </Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </div>
      </Modal>
    </>
  );
}

export default Login;