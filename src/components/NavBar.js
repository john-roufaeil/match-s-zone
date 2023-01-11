import { useState } from "react";
import { Link } from "react-router-dom";
import { Toggle } from 'react-hook-theme';
import darkLogo from "../assets/icons/match-s-zone/dark.png";
import logout from "../assets/icons/actions/logout.png"
import info from "../assets/icons/actions/info.png"
import 'react-hook-theme/dist/styles/style.css';
import "./styles.css"
import FadeIn from 'react-fade-in';
import Modal, { ModalProvider } from "styled-react-modal";
import arrow from "../assets/gifs/arrow.gif"
import balls from "../assets/icons/decoration/balls.png"

function FancyModalButton(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);
    function toggleModal(e) {
      setOpacity(0);
      setIsOpen(!isOpen);
    }
    function afterOpen() {
      setTimeout(() => {
        setOpacity(1);
      }, 100);
    }
    function beforeClose() {
      return new Promise((resolve) => {
        setOpacity(0);
        setTimeout(resolve, 300);
      });
    }

    return (
        <div>
        <button style={{backgroundColor: "transparent", cursor:"pointer"}} onClick={toggleModal}><img width="50px" src={info} alt="alternative text" style={{backgroundColor: "transparent"}} title="Send a host request" /> </button>
        <Modal isOpen={isOpen} afterOpen={afterOpen} beforeClose={beforeClose} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal} opacity={opacity} backgroundProps={{ opacity }}>
            <FadeIn>
                <div className="info">
                    <FadeIn>
                        <div className="block">
                            <h1>Welcome to Match'S Zone!</h1>
                            <p className="champions">Where Champions Meet</p>
                        </div>
                    <hr />
                    </FadeIn>
                        <div className="block">
                            <h3>About</h3>
                            <ul>
                                <li> This is where you can find and buy tickets for matches of your favorite clubs with ease and from the comfort of your home.</li>
                                <li>The system of this website tracks clubs and their representatives, stadiums and their managers, sports association managers, fans and the tickets they bought, as well as past and future matches with their relative information.</li>
                            </ul>
                        </div>
                        <div className="block">
                            <h3>Users</h3>
                            <ul>
                                <li>The Match'S Zone system can be accessed by 5 different types of users:</li>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Administrator</td>
                                        <td>Authorized to view all clubs, stadiums, and users.<br />
                                        Responsible of blocking and unblocking fans, adding and deleting clubs and stadiums.</td>
                                    </tr>
                                    <tr>
                                        <td>Sports Association Manager</td>
                                        <td>Authorized to view all matches and all pairs of clubs that do not have a scheduled match together.<br />
                                        Responsible of adding and deleting matches.</td>
                                    </tr>
                                    <tr>
                                        <td>Club Representative</td>
                                        <td>Authorized to view all details about their club and the upcoming matches of the club. <br /> 
                                        Inspect all of the available stadiums at a certain time.<br />
                                        Responsible of sending requests to stadium managers to host their matches.</td>
                                    </tr>
                                    <tr>
                                        <td>Sports Manager</td>
                                        <td>Authorized to view all details about their stadium and the matches played on it. <br /> 
                                        Responsible of handling received host requests on their stadium.</td>
                                    </tr>
                                    <tr>
                                        <td>Fan</td>
                                        <td>Authorized to view all of the upcoming matches with available tickets and their purchased tickets. <br /> 
                                        Capable of purchasing tickets.</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </ul>
                        </div>
                        <div className="block">
                            <h3>How Does it Work?</h3>
                            <img src={arrow} width="40px" /> <span>The system admin adds clubs and stadiums to the system.</span> <br />
                            <img src={arrow} width="40px" /> <span>Club representatives register into the system to represent their club.</span> <br />
                            <img src={arrow} width="40px" /> <span>Stadium managers register into the system to manage their stadium.</span> <br />
                            <img src={arrow} width="40px" /> <span>Sports association managers add matches between two clubs at a certain time.</span> <br />
                            <img src={arrow} width="40px" /> <span>Host club representatives send requests to selected stadiums' managers to host the match on their stadium.</span> <br />
                            <img src={arrow} width="40px" /> <span>Stadium managers can approve or disapprove their received requests.</span> <br />
                            <img src={arrow} width="40px" /> <span>When a stadium manager approves a host request, tickets get added to the system according to the stadium's capacity.</span> <br />
                            <img src={arrow} width="40px" /> <span>Fans can log in to their account if they were unblocked and view tickets that are still available and purchase any.</span> <br />
                        </div>
                        <img src={balls} className="balls" />
                </div>
            </FadeIn>
        </Modal>
      </div>
    );
  }





const NavBar = props => {
    const left = props.barComponents.left;
    const right = props.barComponents.right;
    return (
        <nav>
            <div className="left">
                {left == "info"?
                    <ModalProvider><div style={{backgroundColor: "transparent"}}><FancyModalButton/></div></ModalProvider>
                :null}
            </div>
            <img src={darkLogo} alt="logo" className="logo"></img>
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