import plus from "../../assets/icons/actions/plus.png"

const Add = props => {
    const newStadiumForm = () => {
        return <div className="newEntry">
                    <div className="newEntryField">
                        <p>Create a new Stadium</p>
                        <div className="newEntryInput">
                            <input type="text" placeholder= "Stadium Name" />
                        </div>
                        <div className="newEntryInput">
                            <input type="location" placeholder= "Location" />
                        </div>
                        <div className="newEntryInput">
                            <input type="number" placeholder= "Capacity" />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={plus} alt="plus-sign" /></button>
                </div>
    }

    const newClubForm = () => {
        return  <div className="newEntry">
                    <div className="newEntryField">
                        <p>Create a new Club</p>
                        <div className="newEntryInput">
                            <input type="text" placeholder="Club Name" />
                        </div>
                        <div className="newEntryInput">
                            <input type="location" placeholder="Location" />
                        </div>
                    </div>
                    <button className="actionButton"><img className="actionIcon" src={plus} alt="plus-sign" /></button>
                </div>
    }

    switch(props.object) {
        case "stadiums":
            return newStadiumForm();
        case "clubs":
            return newClubForm();
        default:
            return null;
    }
}

export default Add;