import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import StateCitySelector from "../../components/stateCitySelector/StateCitySelector";
import { useState } from "react";
import DisplayImage from "../../components/displayImage/DisplayImage";
import DisplayCategory from "../../components/displayCategory/DisplayCategory";
import { serverURL } from '../../App';
import axios from "axios";
import { toast } from "react-toastify";

function AddProduct() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedState,setSelectedState] = useState({name:"",selected:false});
    const [selectedCity,setSelectedCity] = useState({name:"",selected:false});
    const [imageList,setImageList] = useState([]);
    const [categoryList,setCategoryList] = useState(['car']);
    const [description,setDesription] = useState('');
    const [title,SetTitle] = useState('');
    const [rent,setRent] = useState('');
    const [duration,SetDuration] = useState('Hour');
    

    async function handleSubmit(e){
        e.preventDefault();
        
        let formData = new FormData();
        imageList.forEach((file, index) => {
            formData.append(`photos`, file);
        });
        formData.append('title',title);
        formData.append('description',description);
        formData.append('categories',categoryList);
        formData.append('rentPrice',rent);
        formData.append('rentDuration',duration);
        formData.append('locationState',selectedState.name);
        formData.append('locationCity',selectedCity.name);

    
        const response = await axios({
            method: "post",
            url: `${serverURL}/api/product/newProduct`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        })
        
        if(response.data.success){
            toast.success(response.data.message,{ autoClose: 1000 });
            navigate("/");
        }else{
            toast.error(response.data.message,{autoClose:1000})
        }
        

    }


    // console.log(imageList);
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
                            <Form.Control type="text" placeholder="Enter Title" style={{maxWidth:'500px'}} value={title} onChange={(e)=>SetTitle(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="productDescription">
                            <Form.Label>Description :</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Enter a description upto 50 words" style={{maxWidth:'500px'}} value={description} onChange={(e)=>{setDesription(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="productCategories">
                            <Form.Label>Add Categories ( Ex. Room, Camera, Jewellery etc. ) :</Form.Label>
                            <div>
                            {
                                categoryList && categoryList.map((x,idx)=><DisplayCategory key={idx} category={x} setCategoryList={setCategoryList}/>)
                            }
                            </div>
                            <Form.Control className="mb-3" id="categoryInput" type="text" placeholder="Add category" style={{maxWidth:'500px'}}/>
                            <Button
                                style={{
                                    backgroundColor:'transparent',
                                    border:'2px solid #0A3E33',
                                    color:'#0A3E33'
                                }}

                                onClick={()=>{
                                    let inputBar = document.getElementById('categoryInput');
                                    if(inputBar.value){
                                        setCategoryList([...categoryList,inputBar.value]);
                                    }
                                    inputBar.value="";
                                }}
                            >Add</Button>
                        </Form.Group>
                        
                        <div className="d-flex" style={{maxWidth:'500px'}}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="productRentPrice">
                                        <Form.Label>Rent (in Rs.):</Form.Label>
                                        <div className="d-flex align-items-center gap-4">
                                            <Form.Control type="number" placeholder="Enter Rent in Rs." min="0" value={rent} onChange={(e)=>{setRent(e.target.value)}}/>
                                            /
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col sm={4}>
                                    <Form.Group className="mb-3" controlId="productRentDuration">
                                        <Form.Label>Duration :</Form.Label>
                                        <Form.Select onChange={(e)=>{SetDuration(e.target.value)}}>
                                            <option value="Hour">Hour</option>
                                            <option value="Day">Day</option>
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

                    
                        {
                            imageList && imageList.map((x,idx)=>{return(<span key={idx}><DisplayImage image={x} setImageList={setImageList} /></span>)})
                        }

                        <Form.Group className="mb-3">
                            {/* This Form input is hidden and is triggered by button following it */}
                            <Form.Control id="imageInput" type="file" style={
                                    {
                                        width: 0,
                                        height: 0,
                                        overflow: 'hidden',
                                        opacity: 0,
                                        appearance: 'none',
                                        position: 'absolute',
                                    }
                                } onChange={(e)=>{
                                    if(e.target.files[0]){
                                        setImageList([...imageList,e.target.files[0]]); 
                                    }
                                    e.target.value="";
                                }}
                            />
                        <Button 
                            className="mt-2"
                            onClick={()=>{document.getElementById('imageInput').click();}}
                            style={{
                                backgroundColor:'transparent',
                                border:'2px solid #0A3E33',
                                color:'#0A3E33'
                            }}
                        >
                            Add Photo
                        </Button>
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