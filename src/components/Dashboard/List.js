import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import open from "../../assets/icons/actions/open.png"
import close from "../../assets/icons/actions/close.png"
import request from "../../assets/icons/actions/request.png"
import requestDisabled from "../../assets/icons/actions/request-disabled.png"
import { UserContext } from '../../UserContext';
import accept from "../../assets/icons/actions/accept.png"
import acceptDisabled from "../../assets/icons/actions/accept-disabled.png"
import reject from "../../assets/icons/actions/reject.png"
import rejectDisabled from "../../assets/icons/actions/reject-disabled.png"
import tct from "../../assets/icons/actions/tct.png"
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import DropdownButton from 'antd/es/dropdown/dropdown-button';
import { Dropdown, Select } from 'antd';
import error from "../../assets/icons/actions/error.png"
import success from "../../assets/icons/actions/success.png"

const StyledModal = Modal.styled`
  width: 65rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #22303c;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;
function FancyModalButton(props) {
    const [selectedStadium, setSelectedStadium] = useState("Choose a Stadium");

    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    useEffect(() => {
        setSuccessMsg("");
        setErrMsg("");
    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);
    function toggleModal(e) {
      setOpacity(0);
      setIsOpen(!isOpen);
    }
    function afterOpen() {
      setTimeout(() => {
        setOpacity(1);
      }, 100);
    }
    function beforeClose() {
      return new Promise((resolve) => {
        setOpacity(0);
        setTimeout(resolve, 300);
      });
    }
    const data = props.availableStadiums.availableStadiums.map((stadium) => {
        return {"value": stadium.sm_id, "label": stadium.name}
    });

    const clickAddHostRequest = async (e) => {
        e.preventDefault();
        if (selectedStadium != "Choose a Stadium") {
            console.log(selectedStadium)
            await fetch(`http://localhost:5000/addHostRequest`, {
                method: 'POST', 
                url: 'http://localhost:5000',
                header : {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    cr_id: parseInt({props}.props.cr_id),
                    sm_id: parseInt({selectedStadium}.selectedStadium),
                    m_id: parseInt({props}.props.m_id)
                })
            })
            .then(res => res.json())
            .then(setSuccessMsg(`A request to host your match on the stadium ${{props}.props.name} has been sent.`))
            .then(setErrMsg(""))
        }
    }

    return (
      <div>
        <button  style={{backgroundColor: "transparent", cursor:"pointer"}} onClick={toggleModal}><img width="50px" src={request} alt="alternative text" style={{backgroundColor: "transparent"}} title="Send a host request" /> </button>
        <StyledModal isOpen={isOpen} afterOpen={afterOpen} beforeClose={beforeClose} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal} opacity={opacity} backgroundProps={{ opacity }}>
            <div style={{display: "flex", textAlign:"center", flexDirection:"column", gap:"20px"}}>
                <div style={{color:'white'}}>
                <h2>Choose a Stadium to Send a Request to Host Your Match on it</h2>
                <h3>{props.host.toString().toUpperCase()} VS {props.guest.toString().toUpperCase()}  { }
                    AT {props.startTime.substring(11,13)}:{props.startTime.substring(14,16)} { }
                    ON {props.startTime.substring(8,10)}/{props.startTime.substring(5,7)}/{props.startTime.substring(0,4)}
                </h3>
                </div>
                <Select value={selectedStadium} onChange={(value) => {setSelectedStadium(value)}} size="large" style={{width: "30%", alignSelf:"center"}} options= {data}/>
            </div>
            <div style={{display: "flex", textAlign:"center", flexDirection:"column", gap:"20px"}}>
                <button style={{justifySelf:"center", alignSelf:"center"}} onClick={clickAddHostRequest} className="sendRequestButton">Send Request</button>
                <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px'/>{' '} {successMsg}</p>
                <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px'/>{' '} {errMsg}</p>
            </div>
        </StyledModal>
      </div>
    );
  }
  const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;



