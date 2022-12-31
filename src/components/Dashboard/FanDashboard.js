import NavBar from "../NavBar";
import "./Dashboard.css";
import { useState } from "react";
import Add from "./Add";
import List from "./List";

const Dashboard = props => {
    const barComponents = {left: null, right: "logout"};

    return <div>
        <NavBar barComponents = {barComponents} />
        <h1 className="title">FAN</h1>
        <div className="dashboardMenu">
            <button className={"dashboardMenuButton selectedButton"}> Matches </button>
        </div>
        <main className="dashboardMain">
            <Add object="matches" />
            <List object="matches" />
        </main>
    </div>
}

export default Dashboard;