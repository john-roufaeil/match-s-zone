import { useState, useContext } from "react";
import { UserContext } from "../../../Context"
import { timeGreet } from "../../../utils";

import NavBar from "../../../components/molecules/NavBar"
import Footer from "../../../components/molecules/Footer"

import "./style.css"
import "../../../assets/global.css"

const Dashboard = props => {
    const barComponents = {left: "info", right: "logout"};
    const [selected, setSelected] = useState("clubs");
    const [description, setDescription] = useState("View and manage all clubs");
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const type = props.type;

    const admin = [
        {option: "clubs", description:"View and manage all clubs"},
        {option: "stadiums", description: "View and manage all stadiums"}, 
        {option: "fans", description: "View and manage all fans"}, 
        {option: "users", description: "View and manage all users"}
    ];
    const manager = [
        {option: "allMatches", description:"View and manage all matches"},
        {option: "upcomingMatches", description: "View all upcoming matches"}, 
        {option: "previousMatches", description: "View all previous matches"}, 
        {option: "clubsNeverTogether", description: "View pairs of clubs that have no matches scheduled together"}
    ];
    const clubRepresentative = [
        {option: "myClub", description:"View all information about my club"},
        {option: "availableStadiums", description: "View all of the stadiums that can host a match at a certain time"}, 
        {option: "matchesForStadium", description: "View all of the matches my club will play"}
    ];
    const stadiumManager = [
        {option: "myStadium", description:"View all information about my stadium"},
        {option: "requests", description: "View and manage match host requests sent to my stadium"}, 
        {option: "matchesOnStadium", description: "View matches that were played or will be played on my stadium"}
    ];
    const fan = [
        {option: "myTickets", description:"View all of my purchased tickets"},
        {option: "availableTickets", description: "View all upcoming matches with available tickets"}, 
    ];

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title"> 
            {type === "admin" ? 
            "System Admin" : 
            type === "manager" ?
            "Sports Association Manager" :
            type === "clubRepresentative" ? 
            "Club Representative" :
            type === "stadiumManager" ?
            "Stadium Manager" :
            "Fan"} 
        </h1>
        <h3 className="greetingUser"> {timeGreet()} @{loggedInUser}</h3>

        <main className="dashboardMain">
            <div className="dashboardMenu">
                <button
                    className={`dashboardMenuButton ${selected === "clubs" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("clubs"); setDescription("View and manage all clubs")}}>
                    Clubs
                </button>
                <button
                    className={`dashboardMenuButton ${selected === "stadiums" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("stadiums"); setDescription("View and manage all stadiums")}}>
                    Stadiums
                </button>
                <button
                    className={`dashboardMenuButton ${selected === "fans" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("fans"); setDescription("View and manage all fans")}}>
                    Fans
                </button>
            </div>
            <p style={{textAlign:"center", fontWeight: "600", margin:"0", padding:"0"}}>{description}</p>
        </main>
        <Footer />
    </div>
}

export default Dashboard;