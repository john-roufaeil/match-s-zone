import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState } from "react";
import Manipulate from "./Manipulate";
import List from "./List";
import Footer from "../Footer"



const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("myStadium");

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">STADIUM MANAGER</h1>
        <div className="dashboardMenu">
            <button 
                className={`dashboardMenuButton ${selected === "myStadium" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("myStadium")}}>
                My Stadium
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "requests" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("requests")}}>
                Host Requests
            </button>
        </div>
        <main className="dashboardMain">
            <Manipulate object={selected} action="add" />
            <Manipulate object={selected} action="delete" />
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;