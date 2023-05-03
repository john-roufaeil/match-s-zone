import { useState, useContext } from "react";
import { UserContext } from '../../Contexts';
import Manipulate from "./Manipulate";
import NavBar from "../NavBar";
import Footer from "../Footer";
import List from "./List";
import { timeGreet } from "../../utils";
import "./Dashboard.css";


const Dashboard = props => {
    const barComponents = {left: "info", right: "logout"};
    const [selected, setSelected] = useState("myClub");
    const [description, setDescription] = useState("View all information about my club");
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);


    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">Club Representative</h1>
        <h3 className="greetingUser">{timeGreet()} @{loggedInUser}</h3>
        <main className="dashboardMain">
            <div className="dashboardMenu">
                <button
                    className={`dashboardMenuButton ${selected === "myClub" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("myClub"); setDescription("View all information about my club");}}>
                    My Club
                </button>
                <button
                    className={`dashboardMenuButton ${selected === "availableStadiums" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("availableStadiums"); setDescription("View all of the stadiums that can host a match at a certain time");}}>
                    Available Stadiums
                </button>
                <button
                    className={`dashboardMenuButton ${selected === "matchesForStadium" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("matchesForStadium"); setDescription("View all of the matches my club will play");}}>
                    Upcoming Matches
                </button>
            </div>
            <p style={{textAlign:"center", fontWeight: "600", margin:"0", padding:"0"}}>{description}</p>
            <Manipulate object={selected} action="add" />
            <Manipulate object={selected} action="delete" />
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;