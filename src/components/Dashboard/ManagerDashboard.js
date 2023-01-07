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

    const {loggedInUser, setLoggedInUser} = useContext(UserContext);


    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">Sports Association Manager</h1>
        <h3 className="greetingUser">{timeGreet()} @{loggedInUser}</h3>
        <div className="dashboardMenu">
            <button 
                className={`dashboardMenuButton ${selected === "matches" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("matches")}}>
                Matches
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "upcoming" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("upcoming")}}>
                Upcoming Matches
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "previous" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("previous")}}>
                Previous Matches
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "never" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("never")}}>
                Clubs Not Scheduled Together
            </button>
        </div>
        <main className="dashboardMain">
            <Choose object={selected} />
            <Manipulate object={selected} action="add" />
            <Manipulate object={selected} action="delete" />
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;