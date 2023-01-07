import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState, useContext } from "react";
import List from "./List";
import Choose from "./Choose";
import Footer from "../Footer"
import { UserContext } from '../../UserContext';
import { timeGreet } from "../../utils";



const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("myTickets");

    const {loggedInUser, setLoggedInUser} = useContext(UserContext);


    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">Fan</h1>
        <h3 className="greetingUser">{timeGreet()} @{loggedInUser}</h3>
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