import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { useParams } from 'react-router-dom';
import { serverURL } from '../../App';
import axios from "axios";
import { useMyContext } from '../../context/context';
import { Row, Col, Container,Carousel, Image ,Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function SinglePage() {
    const {postId} = useParams();
    const [productData,setProductData] = useState({});
    const {user} = useMyContext();
    const navigate = useNavigate();

    useEffect(()=>{
         async function fetchFun(){
            const data = await axios.get(`${serverURL}/api/product/${postId}`);
            setProductData(data.data);
        }
        fetchFun();
    }
    ,[]);

    async function handleProductDelete(){
        const response = await axios.delete(`${serverURL}/api/product/${postId}`,{
            withCredentials: true
        });

        if(response.data.success){
            toast.success(response.data.message,{ autoClose: 1000 });
            navigate("/");
        }
    }

    return (
        <div>
            <Header/>    
            {user._id === productData.userId ? <Button variant="danger" onClick={handleProductDelete}>Delete</Button> : ""}
            <Container className='mt-4 mb-4'>
               
                    <p style={{"color":"grey", "font-size" : "25px", "text-transform": "capitalize"}}>{productData.title}</p>
                    <Row>
                        <Col className='shadow-lg m-1 p-0' xs={12} md={7}>
                            <Carousel>
                            {
                                productData.images?.map((photo, pIndex) => (
                                    <Carousel.Item key={pIndex}>
                                    <Image fluid src={photo} />
                                    </Carousel.Item>
                                ))  
                            }
                            </Carousel>
                        </Col>
                        <Col className='mt-2  mx-auto' xs={12} md={4}>
                            <Container>
                                <h2 style={{"text-transform": "capitalize"}}>{productData.title}</h2>
                                <p>{productData.description}</p>
                                
                                <div>
                                    <strong>Location :</strong> {productData?.location?.city}, {productData?.location?.state}
                                </div>
                                <div>
                                    <strong>Date:</strong> {new Date(productData.updatedAt).toLocaleDateString()}
                                </div>
                                <div>
                                    <span style={{"color":"#232323","font-weight":"500"}}>Time:</span> {new Date(productData.updatedAt).toLocaleTimeString()}
                                </div>
                            </Container>
                        </Col>
                    </Row>

            </Container>
        </div>
    )
}
