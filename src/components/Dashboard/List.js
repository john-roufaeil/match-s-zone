import axios, * as others from 'axios';
// import trash from "../../assets/icons/actions/trash.png"
import { useState } from "react";
const cors = require('cors');
// const axios = require('axios');




const List = props => {
    const [stadiums, setStadiums] = useState([]);
    const [clubs, setClubs] = useState([]);

    const fetchStadiums = async () => {
        axios.get('http://localhost:5000/viewStadiums', {
        })
        .then(res => setStadiums(res.data))
    }
    const viewStadiums = () => {
        fetchStadiums();
        console.log(stadiums)
        const data = stadiums.map((stadium) => {
            return  <tr key={stadium.name}>
                        <td>{stadium.name}</td>
                        <td>{stadium.location}</td>
                        <td>{stadium.capacity}</td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
    }

    const fetchClubs = async () => {
        // e.preventDefault();
        const newData = await fetch(`http://localhost:5000/viewClubs`, {
            method: "GET",
            url: 'http://localhost:5000',
            mode: "no-cors",
            headers : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body : undefined
        })
        
        
    }
    const viewClubs = () => {
        // {const result = fetchClubs();}
        // {const result=fetchClubs();
        // console.log(result.then)}
        // console.log("hi");}
        // return  <form method="POST" action="/viewClubs" onLoad={fetchClubs}>
        return  <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                // </form>
    }

    const viewFans = () => {
        return  <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Name</th>
                            <th>National ID</th>
                            <th>Birth Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewMatches = () => {
        return  <table>
                <thead>
                    <tr>
                        <th>Host Club</th>
                        <th>Guest Club</th>
                        <th>Stadium</th>
                        <th>Location</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
    }

    const viewUpcoming = () => {
        return  <table>
                <thead>
                    <tr>
                        <th>Host Club</th>
                        <th>Guest Club</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
    }

    const viewPrevious = () => {
        return  <table>
                <thead>
                    <tr>
                        <th>Host Club</th>
                        <th>Guest Club</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
    }

    const neverTogether = () => {
        return  <table>
                <thead>
                    <tr>
                        <th>Host Club</th>
                        <th>Guest Club</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
    }

    const viewMyStadium = () => {
        return  <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewRequests = () => {
        return  <table>
                    <thead>
                        <tr>
                            <th>Club Representative</th>
                            <th>Host Club</th>
                            <th>Guest Club</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                            <th className="actionColumn">Accept</th>
                            <th className="actionColumn">Refuse</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewMyClub = () => {
        return  <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewMatchesForStadium = () => {
        return  <table>
                    <thead>
                        <tr>
                            <th>Host Club</th>
                            <th>Guest Club</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Stadium</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewAvailableStadiums = () => {
        return  <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewMyTickets = () => {
        return  <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Host Club</th>
                            <th>Guest Club</th>
                            <th>Start Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewAvailableTickets = () => {
        return  <table>
                    <thead>
                        <tr>
                            <th>Host Club</th>
                            <th>Guest Club</th>
                            <th>Stadium</th>
                            <th>Location</th>
                            <th>Start Time</th>
                            <th className="actionColumn">Purchase Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    switch(props.object) {
        case "stadiums": 
            return viewStadiums();
        case "clubs":
            return viewClubs();
        case "fans":
            return viewFans();
        case "matches":
            return viewMatches();
        case "upcoming":
            return viewUpcoming();
        case "previous":
            return viewPrevious();
        case "never":
            return neverTogether();
        case "myStadium":
            return viewMyStadium();
        case "requests":
            return viewRequests();
        case "myClub":
            return viewMyClub();
        case "matchesForStadium":
            return viewMatchesForStadium();
        case "availableStadiums":
            return viewAvailableStadiums();
        case "myTickets":
            return viewMyTickets();
        case "availableTickets":
            return viewAvailableTickets();
        default: 
            return null;
    }
}

export default List;