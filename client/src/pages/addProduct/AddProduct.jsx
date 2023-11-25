import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import StateCitySelector from "../../components/stateCitySelector/StateCitySelector";
import { useState } from "react";

function AddProduct() {

    const navigate = useNavigate();
    const location = useLocation();
    const [selectedState,setSelectedState] = useState({name:"",selected:false});
    const [selectedCity,setSelectedCity] = useState({name:"",selected:false});

    //form data
    const [title,setTitle] = useState("");
    const [desc,setdesc] = useState("");
    const [rentPrice,setRentPrice] = useState("");
    const [rentDuration,setRentDuration] = useState("");
    const [ProductImage,setProductImage] = useState();

    async function handleSubmit(){
        let formData = new FormData();    
        formData.append("title",title);
        formData.append("description",desc);
    }

    return ( 
        <>
            <Modal size="lg" backdrop="static" show={location.pathname === "/addProduct"} centered onHide={()=>{navigate("/")}} 
                style={{ backgroundImage:'linear-gradient(to bottom right, #0A3E33,rgb(205, 210, 206))' }}
            >
                <div style={{backgroundColor:'#B9C9BC'}}>
                <Modal.Header closeButton style={{borderBottom:''}}>
                    <div className="h4">Add New Product</div>
                </Modal.Header>
                <Modal.Body className="p-5">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="productTitle">
                            <Form.Label>Title :</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" style={{maxWidth:'500px'}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="productDescription">
                            <Form.Label>Description :</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Enter a description upto 50 words" style={{maxWidth:'500px'}}/>
                        </Form.Group>
                        
                        <div className="d-flex" style={{maxWidth:'500px'}}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="productRentPrice">
                                        <Form.Label>Rent (in Rs.):</Form.Label>
                                        <div className="d-flex align-items-center gap-4">
                                            <Form.Control type="number" placeholder="Enter Rent in Rs." min="0"/>
                                            /
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Group className="mb-3" controlId="productRentDuration">
                                        <Form.Label>Duration :</Form.Label>
                                        <Form.Select custom >
                                            <option value="hour">Hour</option>
                                            <option value="day">Day</option>
                                            <option value="Week">Week</option>
                                            <option value="Month">Month</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <Form.Group className="d-flex flex-column" style={{maxWidth:'300px'}}  controlId="stateCitySelector">
                            <Form.Label>Enter Location :</Form.Label>
                            <StateCitySelector
                                selectedCity={selectedCity}
                                selectedState={selectedState}
                                setSelectedCity={setSelectedCity}
                                setSelectedState={setSelectedState}
                            />
                        </Form.Group>
                        <Form.Group controlId="imageInput" className="mb-3">
                            <Form.Label>Upload Images of the Product</Form.Label>
                            <Form.Control type="file"/>
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button type="submit" style={{backgroundColor:'#0A3E33', border:'none'}}>
                                Add Product
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                </div>
            </Modal>
        </>
    );
}

export default AddProduct;