import linkedin from "../../../assets/icons/external/linkedin.png"
import github from "../../../assets/icons/external/github.png"
import logoGrey from "../../../assets/icons/match-s-zone/logo-grey.png"
import { ScrollToTop } from 'react-simple-scroll-up'
import '../../../assets/global.css'
import './style.css'

const Footer = () => {
    return (
        <div>
        <footer>
            <img src={logoGrey} alt="logo" height="35px" />
            <p className="cp-text" >© Copyright 2023 Match'S Zone. All rights reserved.</p>
            <div className="external-links">
                <a href="https://www.linkedin.com/in/john-roufaeil/" target="_blank">
                    <img src={linkedin} alt="linked-in-logo" width="35px" className="actionButton" />
                </a>
                <a href="https://github.com/john-roufaeil" target="_blank" className="actionButton">
                    <img src={github} alt="github-logo" width="35px" />
                </a>
            </div>
        </footer>
        <ScrollToTop />
        </div>
    )
}

export default Footer;