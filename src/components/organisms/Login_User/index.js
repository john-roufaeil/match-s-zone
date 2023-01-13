import Form from "../../molecules/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login_User = props => {
    const navigate = useNavigate();
    const [sucMsg, setSucMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/getUsers')
        .then(res => setUsers(res.data))
        .catch(e => {setErrMsg("Server Error, please reload."); setSucMsg("")})
    }, []);
    console.log(users);

    const logIn = (e) => {
        e.preventDefault();
        var foundUsr = false;
        var foundPw = false;
        var type = "";
        users.forEach(user => {
            if (user.username == username) {
                foundUsr = true;
                if (user.password == password) {
                    foundPw = true;
                    type = user.type;
                }
            }
        });
        if (!foundUsr || !foundPw) {
            setErrMsg("Invalid username or password.");
            setSucMsg("");
        }
        //  else if (blockedFan) {
        //     setErrMsg("Sorry, your account is blocked.");
        //     setSucMsg("");
        //     // setShowBlocked(true)
        // } 
        else {
            switch(type) {
                case 0: navigate("/admin-dashboard"); break;
                case 2: navigate("/manager-dashboard"); break;
                case 3: navigate("/club-representative-dashboard"); break;
                case 4: navigate("/stadium-manager-dashboard"); break;
                default: navigate("/fan-dashboard"); break;
            }
            // setLoggedInUser(username);
        }
    };
    return <Form sucMsg={sucMsg} errMsg={errMsg}>
                <div className="field"> 
                    <label htmlFor="username">Username</label><br />
                    <input
                        type = "text"
                        id ="username" 
                        value = {username}
                        autoComplete = "new-password"
                        autoFocus = "on"
                        onChange = {(e) => {setUsername(e.target.value); setSucMsg(""); setErrMsg("");}} // setShowBlocked(false);
                        required
                    />
                </div>
                <div className = "field">
                    <label htmlFor = "password">
                        Password
                    </label><br />
                    <input
                        type = "password"
                        id = "password" 
                        value = {password}
                        autoComplete = "new-password"
                        onChange = {(e) => {setPassword(e.target.value); setSucMsg(""); setErrMsg(""); }} //setShowBlocked(false);
                        required
                    />
                </div>
                <button onClick = {logIn}> {/* disabled={!getIsFormValid("logIn")}  */}
                    Log In
                </button>  
            </Form>
}

export default Login_User;