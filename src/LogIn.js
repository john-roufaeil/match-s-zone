import NavBar from "./components/NavBar";
import Form from "./components/Form"
import greetingGif from "./assets/icons/match-s-zone/greeting.gif"
import Footer from "./components/Footer"
import { useState } from "react";

const LogIn = () => {
    const barComponents = {left: null, right: "signup"};
    const type = "login";

    return (
        <div>
            <NavBar barComponents = {barComponents} />
            <main>
            <div className = "form">
                <Form type={type} />
            </div>
            <div className = "welcome" style={{textAlign:"center"}}>
                <h1>Welcome back! <br /> Log in to your account.</h1>
                <div className = "greeting-gif">
                    <img src={greetingGif} alt="man waving" width="180px"/>
                </div>
            </div>
            
        </main>
        <Footer />
    </div>
    )
}

export default LogIn;