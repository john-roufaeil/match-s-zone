import axios, * as others from 'axios';
import '../App.css'; 
import FadeIn from 'react-fade-in';
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import error from "../assets/icons/actions/error.png"
import success from "../assets/icons/actions/success.png"


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
    const [users, setUsers] = useState([]);
    const [fans, setFans] = useState([]);
    const [stadiumManagers, setStadiumManagers] = useState([]);
    const [clubRepresentatives, setClubRepresentatives] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/viewStadiums')
        .then(res => setStadiums(res.data))
    }, [stadiums]);

    const [clubs, setClubs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/viewClubs')
        .then(res => setClubs(res.data))
    }, [clubs]);

    useEffect(() => {
        try {
        axios.get('http://localhost:5000/viewFans')
        .then(res => setFans(res.data))
        } catch(e) {
            console.log(e);
            setErrMsg("Server Error");
            setSuccessMsg("");
        }
    }, [fans]);
    
    const [errMsg, setErrMsg] = useState("");
    const errorRef = useRef();

    const [successMsg, setSuccessMsg] = useState("");
    const successRef = useRef();

    useEffect(() => {
        setSuccessMsg("") 
        setErrMsg("")
    }, [props.type])

    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:5000/getUsers').then(res => setUsers(res.data))
        axios.get('http://localhost:5000/getStadiumManagers').then(res => setStadiumManagers(res.data))
        axios.get('http://localhost:5000/getClubRepresentatives').then(res => setClubRepresentatives(res.data))
    }, []);

    const getIsFormValid = type => {
        if (!(username && password))
            return false;
        switch(type) {
            case "stadiumManager": return name&&stadiumName?true:false;
            case "clubRepresentative": return name&&clubName?true:false;
            case "fan": return name&&nationalId?true:false; 
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
        try {
        var exisitingUsername = false;
        users.forEach(user => {
            if (user.username == username) {
                exisitingUsername = true;   
            }
        });
        if (exisitingUsername) {setErrMsg("This username is unavailable."); setSuccessMsg("");}
        else if (username.includes(" ")) {setErrMsg("Username cannot contain spaces."); setSuccessMsg("");}
        else if (password.length < 8) {setErrMsg("Password must be at least 8 characters long."); setSuccessMsg("");}
        else if (parseInt(birthDate.substring(0,4)) > parseInt((new Date().getFullYear()))) {setErrMsg("Please enter a valid birth date."); setSuccessMsg("");}
        else if (parseInt(birthDate.substring(0,4)) + 16 >= parseInt((new Date().getFullYear()))) {setErrMsg("You must be at least 16 years old to register."); setSuccessMsg("");}
        else {
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
                    phone: {phone}.phone
                })
            })
            .then(res => console.log(res.json()))
            .then(clearForm())
            .then(setSuccessMsg("You have successfully registered."))
            .then(setErrMsg(""));
        }
        } catch(e) {
            console.log(e);
            setErrMsg("Server Error");
            setSuccessMsg("");
        }
    };
    const fanForm = () => {
        return  <FadeIn>
                    <p ref={successRef} className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px'/>{' '} {successMsg}</p>
                    <p ref={errorRef} className={errMsg ? "errMsg" : "offscreen"}><img src={error} width='10px'/>{' '} {errMsg}</p>
                    <form  method="POST" action="/newF" className="fanForm" onSubmit={submitNewF}> 
                        <div className="field">
                            <label htmlFor="name">
                                Name
                            </label><br />
                            <input
                                type = "text"
                                id = "name" 
                                name = "name"
                                value = {name}
                                onChange={(e) => {setName(e.target.value); setSuccessMsg(""); setErrMsg("")}}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="username">
                                Username
                            </label><br />
                            <input
                                type= "text"
                                id = "username" 
                                name = "username"
                                value = {username}
                                onChange={(e) => {setUsername(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">
                                Password
                            </label><br />
                            <input
                                type="password"
                                id = "password" 
                                name = "password"
                                value = {password}
                                onChange={(e) => {setPassword(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                required
                                autoComplete='new-password'
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="nationalId">
                                National ID Number 
                            </label><br />
                            <input
                                type= "text"
                                id = "nationalId" 
                                name = "nationalId"
                                onChange={(e) => {setNationalId(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                value = {nationalId}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="birthDate">
                                Date of Birth
                            </label><br />
                            <input
                                type= "date"
                                id = "birthDate" 
                                name = "birthDate"
                                value = {birthDate}
                                onChange={(e) => {setBirthDate(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="address">
                                Address
                            </label><br />
                            <input
                                type= "location"
                                id = "address" 
                                name = "address"
                                value = {address}
                                onChange={(e) => {setAddress(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="phone">
                                Phone Number
                            </label><br />
                            <input
                                type= "tel"
                                id = "phone" 
                                name = "phone"
                                value = {phone}
                                onChange={(e) => {setPhone(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            />
                        </div>
                        <button type="submit" disabled={!getIsFormValid("fan")}> 
                            Create account 
                        </button>  
                    </form>
                </FadeIn>
    };

    const submitNewSAM = async (e) => {
        e.preventDefault(); 
        var exisitingUsername = false;
        users.forEach(user => {
            if (user.username == username) {
                exisitingUsername = true;
            }
        });
        if (exisitingUsername) {setErrMsg("This username is unavailable."); setSuccessMsg("");}
        else if (username.includes(" ")) {setErrMsg("Username cannot contain spaces."); setSuccessMsg("");}
        else if (password.length < 8) {setErrMsg("Password must be at least 8 characters long."); setSuccessMsg("");}
        else {
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
            .then(clearForm())
            .then(setSuccessMsg("You have successfully registered."))
            .then(setErrMsg(""));
        }
    };
    const managerForm = () => {
        return <FadeIn>
                    <p ref={successRef} className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px'/>{' '} {successMsg}</p>
                    <p ref={errorRef} className={errMsg ? "errMsg" : "offscreen"}><img src={error} width='10px'/>{' '} {errMsg}</p>
                    <form method="POST" action="/newSAM" className="managerForm" onSubmit={submitNewSAM}> 
                        <div className="field">
                            <label htmlFor="name">
                                Name 
                            </label><br />
                            <input
                                type="text"
                                id ="name" 
                                name = "name"
                                value = {name}
                                onChange={(e) => {setName(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="username">
                                Username 
                            </label><br />
                            <input
                                type="text"
                                id ="username" 
                                name="username"
                                value = {username}
                                onChange={(e) => {setUsername(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">
                                Password 
                            </label><br />
                            <input
                                required
                                value = {password}
                                onChange={(e) => {setPassword(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                name="password"
                                id ="password" 
                                type="password"
                                autoComplete='new-password'
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
        var exisitingUsername = false;
        var takenClub = false;
        var invalidClub = true;
        users.forEach(user => {
            if (user.username == username) {
                exisitingUsername = true;
            }
        });
        clubRepresentatives.forEach(rep => {
            if (rep.name == clubName) {
                takenClub = true;
            }
        });
        clubs.forEach(club => {
            if (club.name == clubName) {
                invalidClub = false;
            }
        });
        if (exisitingUsername) {setErrMsg("This username is unavailable."); setSuccessMsg("");}
        else if (username.includes(" ")) {setErrMsg("Username cannot contain spaces."); setSuccessMsg("");}
        else if (password.length < 8) {setErrMsg("Password must be at least 8 characters long."); setSuccessMsg("");}
        else if (invalidClub) {setErrMsg("This club does not exist."); setSuccessMsg("");}
        else if (takenClub) {setErrMsg("This club already has a representative."); setSuccessMsg("");}
        else {
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
            .then(clearForm())
            .then(setSuccessMsg("You have successfully registered."))
            .then(setErrMsg(""))
        }
    };
    const clubRepresentativeForm = () => {
        return <FadeIn>
                <p ref={successRef} className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px'/>{' '} {successMsg}</p>
                <p ref={errorRef} className={errMsg ? "errMsg" : "offscreen"}><img src={error} width='10px'/>{' '} {errMsg}</p>
                <form  method="POST" action="/newCR" className="clubRepresentativeForm" onSubmit={submitNewCR}> 
                    <div className="field">
                        <label htmlFor="name">
                            Name 
                        </label><br />
                        <input
                            type= "text"
                            id = "name"
                            name = "name" 
                            value = {name}
                            onChange={(e) => {setName(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="username">
                            Username 
                        </label><br />
                        <input
                            type= "text"
                            id = "username" 
                            name = "username"
                            value = {username}
                            onChange={(e) => {setUsername(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">
                            Password 
                        </label><br />
                        <input
                            type="password"
                            id ="password" 
                            name = "password"
                            value = {password}
                            onChange={(e) => {setPassword(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="clubName">
                            Club to Represent 
                        </label><br />
                        <input
                            type= "text"
                            id = "clubName" 
                            name = "name"
                            value = {clubName}
                            onChange={(e) => {setClubName(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            required
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
        var exisitingUsername = false;
        var takenStadium = false;
        var invalidStadium = true;
        users.forEach(user => {
            if (user.username == username) {
                exisitingUsername = true;
            }
        });
        stadiumManagers.forEach(manager => {
            if (manager.name == stadiumName) {
                takenStadium = true;
            }
        });
        stadiums.forEach(stadium => {
            if (stadium.name == stadiumName) {
                invalidStadium = false;
            }
        });
        if (exisitingUsername) {setErrMsg("This username is unavailable."); setSuccessMsg("");}
        else if (username.includes(" ")) {setErrMsg("Username cannot contain spaces."); setSuccessMsg("");}
        else if (password.length < 8) {setErrMsg("Password must be at least 8 characters long."); setSuccessMsg("");}
        else if (takenStadium) {setErrMsg("This stadium already has a manager."); setSuccessMsg("");}
        else if (invalidStadium) {setErrMsg("This stadium does not exist."); setSuccessMsg("");}
        else {
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
            .then(clearForm())
            .then(setSuccessMsg("You have successfully registered."))
            .then(setErrMsg(""))
        }
    };
    const stadiumManagerForm = () => {
        return  <FadeIn>
                    <p ref={successRef} className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px'/>{' '} {successMsg}</p>
                    <p ref={errorRef} className={errMsg ? "errMsg" : "offscreen"}><img src={error} width='10px'/>{' '} {errMsg}</p>
                    <form  method="POST" action="/newSM" className="stadiumManagerForm" onSubmit={submitNewSM}> 
                        <div className="field">
                            <label htmlFor="name">
                                Name 
                            </label><br />
                            <input
                                type= "text"
                                id = "name" 
                                name = "name"
                                value = {name}
                                onChange={(e) => {setName(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="username">
                                Username 
                            </label><br />
                            <input
                                type= "text"
                                id = "username" 
                                name = "username"
                                value = {username}
                                onChange={(e) => {setUsername(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">
                                Password 
                            </label><br />
                            <input
                                type= "password"
                                id = "password" 
                                name = "password"
                                value = {password}
                                onChange={(e) => {setPassword(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                autoComplete='new-password'
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="stadiumName">
                                Stadium to Manage 
                            </label><br />
                            <input
                                type= "text"
                                id = "stadiumName" 
                                name = "stadiumName"
                                value = {stadiumName}
                                onChange={(e) => {setStadiumName(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                                required
                            />
                        </div>
                        <button type="submit" disabled={!getIsFormValid("stadiumManager")}> 
                            Create account 
                        </button>  
                    </form>
                </FadeIn>
    };

    const navigate = useNavigate();

    const logIn = (e) => {
        try {
        e.preventDefault();
        var foundUsr = false;
        var foundPw = false;
        var blockedFan = false;
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
        if (!foundUsr || !foundPw) {
            setErrMsg("Invalid username or password.");
            setSuccessMsg("");
        } else if (blockedFan) {
            setErrMsg("Sorry, your account is blocked.");
            setSuccessMsg("");
        } else {
            switch(type) {
                case 0: navigate("/admin-dashboard"); break;
                case 2: navigate("/manager-dashboard"); break;
                case 3: navigate("/club-representative-dashboard"); break;
                case 4: navigate("/stadium-manager-dashboard"); break;
                default: navigate("/fan-dashboard"); break;
            }
            setLoggedInUser(username);
        }
        } catch (e) {
            console.log(e);
            setErrMsg("Server Error");
            setSuccessMsg("");
        }      
    };
    const logInForm = () => {
        return  <FadeIn><div>
                <p ref={errorRef} className={errMsg ? "errMsg" : "offscreen"}><img src={error} width='10px'/>{' '} {errMsg}</p>
                <form autoComplete='new-password' className="logInForm" > 
                    <div className="field"> 
                        <label htmlFor="username">Username</label><br />
                        <input
                            type="text"
                            id ="username" 
                            value = {username}
                            autoComplete="new-password"
                            autoFocus="on"
                            onChange={(e) => {setUsername(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password">
                            Password
                        </label><br />
                        <input
                            type="password"
                            id ="password" 
                            value = {password}
                            autoComplete="new-password"
                            onChange={(e) => {setPassword(e.target.value); setSuccessMsg(""); setErrMsg("");}}
                            required
                            
                        />
                    </div>
                    <p>Forgot Password?</p>
                    <button onClick={logIn} disabled={!getIsFormValid("logIn")}> 
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