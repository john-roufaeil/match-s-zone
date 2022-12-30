import darkLogo from "../assets/icons/match-s-zone/dark.png";
import lightLogo from "../assets/icons/match-s-zone/light.png";
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
                {right === "login"?<button>Log In</button>:<></>}
            </div>
        </nav>
    )
}

export default NavBar;