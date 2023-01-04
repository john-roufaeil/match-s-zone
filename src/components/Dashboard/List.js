// import trash from "../../assets/icons/actions/trash.png"
import { useState } from "react";
const cors = require('cors');


const List = props => {
    const [stadiums, setStadiums] = useState([{'name':"hi", location:"place", capacity:5}, {'name':"hello", 'location':"anotherPlace", capacity:10}]);

    const fetchStadiums = async () => {
        const newData = await fetch(`http://localhost:5000/viewStadiums`, {
            method: 'POST', 
            mode: 'no-cors',
            url: 'http://localhost:5000',
            headers : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true,
            },
            body : JSON.stringify(stadiums)
        })
        .then(res => res.json())
        setStadiums(newData[0])
        // setStadiums(newData)
    }

    const fetchClubs = async () => {
        const newData = await fetch(`http://localhost:5000/viewClubs`, {
            method: 'POST', 
            mode: 'no-cors',
            url: 'http://localhost:5000',
            headers : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
            },
        })
    }

    const viewStadiums = () => {
        fetchStadiums();
        console.log(stadiums);
        const data = stadiums.map((stadium) => {
            return  <tr key={stadium.name}>
                        <td>{stadium.name}</td>
                        <td>{stadium.location}</td>
                        <td>{stadium.capacity}</td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
    }

    const viewClubs = () => {
        fetchClubs();
        return  <table>
                    <thead>
                        <th>Name</th>
                        <th>Location</th>
                        <th></th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewFans = () => {
        return  <table>
                    <thead>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>National ID</th>
                        <th>Birth Date</th>
                        <th></th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewMatches = () => {
        return  <table>
                <thead>
                    <th>Host Club</th>
                    <th>Guest Club</th>
                    <th>Stadium</th>
                    <th>Location</th>
                    <th></th>
                </thead>
                <tbody>
                </tbody>
            </table>
    }

    const viewUpcoming = () => {
        return  <table>
                <thead>
                    <th>Host Club</th>
                    <th>Guest Club</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </thead>
                <tbody>
                </tbody>
            </table>
    }

    const viewPrevious = () => {
        return  <table>
                <thead>
                    <th>Host Club</th>
                    <th>Guest Club</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </thead>
                <tbody>
                </tbody>
            </table>
    }

    const neverTogether = () => {
        return  <table>
                <thead>
                    <th>Host Club</th>
                    <th>Guest Club</th>
                </thead>
                <tbody>
                </tbody>
            </table>
    }

    const viewMyStadium = () => {
        return  <table>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewRequests = () => {
        return  <table>
                    <thead>
                        <th>Club Representative</th>
                        <th>Host Club</th>
                        <th>Guest Club</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th className="actionColumn">Accept</th>
                        <th className="actionColumn">Refuse</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewMyClub = () => {
        return  <table>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewMatchesForStadium = () => {
        return  <table>
                    <thead>
                        <th>Host Club</th>
                        <th>Guest Club</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Stadium</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewAvailableStadiums = () => {
        return  <table>
                    <thead>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewMyTickets = () => {
        return  <table>
                    <thead>
                        <th>ID</th>
                        <th>Host Club</th>
                        <th>Guest Club</th>
                        <th>Start Time</th>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
    }

    const viewAvailableTickets = () => {
        return  <table>
                    <thead>
                        <th>Host Club</th>
                        <th>Guest Club</th>
                        <th>Stadium</th>
                        <th>Location</th>
                        <th>Start Time</th>
                        <th className="actionColumn">Purchase Ticket</th>
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