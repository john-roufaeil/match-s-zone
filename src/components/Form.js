import '../App.css'; 
import {useState} from "react"; 
import {validateEmail} from "../utils"; 
 
const PasswordErrorMessage = () => { 
    return ( 
        <p className="fieldError">Password should have at least 8 characters</p> 
    ); 
}; 

const Form = props => { 
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState({
        value:"",
        isTouched: false
    });
    const [nationalId, setNationalId] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [clubName, setClubName] = useState("");
    const [stadiumName, setStadiumName] = useState("");

    const getIsFormValid = type => {
        if (!(name && username && password && password.length >= 8))
            return false;
        switch(type) {
            case "stadiumManager": return stadiumName;
            case "clubRepresentative": return clubName;
            case "fan": return nationalId; 
            default: return true;
        }
    }

    const clearForm = () => { 
        setName(""); 
        setUsername(""); 
        setPassword({ 
        value: "", 
        isTouched: false, 
        }); 
        setNationalId(""); 
        setBirthDate(""); 
        setAddress("");
        setPhone("");  
        setClubName(""); 
        setStadiumName(""); 
    }; 

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        alert("Account created!"); 
        clearForm(); 
    }; 

    const fanForm = () => {
        return  <form  className="fanForm fadeIn" onSubmit={handleSubmit}> 
                    <div className="field">
                        <label for="name">
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
                        <label for="username">
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
                        <label for="password">
                            Password <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {password.value}
                            onChange={(e) => {
                                setPassword({...password, isTouched: true});
                            }}
                            id ="username" 
                            type="password"
                        />
                        {password.isTouched && password.value.length < 8 ? 
                        (<PasswordErrorMessage />) : null} 
                    </div>
                    <div className="field">
                        <label for="nationalId">
                            National ID Number <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {nationalId}
                            onChange={(e) => {
                                setNationalId(e.target.value);
                            }}
                            id ="nationalId" 
                            type="text"
                        />
                    </div>
                    <div className="field">
                        <label for="birthDate">
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
                        <label for="address">
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
                        <label for="phone">
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
                    <button type="submit" disabled={!getIsFormValid("clubRepresentative")}> 
                        Create account 
                    </button>  
                </form>
    }

    const managerForm = () => {
        return <form  className="fanForm" onSubmit={handleSubmit}> 
                    <div className="field">
                        <label for="name">
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
                        <label for="username">
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
                        <label for="password">
                            Password <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {password.value}
                            onChange={(e) => {
                                setPassword({...password, isTouched: true});
                            }}
                            id ="username" 
                            type="password"
                        />
                        {password.isTouched && password.value.length < 8 ? 
                        (<PasswordErrorMessage />) : null} 
                    </div>
                    <button type="submit" disabled={!getIsFormValid("clubRepresentative")}> 
                        Create account 
                    </button>  
                </form>
    }
   
    const clubRepresentativeForm = () => {
        return <form  className="fanForm" onSubmit={handleSubmit}> 
                    <div className="field">
                        <label for="name">
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
                        <label for="username">
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
                        <label for="password">
                            Password <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {password.value}
                            onChange={(e) => {
                                setPassword({...password, isTouched: true});
                            }}
                            id ="username" 
                            type="password"
                        />
                        {password.isTouched && password.value.length < 8 ? 
                        (<PasswordErrorMessage />) : null} 
                    </div>
                    <div className="field">
                        <label for="clubName">
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
    }

    const stadiumManagerForm = () => {
        return  <form  className="fanForm" onSubmit={handleSubmit}> 
                    <div className="field">
                        <label for="name">
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
                        <label for="username">
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
                        <label for="password">
                            Password <sup>*</sup>
                        </label><br />
                        <input
                            required
                            value = {password.value}
                            onChange={(e) => {
                                setPassword({...password, isTouched: true});
                            }}
                            id ="username" 
                            type="password"
                        />
                        {password.isTouched && password.value.length < 8 ? 
                        (<PasswordErrorMessage />) : null} 
                    </div>
                    <div className="field">
                        <label for="stadiumName">
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
                    <button type="submit" disabled={!getIsFormValid("clubRepresentative")}> 
                        Create account 
                    </button>  
                </form>
    }


    switch(props.type) {
        case "manager":
            return managerForm();
        case "clubRepresentative":
            return clubRepresentativeForm();
        case "stadiumManager":
            return stadiumManagerForm();
        default: 
            return fanForm();
    }
}

export default Form;