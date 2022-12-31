import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Form from "./components/Form"
import greetingGif from "./assets/icons/match-s-zone/greeting.gif"

const LogIn = () => {
    const barComponents = {left: null, right: "signup"};
    const type = "login";
    return (
        <div>
            <NavBar barComponents = {barComponents} />
            <main>
            <div className = "welcome">
                <h1>Welcome back! <br /> Log in to your account.</h1>
                <div className = "greeting-gif">
                    <img src={greetingGif} alt="man waving" width="180px"/>
                </div>
            </div>
            <div className = "form">
                <Form type={type} />
            </div>
        </main>
    </div>
    )
}

export default LogIn;