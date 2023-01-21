import { useState, useContext } from "react";
import { UserContext } from "../../Context"
import { timeGreet } from "../../utils";

import Dashboard from "../../components/templates/Dashboard";

const Admin = props => {
    return <Dashboard type="admin" />
}

export default Admin;