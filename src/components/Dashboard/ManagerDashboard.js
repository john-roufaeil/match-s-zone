import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState, useContext } from "react";
import Manipulate from "./Manipulate";
import List from "./List";
import Choose from "./Choose";
import Footer from "../Footer"
import { UserContext } from '../../UserContext';
import { timeGreet } from "../../utils";


const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};
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
            <Choose object={selected} />
            <Manipulate object={selected} action="add" />
            <Manipulate object={selected} action="delete" />
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;