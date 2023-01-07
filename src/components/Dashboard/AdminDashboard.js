import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState, useContext } from "react";
import Manipulate from "./Manipulate";
import List from "./List";
import Footer from "../Footer"
import { UserContext } from '../../UserContext';
import { timeGreet } from "../../utils";

const Dashboard = props => {
    const greet = timeGreet;
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("clubs");

    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">System Admin </h1>
        <h3 className="greetingUser"> {timeGreet()} @{loggedInUser}</h3>
        <div className="dashboardMenu">
            <button 
                className={`dashboardMenuButton ${selected === "clubs" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("clubs")}}>
                Clubs
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "stadiums" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("stadiums")}}>
                Stadiums
            </button>
            <button 
                className={`dashboardMenuButton ${selected === "fans" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("fans")}}>
                Fans
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