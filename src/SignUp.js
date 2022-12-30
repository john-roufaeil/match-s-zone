import NavBar from "./components/NavBar";
import maleFan from "./assets/icons/fan/male-fan.png"
import maleFanDis from "./assets/icons/fan/male-fan-disabled.png"
import femaleFan from "./assets/icons/fan/female-fan.png"
import femaleFanDis from "./assets/icons/fan/female-fan-disabled.png"
import maleManager from "./assets/icons/sports-manager/male-manager.png"
import maleManagerDis from "./assets/icons/sports-manager/male-manager-disabled.png"
import stadium1 from "./assets/icons/stadium-manager/stadium1.png"
import stadium1Dis from "./assets/icons/stadium-manager/stadium1-disabled.png"
import club1 from "./assets/icons/club-representative/club1.png"
import club1Dis from "./assets/icons/club-representative/club1-disabled.png"
import { useState } from "react";

const SignUp = () => {
    const barComponents = {left: null, right: "login"};
    const [type, setType] = useState("fan");
    return (
        <>
            <NavBar barComponents = {barComponents} />
            <main>
                <div className = "welcome">
                    <h1>Welcome, <br /> Join Us Today!</h1>
                    <div className = "userType">

                    <p> Please choose your account type: </p>
                    <button onClick={() => {setType("fan")}}>
                        <figure>
                            <img src={type==="fan"?maleFan:maleFanDis} alt="fan" />
                            <figcaption>Fan</figcaption>
                        </figure>
                    </button>
                    <button onClick={() => {setType("manager")}}>
                        <figure>
                            <img src={type==="manager"?maleManager:maleManagerDis} alt="manager" />
                            <figcaption>Sports Manager</figcaption>
                        </figure>
                    </button>
                    <button onClick={() => {setType("clubRepresentative")}}>
                        <figure>
                            <img src={type==="clubRepresentative"?club1:club1Dis} alt="club representative" />
                            <figcaption>Club Representative</figcaption>
                        </figure>
                    </button><button onClick={() => {setType("stadiumManager")}}>
                        <figure>
                            <img src={type==="stadiumManager"?stadium1:stadium1Dis}  alt="stadium manager"/>
                            <figcaption>Stadium Manager</figcaption>
                        </figure>
                    </button>

                    </div>
                </div>
                <div className = "form">
                    
                </div>
            </main>
            {/* <Greeting>
                <Icon desc="fan" />
                <Icon desc="manager" />
                <Icon desc="stadium" />
                <Icon desc="club" />
            </Greeting>
            <Form /> */}
        </>
    );
};

export default SignUp;