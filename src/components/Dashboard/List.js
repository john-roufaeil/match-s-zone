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

    switch(props.object) {
        case "stadiums": 
            return viewStadiums();
        case "clubs":
            return viewClubs();
        case "fans":
            return viewFans();
        case "matches":
            return viewMatches();
        default: 
            return null;
    }
}

export default List;