import axios, * as others from 'axios';
import { useState, useEffect } from "react";
import open from "../../assets/icons/actions/open.png"
import close from "../../assets/icons/actions/close.png"

const List = props => {
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

    const [fans, setFans] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/viewFans')
        .then(res => setFans(res.data))
    }, [fans]);

    const [allMatches, setAllMatches] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/viewAllMatches')
        .then(res => setAllMatches(res.data))
    }, [allMatches]);

    const [previousMatches, setPreviousMatches] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/viewPreviousMatches')
        .then(res => setPreviousMatches(res.data))
    }, [previousMatches]);

    const [upcomingMatches, setUpcomingMatches] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/viewUpcomingMatches')
        .then(res => setUpcomingMatches(res.data))
    }, [upcomingMatches]);

    const [clubsNeverTogether, setClubsNeverTogether] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/viewClubsNotScheduledTogether')
        .then(res => setClubsNeverTogether(res.data))
    }, [clubsNeverTogether]);



    const viewStadiums = () => {
        const data = stadiums.map((stadium) => {
            const name = stadium.name;
            const openStadium = async (e) => {
                e.preventDefault();
                const newData = await fetch(`http://localhost:5000/openStadium`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: {name}
                    })
                })
                .then(res => console.log(res.json()))
            }
            const closeStadium = async (e) => {
                e.preventDefault();
                const newData = await fetch(`http://localhost:5000/closeStadium`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: {name}
                    })
                })
                .then(res => console.log(res.json()))
            }
            return  <tr key={stadium.name}>
                        <td>{stadium.name}</td>
                        <td>{stadium.location}</td>
                        <td>{stadium.capacity}</td>
                        <td>{stadium.status?'Available':'Unavailable'}</td>
                        <td>{stadium.status
                            ?<form onSubmit={closeStadium}><button type="submit" style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={close} /></button></form>
                            :<form onSubmit={openStadium}><button type="submit" style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={open} /></button></form>}
                        </td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
    }

    const viewClubs = () => {
        const data = clubs.map((club) => {
            return  <tr key={club.name}>
                        <td>{club.name}</td>
                        <td>{club.location}</td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
    }

    const viewFans = () => {
        const data = fans.map((fan) => {
            return  <tr key={fan.national_id}>
                        <td>{fan.username}</td>
                        <td>{fan.password}</td>
                        <td>{fan.name}</td>
                        <td>{fan.national_id}</td>
                        <td>{fan.birthDate.substring(0,10)}</td>
                        <td>{fan.address}</td>
                        <td>{fan.phoneNumber}</td>
                        <td>{fan.status?'Unblocked':'Blocked'}</td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Name</th>
                            <th>National ID</th>
                            <th>Birth Date</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
    }

    const viewMatches = () => {
        const data = allMatches.map((match) => {
            return  <tr>
                        <td>{match.host}</td>
                        <td>{match.guest}</td>
                        <td>{match.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{match.endTime.replace('T', ' ').substring(0,16)}</td>
                    </tr>
        });
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
                    {data}
                </tbody>
            </table>
    }

    const viewUpcoming = () => {
        const data = upcomingMatches.map((match) => {
            return  <tr>
                        <td>{match.host}</td>
                        <td>{match.guest}</td>
                        <td>{match.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{match.endTime.replace('T', ' ').substring(0,16)}</td>
                    </tr>
        });
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
                    {data}
                </tbody>
            </table>
    }

    const viewPrevious = () => {
        const data = previousMatches.map((match) => {
            return  <tr>
                        <td>{match.host}</td>
                        <td>{match.guest}</td>
                        <td>{match.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{match.endTime.replace('T', ' ').substring(0,16)}</td>
                    </tr>
        });
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
                    {data}
                </tbody>
            </table>
    }

    const neverTogether = () => {
        const data = clubsNeverTogether.map((entry) => {
            return  <tr>
                        <td>{entry.name1}</td>
                        <td>{entry.name2}</td>
                    </tr>
        });
        return  <table>
                <thead>
                    <tr>
                        <th>Club 1</th>
                        <th>Club 2</th>
                    </tr>
                </thead>
                <tbody>
                    {data}
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