import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../molecules/Form";
import { Input } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, LockOutlined, ExclamationOutlined } from '@ant-design/icons';
import Button from "../../atoms/Button";


const Signup_Manager = props => {
    // Hooks & Server
    const [sucMsg, setSucMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [code, setCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/getUsers')
        .then(res => setUsers(res.data))
        .catch(e => {setErrMsg("Server Error, please reload."); setSucMsg("")})
    }, []);
    
    // Functions
    const getIsFormValid = () => {
        return username && password && name;
    };

    const clearForm = () => { 
        setName(""); 
        setUsername(""); 
        setPassword("");
    }; 

    const submitNewSAM = async (e) => {
        e.preventDefault(); 
        var exisitingUsername = false;
        users.forEach(user => {
            if (user.username === username)
                exisitingUsername = true;   
        });
        if (exisitingUsername) {setErrMsg("This username is unavailable."); setSucMsg(""); setCode(1);}
        else if (username.includes(" ")) {setErrMsg("Username cannot contain spaces."); setSucMsg(""); setCode(1);}
        else if (password.length < 8) {setErrMsg("Password must be at least 8 characters long."); setSucMsg(""); setCode(2)}
        else {
            axios.post('http://localhost:5000/newSAM', {
                name: {name}.name,
                username: {username}.username,
                password: {password}.password
            })
            .then(clearForm())
            .then(setSucMsg("You have successfully registered."))
            .then(setErrMsg(""))
            .then(setCode(""))
            .catch(e => {setErrMsg("Server Error, please logout and reload.");setSucMsg(""); setCode("")})
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
                <input style={{display:"none"}} type="submit" onClick={submitNewSAM}></input>
                <Button type="ghost" block size="large" className="submit" onClick = {submitNewSAM} disabled={!getIsFormValid()}> Create Account </Button>  
            </Form></div>
        );
}

export default Signup_Manager;