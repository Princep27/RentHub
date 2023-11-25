import { useState } from 'react';
import { Form, Modal,Button, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { serverURL } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';

function Register() {
    const navigate = useNavigate();
    const location = useLocation();

    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [reEnterPassword,setReEnterPassword] = useState();

    async function handleRegister(e){
        e.preventDefault();
        if(password !== reEnterPassword){
            toast.error("password not matched",{autoClose:1000});
            return;
        }

        const response = await axios.post(`${serverURL}/api/user/newUser`,{
            name,email,password
        });

        if(response.data.success){
            toast.success(response.data.message,{autoClose:1000});
            navigate("/login");
        }else{
            toast.error(response.data.message,{autoClose:1000})
        }
    }

    return ( <>
        <Modal show={location.pathname === "/register"} centered onHide={()=>{navigate("/")}} style={{ backgroundImage:'linear-gradient(to bottom right, #0A3E33,rgb(205, 210, 206))' }}>
        <div style={{backgroundColor:'#B9C9BC'}}>
            <Modal.Header closeButton style={{borderBottom:''}}>
                <div className="h4">Create New Account</div>
            </Modal.Header>
            <Container className='p-4'>
                <Form centered>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>NAME <span className="text-danger">*</span> </Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" required onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>EMAIL <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>PASSWORD <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>RE-ENTER PASSWORD <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" required onChange={(e)=>setReEnterPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <div className="d-flex">
                            <Form.Check type="checkbox" label="Terms & conditions" /> 
                            <span className="text-danger">&nbsp;*</span>
                        </div>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <div className="d-flex gap-3">
                            <Button type="submit" style={{backgroundColor:'#0A3E33', border:'none'}} onClick={handleRegister}>
                                REGISTER
                            </Button>
                        </div>
                    </div>
                </Form>
            </Container>
        </div>
      </Modal>
    </> );
}

export default Register;