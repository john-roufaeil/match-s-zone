import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState } from "react";
import Manipulate from "./Manipulate";
import List from "./List";
import Choose from "./Choose";
import Footer from "../Footer"


const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("myClub");

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">CLUB REPRESENTATIVE</h1>
        <div className="dashboardMenu">
            <button 
                className={`dashboardMenuButton ${selected === "myClub" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("myClub")}}>
                My Club
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "matchesForStadium" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("matchesForStadium")}}>
                Upcoming Matches
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "availableStadiums" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("availableStadiums")}}>
                Available Stadiums
            </button>
        </div>
        <main className="dashboardMain">
            <Manipulate object={selected} action="add" />
            <Manipulate object={selected} action="delete" />
            <Choose object={selected} />
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;