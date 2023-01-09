import plus from "../../assets/icons/actions/plus.png"
import minus from "../../assets/icons/actions/minus.png"
import block from "../../assets/icons/actions/block.png"
import unblock from "../../assets/icons/actions/unblock.png"
// import accept from "../../assets/icons/actions/accept.png"
// import refuse from "../../assets/icons/actions/refuse.png"
import open from "../../assets/icons/actions/open.png"
import close from "../../assets/icons/actions/close.png"
import { useState } from "react"

const Manipulate = props => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [nat_id, setNat_id] = useState("");
    const [host, setHost] = useState("");
    const [guest, setGuest] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const clear = () => { 
        setName("");
        setLocation("");
        setCapacity(0);
        setNat_id("");
    }; 

    const clickAddStadium = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/addStadium`, {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name}.name.toString(),
                location: {location}.location.toString(),
                capacity: parseInt({capacity}.capacity)
            })
        })
        .then(res => res.json())
    }
    const addStadium = () => {
        return <form  method="POST" action="/addStadium" onSubmit={clickAddStadium}>
                    <div className="newEntry">
                    <div className="newEntryField">
                        <p>Add a new Stadium</p>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "Name" 
                            autoComplete="off"
                            onChange={(e) => {setName(e.target.value)}}
                        />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="location" 
                                placeholder= "Location"
                                autoComplete="off"
                                onChange={(e) => {setLocation(e.target.value)}}
                            />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="number" 
                                placeholder= "Capacity"
                                autoComplete="off"
                                onChange={(e) => {setCapacity(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button type="submit" className="actionButton">
                        <img className="actionIcon" src={plus} alt="alternative text" title="Add Stadium" />
                    </button>
                </div></form>
    }

    const clickDelStadium = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/delStadium`, {
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
        .then(clear());
    }
    const deleteStadium = () => {
        return <form  method="POST" action="/delStadium" onSubmit={clickDelStadium}>
                <div className="newEntry">
                    <div className="newEntryField">
                        <p>Delete a Stadium</p>
                        <div className="newEntryInput">
                            <input 
                                type="text" 
                                placeholder= "Name"
                                autoComplete="off"
                                onChange={(e) => {setName(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button type="submit" className="actionButton"><img className="actionIcon" src={minus} alt="alternative text" title="Delete Stadium" /></button>
                </div></form>
    }

    const clickAddClub = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/addClub`, {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name}.name,
                location: {location}.location
            })
        })
        .then(res => res.json())
    }
    const addClub = () => {
        return <form method="POST" action="/addClub" onSubmit={clickAddClub}><div className="newEntry">
                    <div className="newEntryField">
                        <p>Add a new Club</p>
                        <div className="newEntryInput">
                        <input
                            type="text" 
                            placeholder= "Name" 
                            autoComplete="off"
                            onChange={(e) => {setName(e.target.value)}}
                        />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="location" 
                                placeholder= "Location" 
                                autoComplete="off"
                                onChange={(e) => {setLocation(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button type="submit" className="actionButton"><img className="actionIcon" src={plus} alt="alternative text" title="Add Club" /></button>
                </div></form>
    }

    const clickDelClub = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/delClub`, {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name}.name.toString()
            })
        })
        .then(res => res.json())
    }
    const deleteClub = () => {
        return <form method="POST" action="/delClub" onSubmit={clickDelClub}>
                    <div className="newEntry">
                    <div className="newEntryField">
                        <p>Delete a Club</p>
                        <div className="newEntryInput">
                            <input 
                                type="text" 
                                placeholder= "Name" 
                                autoComplete="off"
                                onChange={(e) => {setName(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button type="submit" className="actionButton"><img className="actionIcon" src={minus} alt="alternative text" title="Delete Club" /></button>
                </div></form>
    }

    const clickBlockFan = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/blockFan`, {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                nat_id: {nat_id}.nat_id.toString()
            })
        })
        .then(res => res.json())
    }
    const blockFan = () => {
        return  <form action="/blockFan" method="POST" onSubmit={clickBlockFan}>
                    <div className="newEntry">
                    <div className="newEntryField">
                        <p>Block a Fan</p>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "National ID" 
                            autoComplete="off"
                            onChange={(e) => {setNat_id(e.target.value)}}
                        />
                        </div>
                    </div>
                    <button type="submit" className="actionButton"><img className="actionIcon" src={block} alt="alternative text" title="Block Fan" /></button>
                </div></form>
    }

    const clickUnblockFan = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/unblockFan`, {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                nat_id: {nat_id}.nat_id.toString()
            })
        })
        .then(res => res.json())
    }
    const unblockFan = () => {
        return  <form method="POST" action="/unblockFan" onSubmit={clickUnblockFan}>
                    <div className="newEntry">
                    <div className="newEntryField">
                        <p>Unblock a Fan</p>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "National ID" 
                            autoComplete="off"
                            onChange={(e) => {setNat_id(e.target.value)}}
                        />
                        </div>
                    </div>
                    <button type="submit" className="actionButton"><img className="actionIcon" src={unblock} alt="alternative text" title="Unblock Fan" /></button>
                </div>
                </form>
    }

    const clickAddMatch = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/newMatch`, {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                host: {host}.host,
                guest: {guest}.guest,
                startTime: {startTime}.startTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', ''),
                endTime: {endTime}.endTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', ''),
            })
        })
        .then(res => res.json())
    }
    const addMatch = () => {
        return <form method="POST" action="/newMatch" onSubmit={clickAddMatch}>
                    <div className="newEntry">
                    <div className="newEntryField">
                        <p>Add new Match</p>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "Host Club" 
                            autoComplete="off"
                            onChange={(e) => {setHost(e.target.value)}}
                        />
                        </div>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "Guest Club" 
                            autoComplete="off"
                            onChange={(e) => {setGuest(e.target.value)}}
                        />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="datetime-local" 
                                placeholder= "Start Time" 
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                }}
                            />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="datetime-local" 
                                placeholder= "End Time" 
                                autoComplete="off"
                                onChange={(e) => {setEndTime(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button type="submit" className="actionButton"><img className="actionIcon" src={plus} alt="alternative text" title="Add Match" /></button>
                </div>
                </form>
    }

    const clickDelMatch = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/delMatch`, {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                host: {host}.host,
                guest: {guest}.guest,
                startTime: {startTime}.startTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', ''),
                endTime: {endTime}.endTime.replaceAll('-', '').replaceAll(':', '').replaceAll('T', ''),
            })
        })
        .then(res => res.json())
    }
    const deleteMatch = () => {
        return <form method="POST" action="/delMatch" onSubmit={clickDelMatch}>
                    <div className="newEntry">
                    <div className="newEntryField">
                        <p>Delete a Match</p>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "Host Club" 
                            autoComplete="off"
                            onChange={(e) => {setHost(e.target.value)}}
                        />
                        </div>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "Guest Club" 
                            autoComplete="off"
                            onChange={(e) => {setGuest(e.target.value)}}
                        />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="datetime-local" 
                                placeholder= "Start Time" 
                                autoComplete="off"
                                onChange={(e) => {setStartTime(e.target.value)}}
                            />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="datetime-local" 
                                placeholder= "End Time" 
                                autoComplete="off"
                                onChange={(e) => {setEndTime(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button type="submit" className="actionButton"><img className="actionIcon" src={minus} alt="alternative text" title="Delete Match" /></button>
                </div>
                </form>
    }

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
                name: {props}.props.stadium
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
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {props}.props.stadium
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