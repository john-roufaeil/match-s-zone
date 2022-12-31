import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState } from "react";
import Manipulate from "./Manipulate";
import List from "./List";
import { addBackToTop } from 'vanilla-back-to-top'
import { ScrollToTop } from 'react-simple-scroll-up'



const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("clubs");

    return <div>
        <ScrollToTop />
        <NavBar barComponents = {barComponents} />
        <h1 className="title">SYSTEM ADMIN</h1>
        <div className="dashboardMenu">
            <button 
                className={`dashboardMenuButton ${selected == "clubs" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("clubs")}}>
                Clubs
            </button>
            <button 
                className={`dashboardMenuButton ${selected == "stadiums" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("stadiums")}}>
                Stadiums
            </button>
            <button 
                className={`dashboardMenuButton ${selected == "fans" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("fans")}}>
                Fans
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