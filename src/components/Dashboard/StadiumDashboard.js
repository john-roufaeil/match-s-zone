import axios, * as others from 'axios';
import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState, useContext, useEffect } from "react";
import Manipulate from "./Manipulate";
import List from "./List";
import Footer from "../Footer"
import { UserContext } from '../../UserContext';
import { timeGreet } from "../../utils";

const Dashboard = props => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const barComponents = {left: null, right: "logout"};
    const [selected, setSelected] = useState("myStadium");

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">Stadium Manager</h1>
        <h3 className="greetingUser">{timeGreet()} @{loggedInUser}</h3>
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
            <button 
                className={`dashboardMenuButton ${selected === "matchesOnStadium" ? "selectedButton" : ""}`}
                onClick={() => {setSelected("matchesOnStadium")}}>
                Matches on Stadium
            </button>
        </div>
        <main className="dashboardMain">
            
            {/* {console.log(myStadiumInfo[0].status)} */}
            {/* {(myStadium[0].status)?console.log("Available"):console.log("Unavailable")} */}
            {/* {myStadiumInfo[0].status?<Manipulate object={selected} action="delete" stadium={myStadiumInfo[0].name}/>
                             :<Manipulate object={selected} action="add" stadium={myStadiumInfo[0].name} />} */}
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;