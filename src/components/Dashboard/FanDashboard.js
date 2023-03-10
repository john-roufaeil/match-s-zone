import { useState, useContext } from "react";
import { UserContext } from '../../Contexts';
import NavBar from "../NavBar";
import Footer from "../Footer";
import List from "./List";
import { timeGreet } from "../../utils";
import "./Dashboard.css";



const Dashboard = props => {
    const barComponents = {left: "info", right: "logout"};
    const [selected, setSelected] = useState("myTickets");
    const [description, setDescription] = useState("View all of my purchased tickets");
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);


    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">Fan</h1>
        <h3 className="greetingUser">{timeGreet()} @{loggedInUser}</h3>
        <main className="dashboardMain">
            <div className="dashboardMenu">
                <button 
                    className={`dashboardMenuButton ${selected === "myTickets" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("myTickets"); setDescription("View all of my purchased tickets")}}>
                    My Tickets
                </button>
                <button 
                    className={`dashboardMenuButton ${selected === "availableTickets" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("availableTickets"); setDescription("View all upcoming matches with available tickets")}}>
                    Available Tickets
                </button>    
            </div>
            <p style={{textAlign:"center", fontWeight: "600", margin:"0", padding:"0"}}>{description}</p>
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;