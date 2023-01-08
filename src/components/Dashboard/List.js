import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import open from "../../assets/icons/actions/open.png"
import close from "../../assets/icons/actions/close.png"
import request from "../../assets/icons/actions/request.png"
import { UserContext } from '../../UserContext';
import accept from "../../assets/icons/actions/accept.png"
import acceptDisabled from "../../assets/icons/actions/accept-disabled.png"
import refuse from "../../assets/icons/actions/refuse.png"
import refuseDisabled from "../../assets/icons/actions/refuse-disabled.png"


const List = props => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);

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

    const [myTickets, setMyTickets] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/viewMyTickets', {username: loggedInUser}, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
        .then(res => setMyTickets(res.data))
    }, [myTickets]);

    const [myStadium, setMyStadium] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/viewMyStadium', {username: loggedInUser}, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
        })
        .then(res => setMyStadium(res.data))
    }, [myStadium]);

    const [myClub, setMyClub] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/viewMyClub', {username: loggedInUser}, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
        })
        .then(res => setMyClub(res.data))
    }, [myClub]);

    const [myUpcomingMatches, setMyUpcomingMatches] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/myUpcomingMatches', {username: loggedInUser}, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
        .then(res => setMyUpcomingMatches(res.data))
    }, [myUpcomingMatches]);

    const [myRequests, setMyRequests] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/viewMyRequests', {username: loggedInUser}, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
        .then(res => setMyRequests(res.data))
    }, [myRequests]);
    
    const viewStadiums = () => {
        const data = stadiums.map((stadium) => {
            const name = stadium.name;
            const openStadium = async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:5000/openStadium`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: {name}.name
                    })
                })
                .then(res => res.json())
            }
            const closeStadium = async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:5000/closeStadium`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: {name}.name
                    })
                })
                .then(res => res.json())
            }
            return  <tr key={stadium.name}>
                        <td>{stadium.name}</td>
                        <td>{stadium.location.toUpperCase()}</td>
                        <td>{stadium.capacity}</td>
                        <td>{stadium.status?'Available':'Unavailable'}</td>
                        <td>{stadium.status
                            ?<form onSubmit={closeStadium}><button type="submit" style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={close} alt="" /></button></form>
                            :<form onSubmit={openStadium}><button type="submit" style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={open} alt="" /></button></form>}
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
                        <td>{club.location.toUpperCase()}</td>
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
            return  <tr key={`${match.host}, ${match.guest}, ${match.startTime}`}>
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
            return  <tr key={`${match.host}, ${match.guest}, ${match.startTime}`}>
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
            return  <tr key = {`${match.host}, ${match.guest}, ${match.startTime}`}>
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
            return  <tr key = {`${entry.name1}, ${entry.name2}`}>
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
        const data = myStadium.map((stadium) => {
            const name = stadium.name;
            const openMyStadium = async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:5000/openStadium`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: {name}.name
                    })
                })
                .then(res => res.json())
            }
            const closeMyStadium = async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:5000/closeStadium`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: {stadium}.stadium.name
                    })
                })
                .then(res => res.json())
            }
            return  <tr key = {stadium.id}>
                        <td>{stadium.id}</td>
                        <td>{stadium.name}</td>
                        <td>{stadium.location.toUpperCase()}</td>
                        <td>{stadium.capacity}</td>
                        <td>{stadium.status?'Available':'Unavailable'}</td>
                        <td>{stadium.status
                            ?<button onClick={closeMyStadium} style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={close} alt="" /></button>
                            :<button onClick={openMyStadium} style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={open} alt="" /></button>}
                        </td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>ID</th>
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

    const viewRequests = () => {
        const data = myRequests.map((request) => {
            const acceptRequest = async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:5000/acceptRequest`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        username: {loggedInUser}.loggedInUser,
                        host: {request}.request.name,
                        guest: {request}.request.guestClub,
                        startTime: {request}.request.startTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', '').replaceAll('Z', '').replaceAll(".", "")
                    })
                })
                .then(res => res.json())
            }
            const rejectRequest = async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:5000/rejectRequest`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        username: {loggedInUser}.loggedInUser,
                        host: {request}.request.name,
                        guest: {request}.request.guestClub,
                        startTime: {request}.request.startTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', '').replaceAll('Z', '').replaceAll(".", "")
                    })
                })
                .then(res => res.json())
            }
            return  <tr key={`${request.host}, ${request.guest}, ${request.startTime}`}>
                        <td>{request.clubRepresentative}</td>
                        <td>{request.name}</td>
                        <td>{request.guestClub}</td>
                        <td>{request.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{request.endTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{request.status}</td>
                        <td>{request.status === "unhandled" 
                            ? <button onClick={acceptRequest} style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}>
                                <img width="30px" style={{"borderRadius":"5px"}} alt="" src={accept} />
                              </button>
                            : <img width="30px" style={{"borderRadius":"5px"}} alt="" src={acceptDisabled} />}</td>
                        <td>{request.status === "unhandled" 
                            ? <button onClick={rejectRequest} style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}>
                                <img width="30px" style={{"borderRadius":"5px"}} alt="" src={refuse} />
                              </button>
                            : <img width="30px" style={{"borderRadius":"5px"}} alt="" src={refuseDisabled} />}</td>
                    </tr>

        });
        return  <table>
                    <thead>
                        <tr>
                            <th>Host Club Representative</th>
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
                        {data}
                    </tbody>
                </table>
    }

    const viewMyClub = () => {
        const data = myClub.map((club) => {
            return  <tr key={club.id}>
                        <td>{club.id}</td>
                        <td>{club.name}</td>
                        <td>{club.LOCATION.toUpperCase()}</td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
    }

    const viewMatchesForClub = () => {
        const data = myUpcomingMatches.map((match) => {
            return  <tr key = {`${match.club}, ${match.competent}, ${match.startTime}`}>
                        <td>{match.club}</td>
                        <td>{match.competent}</td>
                        <td>{match.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{match.endTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{match.name?match.name:<img width="49px" alt="" src={request}/>}</td>
                    </tr>
        });
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
                        {data}
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
        const data = myTickets.map((ticket) => {
            return  <tr key = {ticket.id}>
                        <td>{ticket.id}</td>
                        <td>{ticket.host}</td>
                        <td>{ticket.guest}</td>
                        <td>{ticket.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{ticket.endTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{ticket.name}</td>
                        <td>{ticket.location.toUpperCase()}</td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Host Club</th>
                            <th>Guest Club</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Stadium</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
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
            return viewMatchesForClub();
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