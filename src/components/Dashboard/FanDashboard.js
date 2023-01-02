import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState } from "react";
import List from "./List";
import Choose from "./Choose";
import Footer from "../Footer"

const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("myTickets");

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">FAN</h1>
        <div className="dashboardMenu">
            <button 
                className={`dashboardMenuButton ${selected === "myTickets" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("myTickets")}}>
                My Tickets
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "availableTickets" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("availableTickets")}}>
                Available Tickets
            </button>    
        </div>
        <main className="dashboardMain">
            <Choose object={selected} />
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;