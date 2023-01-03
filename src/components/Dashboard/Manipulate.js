import plus from "../../assets/icons/actions/plus.png"
import minus from "../../assets/icons/actions/minus.png"
import block from "../../assets/icons/actions/block.png"
import unblock from "../../assets/icons/actions/unblock.png"
import accept from "../../assets/icons/actions/accept.png"
import refuse from "../../assets/icons/actions/refuse.png"
import open from "../../assets/icons/actions/open.png"
import close from "../../assets/icons/actions/close.png"
import { useState } from "react"

const Manipulate = props => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [nat_id, setNat_id] = useState("");

    const clickAddStadium = async (e) => {
        e.preventDefault();
        const newData = await fetch(`http://localhost:5000/addStadium`, {
            method: 'POST', 
            url: 'http://localhost:5000',
            header : {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: {name}.name,
                location: {location}.location,
                capacity: {capacity}.capacity
            })
        })
        .then(res => console.log(res.json()))
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
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="location" 
                                placeholder= "Location"
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                            />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="number" 
                                placeholder= "Capacity"
                                onChange={(e) => {
                                    setCapacity(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <button type="submit" className="actionButton">
                        <img className="actionIcon" src={plus} alt="plus-sign" />
                    </button>
                </div></form>
    }

    const deleteStadium = () => {
        return <div className="newEntry">
                    <div className="newEntryField">
                        <p>Delete a Stadium</p>
                        <div className="newEntryInput">
                            <input 
                                type="text" 
                                placeholder= "Name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={minus} alt="plus-sign" /></button>
                </div>
    }

    const addClub = () => {
        return <div className="newEntry">
                    <div className="newEntryField">
                        <p>Add a new Club</p>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "Name" 
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        </div>
                        <div className="newEntryInput">
                            <input 
                                type="location" 
                                placeholder= "Location" 
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={plus} alt="plus-sign" /></button>
                </div>
    }

    const deleteClub = () => {
        return <div className="newEntry">
                    <div className="newEntryField">
                        <p>Delete a Club</p>
                        <div className="newEntryInput">
                            <input 
                                type="text" 
                                placeholder= "Name" 
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={minus} alt="minus-sign" /></button>
                </div>
    }

    const blockFan = () => {
        return  <div className="newEntry">
                    <div className="newEntryField">
                        <p>Block a Fan</p>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "National ID" 
                            onChange={(e) => {
                                setNat_id(e.target.value);
                            }}
                        />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={block} alt="plus-sign" /></button>
                </div>
    }

    const unblockFan = () => {
        return  <div className="newEntry">
                    <div className="newEntryField">
                        <p>Unblock a Fan</p>
                        <div className="newEntryInput">
                        <input 
                            type="text" 
                            placeholder= "National ID" 
                            onChange={(e) => {
                                setNat_id(e.target.value);
                            }}
                        />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={unblock} alt="plus-sign" /></button>
                </div>
    }

    const addMatch = () => {
        return <div className="newEntry">
                    <div className="newEntryField">
                        <p>Add new Match</p>
                        <div className="newEntryInput">
                        <input type="text" placeholder= "Host Club" />
                        </div>
                        <div className="newEntryInput">
                        <input type="text" placeholder= "Guest Club" />
                        </div>
                        <div className="newEntryInput">
                            <input type="datetime-local" placeholder= "Start Time" />
                        </div>
                        <div className="newEntryInput">
                            <input type="datetime-local" placeholder= "End Time" />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={plus} alt="plus-sign" /></button>
                </div>
    }

    const deleteMatch = () => {
        return <div className="newEntry">
                    <div className="newEntryField">
                        <p>Delete a Match</p>
                        <div className="newEntryInput">
                        <input type="text" placeholder= "Host Club" />
                        </div>
                        <div className="newEntryInput">
                        <input type="text" placeholder= "Guest Club" />
                        </div>
                        <div className="newEntryInput">
                            <input type="datetime-local" placeholder= "Start Time" />
                        </div>
                        <div className="newEntryInput">
                            <input type="datetime-local" placeholder= "End Time" />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={minus} alt="minus-sign" /></button>
                </div>
    }

    const openStadium = () => {
        return <div className="newEntry">
                    <div className="newEntryField">
                        <p>Set Stadium as Available</p>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={open} alt="minus-sign" /></button>
                </div>
    }

    const closeStadium = () => {
        return <div className="newEntry">
                    <div className="newEntryField">
                        <p>Set Stadium as Unavailable</p>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={close} alt="minus-sign" /></button>
                </div>
    }

    if (props.object=="stadiums" && props.action=="add")
        return addStadium();
    else if (props.object=="stadiums" && props.action=="delete")
        return deleteStadium();
    else if (props.object=="clubs" && props.action=="add")
        return addClub();
    else if (props.object=="clubs" && props.action=="delete")
        return deleteClub();
    else if (props.object=="fans" && props.action=="delete")
        return blockFan();
    else if (props.object=="fans" && props.action=="add")
        return unblockFan();
    else if (props.object=="matches" && props.action=="delete")
        return deleteMatch();
    else if (props.object=="matches" && props.action=="add")
        return addMatch();
    else if (props.object=="myStadium" && props.action=="add")
        return openStadium();
    else if (props.object=="myStadium" && props.action=="delete")
        return closeStadium();
    
    
}

export default Manipulate;