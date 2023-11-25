import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import { useParams } from 'react-router-dom';
import { serverURL } from '../../App';
import axios from "axios";
import { Row, Col, Container,Carousel, Image } from 'react-bootstrap';

export default function SinglePage() {
    const {postId} = useParams();
    const [productData,setProductData] = useState({});
    console.log(productData);

    useEffect(()=>{
         async function fetchFun(){
            const data = await axios.get(`${serverURL}/api/product/${postId}`);
            setProductData(data.data);
        }
        fetchFun();
    }
    ,[]);

    return (
        <div>
            <Header/>    
            <Container className='mt-4 mb-4'>
               
                    <p style={{"color":"grey", "font-size" : "25px", "text-transform": "capitalize"}}>{productData.title}</p>
                    <Row>
                        <Col className='shadow-lg m-1 p-0' xs={12} md={7}>
                            <Carousel>
                                <Carousel.Item>
                                    <Image fluid src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image fluid src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <Image fluid src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                                </Carousel.Item>
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
