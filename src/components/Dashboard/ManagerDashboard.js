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
    const [selected, setSelected] = useState("matches");
    const [description, setDescription] = useState("View and Manage All Matches");
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);


    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">Sports Association Manager</h1>
        <h3 className="greetingUser">{timeGreet()} @{loggedInUser}</h3>
        <main className="dashboardMain">
            <div className="dashboardMenu">
                <button
                    className={`dashboardMenuButton ${selected === "matches" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("matches"); setDescription("View and manage all matches");}}>
                    Matches
                </button>
                <button
                    className={`dashboardMenuButton ${selected === "upcoming" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("upcoming"); setDescription("View all upcoming matches");}}>
                    Upcoming Matches
                </button>
                <button 
                    className={`dashboardMenuButton ${selected === "previous" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("previous"); setDescription("View all previous matches");}}>
                    Previous Matches
                </button>
                <button
                    className={`dashboardMenuButton ${selected === "never" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("never"); setDescription("View pairs of clubs that have no matches scheduled together");}}>
                    Clubs Not Scheduled Together
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