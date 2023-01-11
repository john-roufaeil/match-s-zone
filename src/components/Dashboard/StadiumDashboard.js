import { useState, useContext, useEffect } from "react";
import { UserContext } from '../../Contexts';
import NavBar from "../NavBar";
import Footer from "../Footer";
import List from "./List";
import { timeGreet } from "../../utils";
import "./Dashboard.css";

const Dashboard = props => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const barComponents = {left: "info", right: "logout"};
    const [description, setDescription] = useState("View All Information About My Stadium");
    const [selected, setSelected] = useState("myStadium");

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">Stadium Manager</h1>
        <h3 className="greetingUser">{timeGreet()} @{loggedInUser}</h3>
        <main className="dashboardMain">
            <div className="dashboardMenu">
                <button 
                    className={`dashboardMenuButton ${selected === "myStadium" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("myStadium"); setDescription("View All Information About My Stadium")}}>
                    My Stadium
                </button>
                <button 
                    className={`dashboardMenuButton ${selected === "requests" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("requests"); setDescription("View and manage match host requests sent to my stadium")}}>
                    My Received Requests
                </button>
                <button 
                    className={`dashboardMenuButton ${selected === "matchesOnStadium" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("matchesOnStadium"); setDescription("View matches that were played or will be played on my stadium")}}>
                    Matches on My Stadium
                </button>
            </div>
            <p style={{textAlign:"center", fontWeight: "600", margin:"0", padding:"0"}}>{description}</p>
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;