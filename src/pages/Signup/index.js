import { useState } from "react";
import NavBar from "../../components/molecules/NavBar"
import Footer from "../../components/molecules/Footer"
import Button from "../../components/atoms/Button";
import Signup_Fan from "../../components/organisms/Signup_Fan";
import Signup_Manager from "../../components/organisms/Signup_Manager";
import Signup_ClubRepresentative from "../../components/organisms/Signup_ClubRepresentative/index.js";
import Signup_StadiumManager from "../../components/organisms/Signup_StadiumManager";
import fan from "../../assets/icons/fan/fan.png"
import fanDisabled from "../../assets/icons/fan/fan-disabled.png"
import manager from "../../assets/icons/sports-manager/manager.png"
import managerDisabled from "../../assets/icons/sports-manager/manager-disabled.png"
import stadiumManager from "../../assets/icons/stadium-manager/stadium-manager.png"
import stadiumManagerDisabled from "../../assets/icons/stadium-manager/stadium-manager-disabled.png"
import clubRepresentative from "../../assets/icons/club-representative/club-representative.png"
import clubRepresentativeDisabled from "../../assets/icons/club-representative/club-reprsentative-disabled.png"
import "../../assets/global.css"
import "./style.css"

const SignUp = () => {
    const barComponents = {left: "info", right: "login"};
    const [type, setType] = useState("fan");
    var form = <></>;
    switch(type) {
        case "fan": form = <Signup_Fan />; break;
        case "manager": form = <Signup_Manager />; break;
        case "clubRepresentative": form = <Signup_ClubRepresentative />; break;
        default: form = <Signup_StadiumManager />; 
    }
    return (
        <div>
            <NavBar barComponents = {barComponents} />
            <main>
                <div className = "welcome">
                    <h1>Welcome, <br /> Join Us Today!</h1>
                    <div className = "userType">
                        <p> Please choose your account type: </p>
                        <Button className="iconBtn" type="text" onClick={() => {setType("fan")}}>
                            <figure>
                                <img src={type==="fan"?fan:fanDisabled} alt="fan" />
                                <figcaption>{type==="fan"?<strong>Fan</strong>:<>Fan</>}</figcaption>
                            </figure>
                        </Button>
                        <Button className="iconBtn" type="text" onClick={() => {setType("manager")}}>
                            <figure>
                                <img src={type==="manager"?manager:managerDisabled} alt="manager" />
                                <figcaption>{type==="manager"?<strong>Sports Manager</strong>:<>Sports Manager</>}</figcaption>
                            </figure>
                        </Button>
                        <Button className="iconBtn" type="text" onClick={() => {setType("clubRepresentative")}}>
                            <figure>
                                <img src={type==="clubRepresentative"?clubRepresentative:clubRepresentativeDisabled} alt="club representative" />
                                <figcaption>{type==="clubRepresentative"?<strong>Club Representative</strong>:<>Club Representative</>}</figcaption>
                            </figure>
                        </Button>
                        <Button className="iconBtn" type="text" onClick={() => {setType("stadiumManager")}}>
                            <figure>
                                <img src={type==="stadiumManager"?stadiumManager:stadiumManagerDisabled}  alt="stadium manager"/>
                                <figcaption>{type==="stadiumManager"?<strong>Stadium Manager</strong>:<>Stadium Manager</>}</figcaption>
                            </figure>
                        </Button>
                    </div>
                </div>
                <div className = "form">
                    {form}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SignUp;  