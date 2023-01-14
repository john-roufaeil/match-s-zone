import Form from "../../molecules/Form";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Input} from "antd"
import { UserContext, BlockedUser } from "../../../Context"
import { EyeTwoTone, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import Button from "../../atoms/Button";


const Login_User = props => {
    // Hooks & Server
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [sucMsg, setSucMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [fans, setFans] = useState([]);
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const {showBlocked, setShowBlocked} = useContext(BlockedUser);
    useEffect(() => {
        axios.get('http://localhost:5000/getUsers')
        .then(res => setUsers(res.data))
        .catch(e => {setErrMsg("Server Error, please reload."); setSucMsg("")})
        axios.get('http://localhost:5000/viewFans')
        .then(res => setFans(res.data))
        .catch(e => {setErrMsg("Server Error, please logout and reload.");setSucMsg("")})
    }, []);
    
    // Functions
    const getIsFormValid = () => {
        return username && password;
    };

    const logIn = (e) => {
        e.preventDefault();
        var foundUsr = "";
        var foundPw = "";
        var blockedFan = "";
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
        fans.forEach(fan => {
            if (fan.username == username && fan.status == 0) {
                blockedFan = true;
            }
        });
        if (!foundUsr || !foundPw) { setErrMsg("Invalid username or password."); setSucMsg(""); }
        else if (blockedFan) { setErrMsg("Sorry, your account is blocked."); setSucMsg(""); setShowBlocked(true) } 
        else {
            switch(type) {
                case 0: navigate("/admin-dashboard"); break;
                case 2: navigate("/manager-dashboard"); break;
                case 3: navigate("/club-representative-dashboard"); break;
                case 4: navigate("/stadium-manager-dashboard"); break;
                default: navigate("/fan-dashboard"); break;
            }
            setLoggedInUser(username);
        }
    };
    return <div style={{width:"80%"}}><Form sucMsg={sucMsg} errMsg={errMsg}>
                <div className="field"> 
                    <label htmlFor="username">Username</label><br />
                    <Input 
                        type= "text"
                        id = "username"
                        value={username} 
                        prefix="@" 
                        autoComplete = "off"
                        autoFocus = "on"
                        placeholder="Enter your username"
                        status= {errMsg ? "error" : ""}
                        onChange = {(e) => {setUsername(e.target.value); setSucMsg(""); setErrMsg(""); setShowBlocked(false);}}
                        className="usernameInput"
                        required 
                    />
                </div>
                <div className = "field">
                    <label htmlFor = "password"> Password </label> <br />
                    <Input.Password
                        type = "password"
                        id = "password" 
                        value = {password}
                        autoComplete = "new-password"
                        prefix=<LockOutlined />
                        placeholder="Enter your password"
                        status= {errMsg ? "error" : ""}
                        onChange = {(e) => {setPassword(e.target.value); setSucMsg(""); setErrMsg(""); setShowBlocked(false);}}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        required
                    />
                </div>
                <p style={{margin: "10px 0 0 0"}}>Forgot your password?</p>
                <input style={{display:"none"}} type="submit" onClick={logIn}></input>
                <Button type="submit" ghost block size="large" className="submit" onClick = {logIn} disabled={!getIsFormValid("logIn")}> Log In </Button>  
            </Form></div>
}

export default Login_User;