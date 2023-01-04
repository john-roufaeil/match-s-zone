import '../App.css'; 
import FadeIn from 'react-fade-in';
import {useState} from "react"; 
import {validateEmail} from "../utils"; 
import { Routes, Route, Link } from "react-router-dom";
const cors = require('cors');

const Form = props => { 
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [clubName, setClubName] = useState("");
    const [stadiumName, setStadiumName] = useState("");

    const getIsFormValid = type => {
        if (!(username && password))
            return false;
        switch(type) {
            case "stadiumManager": return stadiumName?true:false;
            case "clubRepresentative": return clubName?true:false;
            case "fan": return nationalId?true:false; 
            default: return true;
        }
    };

    const clearForm = () => { 
        setName(""); 
        setUsername(""); 
        setPassword(""); 
        setNationalId(""); 
        setBirthDate(""); 
        setAddress("");
        setPhone("");  
        setClubName(""); 
        setStadiumName(""); 
    }; 

    const submitNewF = async (e) => {
        e.preventDefault(); 
        const newData = await fetch('http://localhost:5000/newF', {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name}.name,
                username: {username}.username,
                password: {password}.password,
                nat_id: {nationalId}.nationalId,
                birthdate: {birthDate}.birthDate.replaceAll('-', ''),
                address: {address}.address,
                phone: parseInt({phone}.phone)
            })
        })
        .then(res => console.log(res.json()))
        .then(clearForm())
        .catch(console.log("i failed"))
    };
    const fanForm = () => {
        return  <FadeIn><form  method="POST" action="/newF" className="fanForm" onSubmit={submitNewF}> 
                    <div className="field">
                        <label htmlFor="name">
                            Name <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            name = "name"
                            id = "name" 
                            type = "text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="username">
                            Username <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            name = "username"
                            id = "username" 
                            type= "text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">
                            Password <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            name = "password"
                            id = "password" 
                            type="password"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="nationalId">
                            National ID Number <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {nationalId}
                            onChange={(e) => {
                                setNationalId(e.target.value);
                            }}
                            name = "nationalId"
                            id = "nationalId" 
                            type= "text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="birthDate">
                            Date of Birth
                        </label><br />
                        <input
                            value = {birthDate}
                            onChange={(e) => {
                                setBirthDate(e.target.value);
                            }}
                            id ="birthDate" 
                            type="date"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="address">
                            Address
                        </label><br />
                        <input
                            value = {address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                            id ="address" 
                            type="location"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">
                            Phone Number
                        </label><br />
                        <input
                            value = {phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            id ="phone" 
                            type="tel"
                        />
                    </div>
                    <button type="submit" disabled={!getIsFormValid("fan")}> 
                        Create account 
                    </button>  
                </form></FadeIn>
    };

    const submitNewSAM = async (e) => {
        e.preventDefault(); 
        clearForm();
        const newData = await fetch('http://localhost:5000/newSAM', {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name}.name,
                username: {username}.username,
                password: {password}.password
            })
        })
        .then(res => console.log(res.json()))
    };
    const managerForm = () => {
        return <FadeIn><form method="POST" action="/newSAM" className="managerForm" onSubmit={submitNewSAM}> 
                    <div className="field">
                        <label htmlFor="name">
                            Name <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            name = "name"
                            id ="name" 
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="username">
                            Username <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            name="username"
                            id ="username" 
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">
                            Password <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            name="password"
                            id ="password" 
                            type="password"
                        />
                    </div>
                    <button type="submit" disabled={!getIsFormValid("manager")}> 
                        Create account 
                    </button>  
                </form>
                </FadeIn>
    };
   
    const submitNewCR = async (e) => {
        e.preventDefault(); 
        clearForm();
        const newData = await fetch('http://localhost:5000/newCR', {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name}.name,
                username: {username}.username,
                password: {password}.password,
                club: {clubName}.clubName
            })
        })
        .then(res => console.log(res.json()))
    };
    const clubRepresentativeForm = () => {
        return <FadeIn><form  method="POST" action="/newCR" className="clubRepresentativeForm" onSubmit={submitNewCR}> 
                    <div className="field">
                        <label htmlFor="name">
                            Name <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            id ="name" 
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="username">
                            Username <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            id ="username" 
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">
                            Password <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            id ="username" 
                            type="password"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="clubName">
                            Club to Represent <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {clubName}
                            onChange={(e) => {
                                setClubName(e.target.value);
                            }}
                            id ="clubName" 
                            type="text"
                        />
                    </div>
                    <button type="submit" disabled={!getIsFormValid("clubRepresentative")}> 
                        Create account 
                    </button>  
                </form>
                </FadeIn>
    };

    const submitNewSM = async (e) => {
        e.preventDefault(); 
        clearForm();
        const newData = await fetch('http://localhost:5000/newSM', {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name}.name,
                username: {username}.username,
                password: {password}.password,
                stadium: {stadiumName}.stadiumName
            })
        })
        .then(res => console.log(res.json()))
    };
    const stadiumManagerForm = () => {
        return  <FadeIn><div><form  method="POST" action="/newSM" className="stadiumManagerForm" onSubmit={submitNewSM}> 
                    <div className="field">
                        <label htmlFor="name">
                            Name <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            id ="name" 
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="username">
                            Username <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            id ="username" 
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">
                            Password <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            id ="username" 
                            type="password"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="stadiumName">
                            Stadium to Manage <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {stadiumName}
                            onChange={(e) => {
                                setStadiumName(e.target.value);
                            }}
                            id ="stadiumName" 
                            type="text"
                        />
                    </div>
                    <button type="submit" disabled={!getIsFormValid("stadiumManager")}> 
                        Create account 
                    </button>  
                </form></div>
                </FadeIn>
    };

    const logIn = async (e) => {
        e.preventDefault(); 
        // alert("You have succesfully logged in");
        clearForm();
        const users = await fetch('http://localhost:5000/getUsers', {
            method: 'GET', 
            url: 'http://localhost:5000',
            mode: "no-cors",
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            }
        })
        .then(res => console.log(res.json()))
        .catch(console.log("CATCH"))
        console.log(users);
    };
    const logInForm = () => {
        return  <FadeIn><div><form  className="logInForm" onSubmit={logIn} method="GET" action="/getUsers"> 
                    <div className="field">
                        <label htmlFor="username">
                            Username
                        </label><br />
                        <input
                            required
                            value = {username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            id ="username" 
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">
                            Password
                        </label><br />
                        <input
                            required
                            value = {password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            id ="username" 
                            type="password"
                        />
                    </div>
                    <p>Forgot Password?</p>
                    <button type="submit" disabled={!getIsFormValid("logIn")}> 
                        Log In
                    </button>  
                </form></div>
                </FadeIn>
    };

    switch(props.type) {
        case "manager":
            return managerForm();
        case "clubRepresentative":
            return clubRepresentativeForm();
        case "stadiumManager":
            return stadiumManagerForm();
        case "fan": 
            return fanForm();
        default:
            return logInForm();
    }
}

export default Form;