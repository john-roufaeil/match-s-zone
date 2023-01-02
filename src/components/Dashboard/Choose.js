const Choose = props => {
    const selectAvailableStadiums = () => {
        return  <div className="newEntry">
                    <p>View Available Stadiums Starting From</p>
                    <input className="choose" type="datetime-local" />
               </div>
    }

    const selectAvailableTickets = () => {
        return  <div className="newEntry">
                    <p>View Available Tickets Starting At</p>
                    <input className="choose" type="datetime-local" />
               </div>
    }

    switch(props.object) {
        case "availableStadiums": 
            return selectAvailableStadiums();
        case "availableTickets":
            return selectAvailableTickets();
        default: 
            return null;
    }
}

export default Choose;