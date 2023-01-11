import { useState } from "react";
import FadeIn from 'react-fade-in';
import FadeProps from 'fade-props';
import NavBar from "./components/NavBar";
import Form from "./components/Form"
import Footer from "./components/Footer"
import fan from "./assets/icons/fan/male-fan.png"
import fanDisabled from "./assets/icons/fan/male-fan-disabled.png"
import manager from "./assets/icons/sports-manager/male-manager.png"
import managerDisabled from "./assets/icons/sports-manager/male-manager-disabled.png"
import stadiumManager from "./assets/icons/stadium-manager/stadium1.png"
import stadiumManagerDisabled from "./assets/icons/stadium-manager/stadium1-disabled.png"
import clubRepresentative from "./assets/icons/club-representative/club1.png"
import clubRepresentativeDisabled from "./assets/icons/club-representative/club1-disabled.png"

const SignUp = () => {
    const barComponents = {left: "info", right: "login"};
    const [type, setType] = useState("fan");
    return (
        <div>
            <NavBar barComponents = {barComponents} />
            <main>
                <div className = "welcome">
                    <h1>Welcome, <br /> Join Us Today!</h1>
                    <div className = "userType">
                        <p> Please choose your account type: </p>
                        <button onClick={() => {setType("fan")}}>
                            <figure>
                                <img src={type==="fan"?fan:fanDisabled} alt="fan" />
                                <figcaption>{type==="fan"?<strong>Fan</strong>:<>Fan</>}</figcaption>
                            </figure>
                        </button>
                        <button onClick={() => {setType("manager")}}>
                            <figure>
                                <img src={type==="manager"?manager:managerDisabled} alt="manager" />
                                <figcaption>{type==="manager"?<strong>Sports Manager</strong>:<>Sports Manager</>}</figcaption>
                            </figure>
                        </button>
                        <button onClick={() => {setType("clubRepresentative")}}>
                            <figure>
                                <img src={type==="clubRepresentative"?clubRepresentative:clubRepresentativeDisabled} alt="club representative" />
                                <figcaption>{type==="clubRepresentative"?<strong>Club Representative</strong>:<>Club Representative</>}</figcaption>
                            </figure>
                        </button><button onClick={() => {setType("stadiumManager")}}>
                            <figure>
                                <img src={type==="stadiumManager"?stadiumManager:stadiumManagerDisabled}  alt="stadium manager"/>
                                <figcaption>{type==="stadiumManager"?<strong>Stadium Manager</strong>:<>Stadium Manager</>}</figcaption>
                            </figure>
                        </button>
                    </div>
                </div>
                <div className = "form">
                    <FadeProps><FadeIn>
                    <Form type={type} />
                    </FadeIn></FadeProps>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SignUp;