const List = props => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const [selectTime, setSelectTime] = useState((new Date()).toISOString().replace('T', ' ').substring(0,19));


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

    const [availableStadiums, setAvailableStadiums] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/availableStadiumsOn', {date: selectTime}, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
        .then(res => setAvailableStadiums(res.data))
    }, [availableStadiums]);

    const [matchesOnStadium, setMatchesOnStadium] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/viewMatchesOnStadium', {username: loggedInUser}, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
        .then(res => setMatchesOnStadium(res.data))
    }, [matchesOnStadium]);

    const [availableTickets, setAvailableTickets] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:5000/viewAvailableTickets', {username: {loggedInUser}.loggedInUser}, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
        .then(res => setAvailableTickets(res.data))
    }, [availableTickets]);

    const [clubRepresentatives, setClubRepresentatives] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/getClubRepresentatives').then(res => setClubRepresentatives(res.data))
    }, []);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/getUsers').then(res => setUsers(res.data))
    }, [users]);



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
            return  <tr key={stadium.name} className="fade-in">
                        <td>{stadium.name}</td>
                        <td>{stadium.location.toUpperCase()}</td>
                        <td>{stadium.capacity}</td>
                        <td>{stadium.status?'Available':'Unavailable'}</td>
                        <td>{stadium.status
                            ?<form onSubmit={closeStadium}><button type="submit" style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={close} alt="alternative text" title="Set stadium as unavailable" /></button></form>
                            :<form onSubmit={openStadium}><button type="submit" style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={open} alt="alternative text" title="Set stadium as available" /></button></form>}
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
            return  <tr key={club.name} className="fade-in">
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
            return  <tr key={fan.national_id} className="fade-in">
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

    const viewUsers = () => {
        const data = users.map((user) => {
            return  <tr key={user.username} className="fade-in">
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{
                            user.type === 0 ? 'admin' 
                            : user.type === 1 ? 'fan' 
                            : user.type === 2 ? 'sports association manager'
                            : user.type === 3 ? 'club reprsentative'
                            : 'stadium manager'}
                        </td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Account Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
    }

    const viewMatches = () => {
        const data = allMatches.map((match) => {
            return  <tr key={`${match.host}, ${match.guest}, ${match.startTime}`} className="fade-in">
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
            return  <tr key={`${match.host}, ${match.guest}, ${match.startTime}`} className="fade-in">
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
            return  <tr key = {`${match.host}, ${match.guest}, ${match.startTime}`} className="fade-in">
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
            return  <tr key = {`${entry.name1}, ${entry.name2}`} className="fade-in">
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
            return  <tr key = {stadium.id} className="fade-in">
                        <td>{stadium.id}</td>
                        <td>{stadium.name}</td>
                        <td>{stadium.location.toUpperCase()}</td>
                        <td>{stadium.capacity}</td>
                        <td>{stadium.status?'Available':'Unavailable'}</td>
                        <td>{stadium.status
                            ?<button onClick={closeMyStadium} style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={close} alt="alternative text" title="Set Stadium as Unavailable" /></button>
                            :<button onClick={openMyStadium} style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}><img width="25px" src={open} alt="alternative text" title="Set Stadium as Available" /></button>}
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
        var i = 0;
        const data = myRequests.map((request) => {
            i++;
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
            return  <tr key={`${i}`} className="fade-in">
                        <td>{request.clubRepresentative}</td>
                        <td>{request.name}</td>
                        <td>{request.guestClub}</td>
                        <td>{request.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{request.endTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{request.status}</td>
                        <td>{request.status === "unhandled" 
                            ? <button onClick={acceptRequest} style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}>
                                <img width="30px" style={{"borderRadius":"5px"}} alt="alternative text" title="Accept this host request" src={accept} />
                              </button>
                            : <img width="30px" style={{"borderRadius":"5px"}} alt="alternative text" title={"You already responded\n to this request"} src={acceptDisabled} />}</td>
                        <td>{request.status === "unhandled" 
                            ? <button onClick={rejectRequest} style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'0'}}>
                                <img width="30px" style={{"borderRadius":"5px"}} src={reject} alt="alternative text" title="Reject this host request" />
                              </button>
                            : <img width="30px" style={{"borderRadius":"5px"}} alt="alternative text" title={"You already responded\n to this request"} src={rejectDisabled} />}</td>
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
                            <th className="actionColumn">Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
    }

    const viewMatchesOnStadium = () => {
        var i = 0;
        const data = matchesOnStadium.map((match) => {
            i++;
            return  <tr key={match.id} className="fade-in">
                        <td>{match.id}</td>
                        <td>{match.clubRepresentative}</td>
                        <td>{match.name}</td>
                        <td>{match.guestClub}</td>
                        <td>{match.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>{match.endTime.replace('T', ' ').substring(0,16)}</td>
                    </tr>
        });
        return  <table>
                    <thead>
                        <tr>
                            <th>Match ID</th>
                            <th>Host Club Representative</th>
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

    const viewMyClub = () => {
        const data = myClub.map((club) => {
            return  <tr key={club.id} className="fade-in">
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
            var isHost = false;
            clubRepresentatives.forEach(cr => {
                if (cr.name == match.club && cr.username == loggedInUser) 
                    isHost = true;
            });
            return  <ModalProvider>
                        <tr key = {`${match.club}, ${match.competent}, ${match.startTime}`} className="fade-in">
                            <td>{match.club}</td>
                            <td>{match.competent}</td>
                            <td>{match.startTime.replace('T', ' ').substring(0,16)}</td>
                            <td>{match.endTime.replace('T', ' ').substring(0,16)}</td>
                            <td>{match.name 
                                ? match.name 
                                : isHost 
                                ? <button style={{backgroundColor: "transparent"}} onClick={(e) =>{e.preventDefault(); setSelectTime({match}.match.startTime.replace('Z', '').replace('T', '').substring(0,19))}}><FancyModalButton
                                    host = {{match}.match.club} 
                                    guest = {{match}.match.competent} 
                                    startTime = {{match}.match.startTime} 
                                    availableStadiums = {{availableStadiums}}
                                    sm_username = {{loggedInUser}.loggedInUser}
                                    cr_id = {{match}.match.cr_id}
                                    m_id = {{match}.match.m_id}
                                /></button>
                                : <img style={{cursor: 'not-allowed'}}width="50px" src={requestDisabled}  alt="alternative text" title={"You are not the hosting club,\n cannot send a host request"} />}
                            </td>
                        </tr>
                    </ModalProvider>
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
        const data = availableStadiums.map((stadium) => {
            return  <tr key = {stadium.id} className="fade-in">
                        <td>{stadium.name}</td>
                        <td>{stadium.location}</td>
                        <td>{stadium.capacity}</td>
                    </tr>
        });
        return  <>
                    <div className="newEntry">
                        <p>Select Your Match's Start Time</p>
                        <input className="choose" type="datetime-local" value={selectTime} onChange={(e) => {setSelectTime(e.target.value.replace('T', ' ').substring(0,19))}} />
                    </div>
                    
                    <table>
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
                </>
    }

    const viewMyTickets = () => {
        const data = myTickets.map((ticket) => {
            return  <tr key = {ticket.id} className="fade-in">
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
                            <th>Ticket ID</th>
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
        const data = availableTickets.map((ticket) => {
            const purchaseTicket = async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:5000/purchaseTicket`, {
                    method: 'POST', 
                    url: 'http://localhost:5000',
                    header : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        username: {loggedInUser}.loggedInUser,
                        id: {ticket}.ticket.id,
                    })
                })
                .then(res => res.json())
            }
            return  <tr key={ticket.id} className="fade-in">
                        <td>{ticket.host}</td>
                        <td>{ticket.guest}</td>
                        <td>{ticket.stadium}</td>
                        <td>{ticket.location.toUpperCase()}</td>
                        <td>{ticket.startTime.replace('T', ' ').substring(0,16)}</td>
                        <td>
                            <form onSubmit={purchaseTicket}>
                                <button type="submit" style={{backgroundColor: 'transparent', cursor: 'pointer', padding:'0', margin:'auto'}}>
                                    <img width="30px" src={tct} alt="alternative text" title="Purchase ticket" />
                                </button>
                            </form>
                        </td>

                    </tr>
        });
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
                        {data}
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
        case "users":
            return viewUsers();
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
        case "matchesOnStadium":
            return viewMatchesOnStadium();
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