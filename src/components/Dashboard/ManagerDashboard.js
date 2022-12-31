import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState } from "react";
import Manipulate from "./Manipulate";
import List from "./List";

const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("matches");

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">SPORTS ASSOCIATION MANAGER</h1>
        <div className="dashboardMenu">
            <button 
                className={`dashboardMenuButton ${selected == "matches" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("matches")}}>
                All Matches
            </button>
            <button 
                className={`dashboardMenuButton ${selected == "upcoming" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("upcoming")}}>
                Upcoming Matches
            </button>
            <button 
                className={`dashboardMenuButton ${selected == "previous" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("previous")}}>
                Previous Matches
            </button>
            <button 
                className={`dashboardMenuButton ${selected == "never" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("never")}}>
                Never Played Together
            </button>
        </div>
        <main className="dashboardMain">
            <Manipulate object={selected} action="add" />
            <Manipulate object={selected} action="delete" />
            <List object={selected} />
        </main>
    </div>
}

export default Dashboard;