import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../molecules/Form";
import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, LockOutlined, ExclamationOutlined } from '@ant-design/icons';
import Button from "../../atoms/Button"


const Signup_StadiumManager = props => {
    // Hooks & Server
    const [sucMsg, setSucMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [code, setCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [stadiumName, setStadiumName] = useState("");
    const [stadiums, setStadiums] = useState([]);
    const [stadiumManagers, setStadiumManagers] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/getUsers')
        .then(res => setUsers(res.data))
        .catch(e => {setErrMsg("Server Error, please reload."); setSucMsg("")})
        axios.get('http://localhost:5000/viewStadiums')
        .then(res => setStadiums(res.data))
        .catch(e => {setErrMsg("Server Error, please logout and reload.");setSucMsg("")})
        axios.get('http://localhost:5000/getStadiumManagers')
        .then(res => setStadiumManagers(res.data))
        .catch(e => {setErrMsg("Server Error, please logout and reload.");setSucMsg("")})
    }, []);
    
    // Functions
    const getIsFormValid = () => {
        return username && password && name && stadiumName;
    };

    const clearForm = () => { 
        setName(""); 
        setUsername(""); 
        setPassword("");
        setStadiumName("");
    }; 
    const submitNewSM = async (e) => {
        e.preventDefault(); 
        var exisitingUsername = false;
        var takenStadium = false;
        var invalidStadium = true;
        users.forEach(user => {
            if (user.username == username)
                exisitingUsername = true;
        });
        stadiumManagers.forEach(manager => {
            if (manager.name == stadiumName)
                takenStadium = true;
        });
        stadiums.forEach(stadium => {
            if (stadium.name == stadiumName) 
                invalidStadium = false;
        });
        if (exisitingUsername) {setErrMsg("This username is unavailable."); setSucMsg(""); setCode(1)}
        else if (username.includes(" ")) {setErrMsg("Username cannot contain spaces."); setSucMsg(""); setCode(2)}
        else if (password.length < 8) {setErrMsg("Password must be at least 8 characters long."); setSucMsg(""); setCode(2)}
        else if (invalidStadium) {setErrMsg("This stadium does not exist."); setSucMsg(""); setCode(6)}
        else if (takenStadium) {setErrMsg("This stadium already has a manager."); setSucMsg(""); setCode(6)}
        else {
            axios.post('http://localhost:5000/newSM', {
                name: {name}.name,
                username: {username}.username,
                password: {password}.password,
                stadium: {stadiumName}.stadiumName
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
                    <label htmlFor = "stadiumName"> Stadium Name </label> <br />
                    <Input
                        type = "text"
                        id = "stadiumName" 
                        name = "stadiumName"
                        value = {stadiumName}
                        autoComplete= "off"
                        placeholder="Stadium to manage"
                        prefix = {(code == 6) ? <ExclamationOutlined /> : <></>}
                        status= {(code == 6) ? "error" : ""}                        
                        onChange = {(e) => {setStadiumName(e.target.value); setSucMsg(""); setErrMsg(""); setCode("")}}
                        required
                    />
                </div>
                <input style={{display:"none"}} type="submit" onClick={submitNewSM}></input>
                <Button type="submit" ghost block size="large" className="submit" onClick = {submitNewSM} disabled={!getIsFormValid()}> Create Account </Button>  
            </Form>
            </div>
        );
}

export default Signup_StadiumManager;