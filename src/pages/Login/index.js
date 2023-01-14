import { useContext } from "react"
import { BlockedUser } from "../../Context"
import NavBar from "../../components/molecules/NavBar"
import Footer from "../../components/molecules/Footer"
import Login_User from "../../components/organisms/Login_User"
import greetingGif from "../../assets/gifs/greeting.gif"
import stopGif from "../../assets/gifs/stop.gif"
import "../../assets/global.css"
import "./style.css"

const Login = () => {
    const barComponents = {left: "info", right: "signup"};
    const {showBlocked, setShowBlocked} = useContext(BlockedUser);

    return (
        <div>
            <NavBar barComponents = {barComponents} />
            <main>
                <div className = "form">
                    <Login_User />
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

export default Login;