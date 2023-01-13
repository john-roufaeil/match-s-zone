import { useState } from "react"
import Modal from "../../atoms/Modal"
import arrow from "../../../assets/gifs/arrow.gif"
import balls from "../../../assets/icons/decoration/balls.png"
import info from "../../../assets/icons/actions/info.png"

import Divider from "../../atoms/Divider"
import Button from "../../atoms/Button"
import "../../../assets/global.css"
import "./style.css"

const Info = props => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <Button className="iconBtn" type="ghost" onClick={showModal}>
            <img width="50px" src={info} alt="" />
        </Button>
        <Modal className="myModal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]} centered width={1000} style={{ padding: 0 }} >
            <div className="info">
                    <div className="block">
                        <h1>Welcome to Match'S Zone!</h1>
                        <p className="champions">Where Champions Meet</p>
                    </div>
                    <Divider></Divider>
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
                        <img src={arrow} width="40px" alt="" /> <span>The system admin adds clubs and stadiums to the system.</span> <br />
                        <img src={arrow} width="40px" alt="" /> <span>Club representatives register into the system to represent their club.</span> <br />
                        <img src={arrow} width="40px" alt="" /> <span>Stadium managers register into the system to manage their stadium.</span> <br />
                        <img src={arrow} width="40px" alt="" /> <span>Sports association managers add matches between two clubs at a certain time.</span> <br />
                        <img src={arrow} width="40px" alt="" /> <span>Host club representatives send requests to selected stadiums' managers to host the match on their stadium.</span> <br />
                        <img src={arrow} width="40px" alt="" /> <span>Stadium managers can approve or disapprove their received requests.</span> <br />
                        <img src={arrow} width="40px" alt="" /> <span>When a stadium manager approves a host request, tickets get added to the system according to the stadium's capacity.</span> <br />
                        <img src={arrow} width="40px" alt="" /> <span>Fans can log in to their account if they were unblocked and view tickets that are still available and purchase any.</span> <br />
                    </div>
                    <img src={balls} alt="" className="balls" />
            </div>
        </Modal>
        </>
)}

export default Info;