import darkLogo from "../assets/icons/match-s-zone/dark.png";
import lightLogo from "../assets/icons/match-s-zone/light.png";
import { Routes, Route, Link } from "react-router-dom";
import "./styles.css"
import logout from "../assets/icons/actions/logout.png"
import { ScrollToTop } from 'react-simple-scroll-up'

const NavBar = props => {
    const left = props.barComponents.left;
    const right = props.barComponents.right;
    return (
        <nav>
            <ScrollToTop />
            <div className="left">
                {left == null?null:null}
            </div>
            <img src={darkLogo} alt="logo" className="logo"></img>
            <div className="right">     
                {right === "login"?
                <Link to="/login" className="nav-item"><button>Log In</button></Link>
                :right === "signup"?
                <Link to="/signup" className="nav-item"><button>Sign Up</button></Link>
                :right === "logout"?
                <Link to="/login" className="nav-item"><button className="actionButton"><img className="actionIcon" src={logout} /></button></Link>
                :null}
            </div>
        </nav>
    )
}

export default NavBar;