import trash from "../../assets/icons/actions/trash.png"

const List = props => {
    const viewStadiums = () => {
        return  <table>
                    <thead>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Zamalek</td>
                            <td>Cairo</td>
                            <td>3000</td>
                            <button className="actionButton"><img className="actionIcon" src={trash} /></button>
                        </tr>
                        <tr>
                            <td>Zamalek</td>
                            <td>Cairo</td>
                            <td>3000</td>
                            <button className="actionButton"><img className="actionIcon" src={trash} /></button>
                        </tr>
                        <tr>
                            <td>Zamalek</td>
                            <td>Cairo</td>
                            <td>3000</td>
                            <button className="actionButton"><img className="actionIcon" src={trash} /></button>
                        </tr>
                    </tbody>
                </table>
    }

    const viewClubs = () => {
        return  <table>
                    <thead>
                        <th>Name</th>
                        <th>Location</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Zamalek</td>
                            <td>Cairo</td>
                            <button className="actionButton"><img className="actionIcon" src={trash} /></button>
                        </tr>
                        <tr>
                            <td>Zamalek</td>
                            <td>Cairo</td>
                            <button className="actionButton"><img className="actionIcon" src={trash} /></button>
                        </tr>
                        <tr>
                            <td>Zamalek</td>
                            <td>Cairo</td>
                            <button className="actionButton"><img className="actionIcon" src={trash} /></button>
                        </tr>
                    </tbody>
                </table>
    }

    switch(props.object) {
        case "stadiums": 
            return viewStadiums();
        case "clubs":
            return viewClubs();
        // case "fans":
        //     return viewFans();
        default: 
            return null;
    }
}

export default List;