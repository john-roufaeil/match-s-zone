import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../molecules/Form";
import { Input, DatePicker } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined, LockOutlined, ExclamationOutlined } from '@ant-design/icons';


const Signup_Fan = props => {
    // Hooks & Server
    const [sucMsg, setSucMsg] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [code, setCode] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [users, setUsers] = useState([]);
    const [fans, setFans] = useState([]);
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
        return username && password && name && nationalId && birthDate && address && phone;
    };

    const clearForm = () => { 
        setName(""); 
        setUsername(""); 
        setPassword(""); 
        setNationalId(""); 
        setBirthDate(""); 
        setAddress("");
        setPhone(""); 
    }; 

    const submitNewF = async (e) => {
        e.preventDefault(); 
        var exisitingUsername = false;
        var exisitingID = false;
        users.forEach(user => {
            if (user.username === username)
                exisitingUsername = true;   
        });
        fans.forEach(fan => {
            if (fan.national_id === nationalId)
                exisitingID = true;
        })
        if (exisitingUsername) {setErrMsg("This username is unavailable."); setSucMsg(""); setCode(1);}
        else if (username.includes(" ")) {setErrMsg("Username cannot contain spaces."); setSucMsg(""); setCode(1);}
        else if (password.length < 8) {setErrMsg("Password must be at least 8 characters long."); setSucMsg(""); setCode(2)}
        else if (exisitingID) {setErrMsg("This national ID is already registerd."); setSucMsg(""); setCode(3)}
        else if (parseInt(birthDate.substring(0,4)) > parseInt((new Date().getFullYear()))) {setErrMsg("Please enter a valid birth date."); setSucMsg(""); setCode(4)}
        else if (parseInt(birthDate.substring(0,4)) + 16 >= parseInt((new Date().getFullYear()))) {setErrMsg("You must be at least 16 years old to register."); setSucMsg(""); setCode(4)}
        else {
            axios.post('http://localhost:5000/newF', {
                name: {name}.name,
                username: {username}.username,
                password: {password}.password,
                nat_id: {nationalId}.nationalId,
                birthdate: {birthDate}.birthDate.replaceAll('-', ''),
                address: {address}.address,
                phone: {phone}.phone
            })
            .then(clearForm())
            .then(setSucMsg("You have successfully registered."))
            .then(setErrMsg(""))
            .then(setCode(""))
            .catch(e => {setErrMsg("Server Error, please logout and reload.");setSucMsg(""); setCode("")})
        }
    }
    
    return  (<Form sucMsg={sucMsg} errMsg={errMsg}> 
                <div className = "field">
                    <label htmlFor = "name"> Name </label><br />
                    <Input
                        type = "text"
                        id = "name" 
                        name = "name"
                        value = {name}
                        autoComplete = "off"
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
                    <label htmlFor = "nationalId"> National ID Number </label> <br />
                    <Input
                        type = "text"
                        id = "nationalId" 
                        name = "nationalId"
                        autoComplete = "off"
                        placeholder="Enter your national ID number"
                        status= {(code == 3) ? "error" : ""}                        
                        prefix = {(code == 3) ? <ExclamationOutlined /> : <></>}
                        onChange = {(e) => {setNationalId(e.target.value); setSucMsg(""); setErrMsg(""); setCode("")}}
                        value = {nationalId}
                        required
                    />
                </div>
                <div className = "field">
                    <label htmlFor = "birthDate"> Date of Birth </label> <br />
                    <DatePicker
                        style={{width:"100%"}}
                        type = "date"
                        id = "birthDate" 
                        name = "birthDate"
                        // value = {birthDate}
                        status = {(code == 4) ? "error" : ""}                        
                        placeholder= "Select your birth date"
                        onChange = {(date, dateString) => {setBirthDate(dateString); setSucMsg(""); setErrMsg(""); setCode("")}}
                        required
                    />
                </div>
                <div className = "field">
                    <label htmlFor = "address"> Address </label> <br />
                    <Input
                        type = "location"
                        id = "address" 
                        name = "address"
                        value = {address}
                        autoComplete = "off"
                        prefix = <ExclamationOutlined style={{width:"0px"}} />
                        placeholder="Enter your address"
                        onChange = {(e) => {setAddress(e.target.value); setSucMsg(""); setErrMsg(""); setCode("")}}
                        required
                    />
                </div>
                <div className="field">
                    <label htmlFor="phone"> Phone Number </label> <br />
                    <Input
                        type= "tel"
                        id = "phone" 
                        name = "phone"
                        value = {phone}
                        prefix = <ExclamationOutlined style={{width:"0px"}} />
                        autoComplete = "off"
                        placeholder="Enter your phone number"
                        onChange = {(e) => {setPhone(e.target.value); setSucMsg(""); setErrMsg(""); setCode("")}}
                        required
                    />
                </div>
                <button type="submit" onClick={submitNewF} disabled={!getIsFormValid("fan")}> Create account </button>  
            </Form>
        );
}

export default Signup_Fan;