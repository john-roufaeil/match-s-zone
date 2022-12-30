import lightLogo from "../assets/icons/match-s-zone/dark";
import darkLogo from "../assets/icons/match-s-zone/white";

const NavBar = props => {
    const left = props.barComponents.left;
    const right = props.barComponents.right;
    return (
        <nav>
            {left == null?<></>:<></>}
            <img src={lightLogo} alt="logo"></img>
            
        </nav>
    )
}

export default NavBar;