import { Col, Container, Row, Stack } from 'react-bootstrap';
import './footer.css';
import { AiFillFacebook,AiOutlineInstagram,AiOutlineTwitter,AiFillYoutube,AiFillLinkedin} from "react-icons/ai";
export default function Footer(){
    return (
        <>  
            <footer >
                <Container fluid className='p-4'>
                    <Row>
                    <Col xl={4} lg={5}>
                        <h2>RentHub</h2>
                        <Stack direction='horizontal' gap={4} className='mb-3'>
                            <AiFillFacebook className='footer-icon'/>
                            <AiOutlineInstagram className='footer-icon'/>
                            <AiOutlineTwitter className='footer-icon'/>
                            <AiFillYoutube className='footer-icon'/>
                            <AiFillLinkedin className='footer-icon'/>
                        </Stack>
                        <div>&#169;2023 RentHub. LLC. All Rights Reserved.</div>
                        <hr className='d-lg-block d-none' style={{maxWidth:'400px'}}/>
                        <hr className='d-lg-none'/>
                    </Col>

                    <Col lg={7}>
                        <Stack direction='horizontal' className='flex-wrap align-items-start justify-content-around'>
                            <div>
                                <h5>Quick Links</h5>
                                <div>Book           </div>
                                <div>Car            </div>
                                <div>Room           </div>
                                <div>Camera         </div>
                                <div>Home Appliances</div>
                            </div>
                            <div className="vr"></div>
                            <div>
                                <h5>Account</h5>
                                <div>Home   </div>
                                <div>Sign Up</div>
                                <div>Login  </div>
                            </div>
                            <div className="vr d-none d-sm-block"></div>
                            <div className='d-none d-sm-block'>
                                <div>About         </div>
                                <div>Careers       </div>
                                <div>Terms of Use  </div>
                                <div>Privacy Policy</div>
                            </div>
                        </Stack>
                    </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}