import axios, * as others from 'axios';
import plus from "../../assets/icons/actions/plus.png"
import minus from "../../assets/icons/actions/minus.png"
import block from "../../assets/icons/actions/block.png"
import unblock from "../../assets/icons/actions/unblock.png"
import open from "../../assets/icons/actions/open.png"
import close from "../../assets/icons/actions/close.png"
import { useState, useEffect } from "react"
import error from "../../assets/icons/actions/error.png"
import success from "../../assets/icons/actions/success.png"

const Manipulate = props => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [nat_id, setNat_id] = useState("");
    const [host, setHost] = useState("");
    const [guest, setGuest] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        setSuccessMsg("");
        setErrMsg("");
    }, [props.action, props.object])

    useEffect(() => {
        if (successMsg != "") {
            const timer = setTimeout(() => {
                setSuccessMsg("");
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (errMsg != "") {
            const timer = setTimeout(() => {
                setErrMsg("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg, errMsg]);

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

    const clickAddStadium = async (e) => {
        e.preventDefault();
        var existingStadium = false;
        stadiums.forEach(stadium => {
            console.log(stadium)
            if (stadium.name === name) {
                console.log(stadium.name === name)
                existingStadium = true;
            }
        })
        if (existingStadium) { setErrMsg("This stadium name already exists."); setSuccessMsg("") }
        else {
            e.preventDefault();
            await fetch(`http://localhost:5000/addStadium`, {
                method: 'POST',
                url: 'http://localhost:5000',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: { name }.name.toString(),
                    location: { location }.location.toString(),
                    capacity: parseInt({ capacity }.capacity)
                })
            })
                .then(res => res.json())
                .then(setSuccessMsg(`The stadium "${name}" has been added.`))
                .then(setName(""))
                .then(setLocation(""))
                .then(setCapacity(""))
                .then(setErrMsg(""))
        }
    }
    const addStadium = () => {
        return <><form method="POST" action="/addStadium" onSubmit={clickAddStadium}>
            <div className="newEntry">
                <div className="newEntryField">
                    <p>Add a new Stadium</p>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            autoComplete="off"
                            onChange={(e) => { setName(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                    <div className="newEntryInput">
                        <input
                            type="location"
                            value={location}
                            placeholder="Location"
                            autoComplete="off"
                            onChange={(e) => { setLocation(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                    <div className="newEntryInput">
                        <input
                            type="number"
                            value={capacity}
                            placeholder="Capacity"
                            autoComplete="off"
                            onChange={(e) => { setCapacity(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                </div>
                <button type="submit" className="actionButton">
                    <img className="actionIcon" src={plus} alt="alternative text" title="Add Stadium" />
                </button>
            </div></form>
            <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px' />{' '} {successMsg}</p>
            <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px' />{' '} {errMsg}</p>
        </>
    }

    const clickDelStadium = async (e) => {
        e.preventDefault();
        var existingStadium = false;
        stadiums.forEach(stadium => {
            if (stadium.name === name) {
                existingStadium = true;
            }
        })
        if (!existingStadium) { setErrMsg(`"${name}" is not a stadium.`) }
        else {
            await fetch(`http://localhost:5000/delStadium`, {
                method: 'POST',
                url: 'http://localhost:5000',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: { name }.name
                })
            })
                .then(res => res.json())
                .then(setSuccessMsg(`The stadium "${name}" has been deleted.`))
                .then(setName(""))
                .then(setErrMsg(""))
        }
    }
    const deleteStadium = () => {
        return <><form method="POST" action="/delStadium" onSubmit={clickDelStadium}>
            <div className="newEntry">
                <div className="newEntryField">
                    <p>Delete a Stadium</p>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            autoComplete="off"
                            onChange={(e) => { setName(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                </div>
                <button type="submit" className="actionButton"><img className="actionIcon" src={minus} alt="alternative text" title="Delete Stadium" /></button>
            </div></form>
            <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px' />{' '} {successMsg}</p>
            <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px' />{' '} {errMsg}</p>
        </>
    }

    const clickAddClub = async (e) => {
        e.preventDefault();
        var existingClub = false;
        clubs.forEach(club => {
            if (club.name === name) {
                console.log(club.name === name)
                existingClub = true;
            }
        })
        if (existingClub) { setErrMsg("This club name already exists."); setSuccessMsg("") }
        else {
            await fetch(`http://localhost:5000/addClub`, {
                method: 'POST',
                url: 'http://localhost:5000',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: { name }.name,
                    location: { location }.location
                })
            })
                .then(res => res.json())
                .then(setName(""))
                .then(setLocation(""))
                .then(setSuccessMsg(`The club "${name}" has been added`))
        }
    }
    const addClub = () => {
        return <><form method="POST" action="/addClub" onSubmit={clickAddClub}><div className="newEntry">
            <div className="newEntryField">
                <p>Add a new Club</p>
                <div className="newEntryInput">
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        autoComplete="off"
                        onChange={(e) => { setName(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                    />
                </div>
                <div className="newEntryInput">
                    <input
                        type="location"
                        value={location}
                        placeholder="Location"
                        autoComplete="off"
                        onChange={(e) => { setLocation(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                    />
                </div>
            </div>
            <button type="submit" className="actionButton"><img className="actionIcon" src={plus} alt="alternative text" title="Add Club" /></button>
        </div></form>
            <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px' />{' '} {successMsg}</p>
            <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px' />{' '} {errMsg}</p>
        </>
    }

    const clickDelClub = async (e) => {
        e.preventDefault();
        var existingClub = false;
        clubs.forEach(club => {
            if (club.name === name) {
                existingClub = true;
            }
        })
        if (!existingClub) { setErrMsg(`"${name}" is not a club.`); setSuccessMsg("") }
        else {
            await fetch(`http://localhost:5000/delClub`, {
                method: 'POST',
                url: 'http://localhost:5000',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: { name }.name.toString()
                })
            })
                .then(res => res.json())
                .then(setSuccessMsg(`The club "${name}" has been deleted.`))
                .then(setName(""))
                .then(setErrMsg(""))
        }
    }
    const deleteClub = () => {
        return <><form method="POST" action="/delClub" onSubmit={clickDelClub}>
            <div className="newEntry">
                <div className="newEntryField">
                    <p>Delete a Club</p>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            autoComplete="off"
                            onChange={(e) => { setName(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                </div>
                <button type="submit" className="actionButton"><img className="actionIcon" src={minus} alt="alternative text" title="Delete Club" /></button>
            </div></form>
            <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px' />{' '} {successMsg}</p>
            <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px' />{' '} {errMsg}</p>
        </>
    }

    const clickBlockFan = async (e) => {
        e.preventDefault();
        var existingFan = false;
        fans.forEach(fan => {
            if (fan.national_id === nat_id) {
                existingFan = true;
            }
        })
        if (!existingFan) { setErrMsg(`Fan with national id "${nat_id}" not found.`); setSuccessMsg("") }
        else {
            await fetch(`http://localhost:5000/blockFan`, {
                method: 'POST',
                url: 'http://localhost:5000',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nat_id: { nat_id }.nat_id.toString()
                })
            })
                .then(res => res.json())
                .then(setSuccessMsg(`The fan "${nat_id}" has been blocked`))
                .then(setNat_id(""))
                .then(setErrMsg(""))
        }
    }
    const blockFan = () => {
        return <><form action="/blockFan" method="POST" onSubmit={clickBlockFan}>
            <div className="newEntry">
                <div className="newEntryField">
                    <p>Block a Fan</p>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={nat_id}
                            placeholder="National ID"
                            autoComplete="off"
                            onChange={(e) => { setNat_id(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                </div>
                <button type="submit" className="actionButton"><img className="actionIcon" src={block} alt="alternative text" title="Block Fan" /></button>
            </div></form>
            <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px' />{' '} {successMsg}</p>
            <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px' />{' '} {errMsg}</p>
        </>
    }

    const clickUnblockFan = async (e) => {
        e.preventDefault();
        var existingFan = false;
        fans.forEach(fan => {
            if (fan.national_id === nat_id) {
                existingFan = true;
            }
        })
        if (!existingFan) { setErrMsg(`Fan with national id "${nat_id}" not found.`); setSuccessMsg("") }
        else {
            await fetch(`http://localhost:5000/unblockFan`, {
                method: 'POST',
                url: 'http://localhost:5000',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nat_id: { nat_id }.nat_id.toString()
                })
            })
                .then(res => res.json())
                .then(setSuccessMsg(`The fan "${nat_id}" has been unblocked`))
                .then(setNat_id(""))
                .then(setErrMsg(""))
        }
    }
    const unblockFan = () => {
        return <><form method="POST" action="/unblockFan" onSubmit={clickUnblockFan}>
            <div className="newEntry">
                <div className="newEntryField">
                    <p>Unblock a Fan</p>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={nat_id}
                            placeholder="National ID"
                            autoComplete="off"
                            onChange={(e) => { setNat_id(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                </div>
                <button type="submit" className="actionButton"><img className="actionIcon" src={unblock} alt="alternative text" title="Unblock Fan" /></button>
            </div>
        </form>
            <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px' />{' '} {successMsg}</p>
            <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px' />{' '} {errMsg}</p>
        </>
    }

    const clickAddMatch = async (e) => {
        e.preventDefault();
        var existingMatch = false;
        var existingHost = false;
        var existingGuest = false;
        console.log(allMatches)
        console.log(clubs)
        allMatches.forEach(match => {
            if (match.host === host && match.guest === guest
                && match.startTime.toString().replaceAll('T', '').replaceAll('-', '').replaceAll(':', '').replaceAll('Z', '').replaceAll('.', '').substring(0, 12)
                === startTime.toString().replaceAll('T', '').replaceAll('-', '').replaceAll(':', '').replaceAll('Z', '').replaceAll('.', '').substring(0, 12)
                && match.endTime.toString().replaceAll('T', '').replaceAll('-', '').replaceAll(':', '').replaceAll('Z', '').replaceAll('.', '').substring(0, 12)
                === endTime.toString().replaceAll('T', '').replaceAll('-', '').replaceAll(':', '').replaceAll('Z', '').replaceAll('.', '').substring(0, 12)) {
                existingMatch = true;
            }
        })
        clubs.forEach(club => {
            if (club.name === host)
                existingHost = true;
            if (club.name === guest)
                existingGuest = true;
        });
        if (existingMatch) { setErrMsg(`This match already exists.`); setSuccessMsg("") }
        else if (!existingHost) { setErrMsg(`The host club "${host}" does not exist.`); setSuccessMsg("") }
        else if (!existingGuest) { setErrMsg(`The guest club "${guest} does not exist."`); setSuccessMsg("") }
        else {
            await fetch(`http://localhost:5000/newMatch`, {
                method: 'POST',
                url: 'http://localhost:5000',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    host: { host }.host,
                    guest: { guest }.guest,
                    startTime: { startTime }.startTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', ''),
                    endTime: { endTime }.endTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', ''),
                })
            })
                .then(res => res.json())
                .then(setSuccessMsg(`A new "${host}" VS "${guest}" match has been added.`))
                .then(setHost(""))
                .then(setGuest(""))
                .then(setStartTime(""))
                .then(setEndTime(""))
                .then(setErrMsg(""))
        }
    }
    const addMatch = () => {
        return <><form method="POST" action="/newMatch" onSubmit={clickAddMatch}>
            <div className="newEntry">
                <div className="newEntryField">
                    <p>Add new Match</p>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={host}
                            placeholder="Host Club"
                            autoComplete="off"
                            onChange={(e) => { setHost(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={guest}
                            placeholder="Guest Club"
                            autoComplete="off"
                            onChange={(e) => { setGuest(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                    <div className="newEntryInput">
                        <input
                            type="datetime-local"
                            value={startTime}
                            placeholder="Start Time"
                            onChange={(e) => { setStartTime(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                    <div className="newEntryInput">
                        <input
                            type="datetime-local"
                            value={endTime}
                            placeholder="End Time"
                            autoComplete="off"
                            onChange={(e) => { setEndTime(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                </div>
                <button type="submit" className="actionButton"><img className="actionIcon" src={plus} alt="alternative text" title="Add Match" /></button>
            </div>
        </form>
            <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px' />{' '} {successMsg}</p>
            <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px' />{' '} {errMsg}</p>
        </>
    }

    const clickDelMatch = async (e) => {
        e.preventDefault();
        var existingMatch = false;
        var existingHost = false;
        var existingGuest = false;
        allMatches.forEach(match => {
            if (match.host === host && match.guest === guest
                && match.startTime.toString().replaceAll('T', '').replaceAll('-', '').replaceAll(':', '').replaceAll('Z', '').replaceAll('.', '').substring(0, 12)
                === startTime.toString().replaceAll('T', '').replaceAll('-', '').replaceAll(':', '').replaceAll('Z', '').replaceAll('.', '').substring(0, 12)
                && match.endTime.toString().replaceAll('T', '').replaceAll('-', '').replaceAll(':', '').replaceAll('Z', '').replaceAll('.', '').substring(0, 12)
                === endTime.toString().replaceAll('T', '').replaceAll('-', '').replaceAll(':', '').replaceAll('Z', '').replaceAll('.', '').substring(0, 12)) {
                existingMatch = true;
            }
        })
        clubs.forEach(club => {
            if (club.name === host)
                existingHost = true;
            if (club.name === guest)
                existingGuest = true;
        });
        if (!existingHost) { setErrMsg(`The host club "${host}" does not exist.`); setSuccessMsg("") }
        else if (!existingGuest) { setErrMsg(`The guest club "${guest} does not exist."`); setSuccessMsg("") }
        else if (!existingMatch) { setErrMsg(`The match does not exist.`); setSuccessMsg("") }
        else {
            await fetch(`http://localhost:5000/delMatch`, {
                method: 'POST',
                url: 'http://localhost:5000',
                header: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    host: { host }.host,
                    guest: { guest }.guest,
                    startTime: { startTime }.startTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', ''),
                    endTime: { endTime }.endTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', ''),
                })
            })
                .then(res => res.json())
                .then(setSuccessMsg(`A "${host}" VS "${guest}" match has been deleted.`))
                .then(setHost(""))
                .then(setGuest(""))
                .then(setStartTime(""))
                .then(setEndTime(""))
                .then(setErrMsg(""))
        }
    }
    const deleteMatch = () => {
        return <><form method="POST" action="/delMatch" onSubmit={clickDelMatch}>
            <div className="newEntry">
                <div className="newEntryField">
                    <p>Delete a Match</p>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={host}
                            placeholder="Host Club"
                            autoComplete="off"
                            onChange={(e) => { setHost(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                    <div className="newEntryInput">
                        <input
                            type="text"
                            value={guest}
                            placeholder="Guest Club"
                            autoComplete="off"
                            onChange={(e) => { setGuest(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                    <div className="newEntryInput">
                        <input
                            type="datetime-local"
                            value={startTime}
                            placeholder="Start Time"
                            autoComplete="off"
                            onChange={(e) => { setStartTime(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                    <div className="newEntryInput">
                        <input
                            type="datetime-local"
                            value={endTime}
                            placeholder="End Time"
                            autoComplete="off"
                            onChange={(e) => { setEndTime(e.target.value); setSuccessMsg(""); setErrMsg(""); }}
                        />
                    </div>
                </div>
                <button type="submit" className="actionButton"><img className="actionIcon" src={minus} alt="alternative text" title="Delete Match" /></button>
            </div>
        </form>
            <p className={successMsg ? "successMsg" : "offscreen"}><img src={success} width='10px' />{' '} {successMsg}</p>
            <p className={errMsg ? "errMsg" : "offscreen"}> <img src={error} width='10px' />{' '} {errMsg}</p>
        </>
    }

    const openStadium = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/openStadium`, {
            method: 'POST',
            url: 'http://localhost:5000',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: { props }.props.stadium
            })
        })
            .then(res => res.json())
        return <div className="newEntry">
            <div className="newEntryField">
                <p>Set Stadium as Available</p>
            </div>
            <button className="actionButton"><img className="actionIcon" src={open} alt="alternative text" title="Set Stadium as Available" /></button>
        </div>
    }

    const closeStadium = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/closeStadium`, {
            method: 'POST',
            url: 'http://localhost:5000',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: { props }.props.stadium
            })
        })
            .then(res => res.json())
        return <div className="newEntry">
            <div className="newEntryField">
                <p>Set Stadium as Unavailable</p>
            </div>
            <button className="actionButton"><img className="actionIcon" src={close} alt="alternative text" title="Set Stadium as Unavailable" /></button>
        </div>
    }

    if (props.object === "stadiums" && props.action === "add")
        return addStadium();
    else if (props.object === "stadiums" && props.action === "delete")
        return deleteStadium();
    else if (props.object === "clubs" && props.action === "add")
        return addClub();
    else if (props.object === "clubs" && props.action === "delete")
        return deleteClub();
    else if (props.object === "fans" && props.action === "delete")
        return blockFan();
    else if (props.object === "fans" && props.action === "add")
        return unblockFan();
    else if (props.object === "matches" && props.action === "delete")
        return deleteMatch();
    else if (props.object === "matches" && props.action === "add")
        return addMatch();
    else if (props.object === "myStadium" && props.action === "add")
        return openStadium();
    else if (props.object === "myStadium" && props.action === "delete")
        return closeStadium();
}

export default Manipulate;