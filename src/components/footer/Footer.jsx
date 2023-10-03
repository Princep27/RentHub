import './footer.css';
import { AiFillFacebook,AiOutlineInstagram,AiOutlineTwitter,AiFillYoutube,AiFillLinkedin} from "react-icons/ai";
export default function Footer(){

    return (
        <>
            <footer >
                    <div className="footerIconsWrapper">
                        <h2>RentHub</h2>
                        <div className="footerIcons">
                            <AiFillFacebook/>
                            <AiOutlineInstagram/>
                            <AiOutlineTwitter/>
                            <AiFillYoutube/>
                            <AiFillLinkedin/>
                        </div>
                <div className="copyright">	&#169;2023 RentHub. LLC. All Rights Reserved.</div>
                <hr/>
                    </div>
                <div className="footerWrapper">
                    <div className="footerLinks">
                        <h4>Quick Links</h4>
                    <ul>
                        <li>Book</li>
                        <li>Car</li>
                        <li>Room</li>
                        <li>Camera</li>
                        <li>Home Appliances</li>
                    </ul>
                    </div>
                    <div className="footerVerticalRule" id="footerVerticalRule1"></div>
                    <div className="footerLinks">
                        <h4>Account</h4>
                        <ul>
                            <li>Home</li>
                            <li>Sign Up</li>
                            <li>Login</li>
                        </ul>
                    </div>
                    <div className="footerVerticalRule" id='footerVerticalRule2'></div>
                    <div className="footerLinks">
                        <ul>
                            <li>About</li>
                            <li>Careers</li>
                            <li>Terms of Use</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>
                <hr/>
            </footer>
        </>
    )
}