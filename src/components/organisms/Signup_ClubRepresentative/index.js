import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../molecules/Form";
import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, LockOutlined, ExclamationOutlined } from '@ant-design/icons';
import Button from "../../atoms/Button"


const Signup_Manager = props => {
    // Hooks & Server
    const [sucMsg, setSucMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [code, setCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [clubName, setClubName] = useState("");
    const [clubs, setClubs] = useState([]);
    const [clubRepresentatives, setClubRepresentatives] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/getUsers')
        .then(res => setUsers(res.data))
        .catch(e => {setErrMsg("Server Error, please reload."); setSucMsg("")})
        axios.get('http://localhost:5000/viewClubs')
        .then(res => setClubs(res.data))
        .catch(e => {setErrMsg("Server Error, please reload.");setSucMsg("")})
        axios.get('http://localhost:5000/getClubRepresentatives')
        .then(res => setClubRepresentatives(res.data))
        .catch(e => {setErrMsg("Server Error, please reload.");setSucMsg("")})
    }, []);
    
    // Functions
    const getIsFormValid = () => {
        return username && password && name && clubName;
    };

    const clearForm = () => { 
        setName(""); 
        setUsername(""); 
        setPassword("");
        setClubName("");
    }; 
    const submitNewCR = async (e) => {
        e.preventDefault(); 
        var exisitingUsername = false;
        var takenClub = false;
        var invalidClub = true;
        users.forEach(user => {
            if (user.username == username)
                exisitingUsername = true;
        });
        clubRepresentatives.forEach(rep => {
            if (rep.name == clubName)
                takenClub = true;
        });
        clubs.forEach(club => {
            if (club.name == clubName)
                invalidClub = false;
        });
        if (exisitingUsername) {setErrMsg("This username is unavailable."); setSucMsg(""); setCode(1)}
        else if (username.includes(" ")) {setErrMsg("Username cannot contain spaces."); setSucMsg(""); setCode(2)}
        else if (password.length < 8) {setErrMsg("Password must be at least 8 characters long."); setSucMsg(""); setCode(2)}
        else if (invalidClub) {setErrMsg("This club does not exist."); setSucMsg(""); setCode(5)}
        else if (takenClub) {setErrMsg("This club already has a representative."); setSucMsg(""); setCode(5)}
        else {
            axios.post('http://localhost:5000/newCR', {
                name: {name}.name,
                username: {username}.username,
                password: {password}.password,
                club: {clubName}.clubName
            })
            .then(clearForm())
            .then(setSucMsg("You have successfully registered."))
            .then(setErrMsg(""))
            .then(setCode(""))
            .catch(e => {setErrMsg("Server Error, please reload.");setSucMsg(""); setCode("")})
        }
    }
    
    return  (<div style={{width:"80%"}}><Form sucMsg={sucMsg} errMsg={errMsg}> 
                <div className = "field">
                    <label htmlFor = "name"> Name </label><br />
                    <Input
                        type = "text"
                        id = "name" 
                        name = "name"
                        value = {name}
                        autoComplete = "off"
                        autoFocus="on"
                        prefix = <ExclamationOutlined style={{width:"0px"}} />
                        placeholder="Enter your name"
                        onChange = {(e) => {setName(e.target.value); setSucMsg(""); setErrMsg(""); setCode("")}}
                        required
                    />
                </div>
                <div className = "field">
                    <label htmlFor = "username"> Username </label> <br />
                    <Input
                        type = "text"
                        id = "username" 
                        name = "username"
                        value = {username}
                        autoComplete = "off" 
                        prefix="@" 
                        placeholder="Choose a new username"
                        status= {(code == 1) ? "error" : ""}                        
                        onChange={(e) => {setUsername(e.target.value); setSucMsg(""); setErrMsg(""); setCode("")}}
                        required
                    />
                </div>
                <div className = "field">
                    <label htmlFor = "password"> Password </label> <br />
                    <Input.Password
                        type = "password"
                        id = "password" 
                        name = "password"
                        value = {password}
                        prefix=<LockOutlined />
                        autoComplete= "new-password"
                        placeholder="Create a new password"
                        status= {(code == 2) ? "error" : ""}                        
                        onChange = {(e) => {setPassword(e.target.value); setSucMsg(""); setErrMsg(""); setCode("")}}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        required
                    />
                </div>
                <div className = "field">
                    <label htmlFor = "clubName"> Club Name </label> <br />
                    <Input
                        type = "text"
                        id = "clubName" 
                        name = "clubName"
                        value = {clubName}
                        autoComplete= "off"
                        placeholder="Club to represent"
                        prefix = {(code == 5) ? <ExclamationOutlined /> : <></>}
                        status= {(code == 5) ? "error" : ""}                        
                        onChange = {(e) => {setClubName(e.target.value); setSucMsg(""); setErrMsg(""); setCode("")}}
                        required
                    />
                </div>
                <input style={{display:"none"}} type="submit" onClick={submitNewCR}></input>
                <Button type="ghost" block size="large" className="submit" onClick = {submitNewCR} disabled={!getIsFormValid("logIn")}> Create Account </Button>  
            </Form>
            </div>
        );
}

export default Signup_Manager;