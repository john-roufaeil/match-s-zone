import { useState, useContext } from "react";
import { UserContext } from '../../Contexts';
import Manipulate from "./Manipulate";
import NavBar from "../NavBar";
import Footer from "../Footer";
import List from "./List";
import { timeGreet } from "../../utils";
import "./Dashboard.css";

const Dashboard = props => {
    const greet = timeGreet;
    const barComponents = {left: "info", right: "logout"};
    const [selected, setSelected] = useState("clubs");
    const [description, setDescription] = useState("View and manage all clubs");
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">System Admin </h1>
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
                <button
                    className={`dashboardMenuButton ${selected === "users" ? "selectedButton" : ""}`}
                    onClick={() => {setSelected("users"); setDescription("View all registered users")}}>
                    Users
                </button>
            </div>
            <p style={{textAlign:"center", fontWeight: "600", margin:"0", padding:"0"}}>{description}</p>
            <Manipulate object={selected} action="add" />
            <Manipulate object={selected} action="delete" />
            <List object={selected} />
        </main>
        <Footer />
    </div>
}

export default Dashboard;