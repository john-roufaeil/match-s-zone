import NavBar from "./components/NavBar";
import Form from "./components/Form"
import greetingGif from "./assets/icons/match-s-zone/greeting.gif"
import stopGif from "./assets/gifs/stop.gif"
import Footer from "./components/Footer"
import { useContext } from "react";
import { BlockedUser } from "./Contexts"


const LogIn = () => {
    const {showBlocked, setShowBlocked} = useContext(BlockedUser);
    const barComponents = {left: "info", right: "signup"};
    const type = "login";

    return (
        <div>
            <NavBar barComponents = {barComponents} />
            <main>
                <div className = "form">
                    <Form type={type} />
                </div>
                <div className = "welcome" style={{textAlign:"center"}}>
                    {showBlocked ? <h1>You cannot enter.</h1> : <h1>Welcome back! <br /> Log in to your account.</h1>}
                    <div className = "greeting-gif">
                        <img src={showBlocked ? stopGif : greetingGif} alt="man waving" width="180px"/>
                    </div>
                </div>
            </main>
            <Footer />
    </div>
    )
}

export default LogIn;