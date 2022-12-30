import darkLogo from "../assets/icons/match-s-zone/dark.png";
import lightLogo from "../assets/icons/match-s-zone/light.png";
import { Routes, Route, Link } from "react-router-dom";
import "./styles.css"

const NavBar = props => {
    const left = props.barComponents.left;
    const right = props.barComponents.right;
    return (
        <nav>
            <div className="left">
                {left == null?<></>:<></>}
            </div>
            <img src={darkLogo} alt="logo" className="logo"></img>
            <div className="right">     
                {right === "login"?
                <Link to="/login" className="nav-item"><button>Log In</button></Link>
                :right === "signup"?
                <Link to="/signup" className="nav-item"><button>Sign Up</button></Link>
                :null}
            </div>
        </nav>
    )
}

export default NavBar;