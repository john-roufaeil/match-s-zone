import { Link } from "react-router-dom";
import { Toggle } from 'react-hook-theme';

import logoWhite from "../../../assets/icons/match-s-zone/logo-white.png";
import logout from "../../../assets/icons/actions/logout.png"
import 'react-hook-theme/dist/styles/style.css';
import "./style.css"
import "../../../assets/global.css"
import Info from "../Info";

const NavBar = props => {
    const left = props.barComponents.left;
    const right = props.barComponents.right;
    return (
        <nav>
            <div className="left">
                {left == "info"?
                    <Info />
                :null}
            </div>
            <img src={logoWhite} alt="logo" className="logo"></img>
            <div className="right">   
                <Toggle />  
                {right === "login"?
                    <Link to="/login" className="nav-item">
                        <button>Log In</button>
                    </Link>
                :right === "signup"?
                    <Link to="/signup" className="nav-item">
                        <button>Sign Up</button>
                    </Link>
                :right === "logout"?
                    <Link to="/login" className="nav-item">
                        <button className="logoutButton">
                            <img className="logoutIcon" src={logout} />
                        </button>
                    </Link>
                :null}
            </div>
        </nav>
    )
}

export default NavBar;