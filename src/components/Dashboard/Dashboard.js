import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState } from "react";
import Add from "./Add";
import List from "./List";

const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("clubs");

    return <div>
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
        <main>
            <Add object={selected} />
            <List object={selected} />
        </main>
    </div>
}

export default Dashboard;