const config = require('./dbConfig');
const sql = require('mssql');

// General //
const getUsers = async() => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`SELECT * FROM systemUser`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const getStadiumManagers = async() => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC viewStadiumManagers`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const getClubRepresentatives = async() => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC viewClubRepresentatives`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}



// Admin //
const addClub = async (name, location) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_addClub ${name}, ${location}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const delClub = async (name) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_deleteClub ${name}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const addStadium = async (name, location, capacity) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_addStadium ${name}, ${location}, ${capacity}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const delStadium = async (name) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_deleteStadium ${name}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const blockFan = async (nat_id) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_blockFan ${nat_id}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const unblockFan = async (nat_id) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_unblockFan ${nat_id}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewStadiums = async () => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_viewStadiums`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewClubs = async () => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_viewClubs`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewFans = async () => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_viewFans`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const openStadium = async (name) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_openStadium ${name}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const closeStadium = async (name) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SA_closeStadium ${name}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}



// Sports Association Manager //
const addNewSAM = async (name, username, password) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SAM_addAssociationManager ${name}, ${username}, ${password}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const addNewMatch = async (host, guest, startTime, endTime) => {
    try {
        sYear = parseInt(startTime).toString().slice(0,4);
        sMonth = parseInt(startTime).toString().slice(4,6);
        sDay = parseInt(startTime).toString().slice(6,8);
        sHour = parseInt(startTime).toString().slice(8,10);
        sMin = parseInt(startTime).toString().slice(10);
        eYear = parseInt(endTime).toString().slice(0,4);
        eMonth = parseInt(endTime).toString().slice(4,6);
        eDay = parseInt(endTime).toString().slice(6,8);
        eHour = parseInt(endTime).toString().slice(8,10);
        eMin = parseInt(endTime).toString().slice(10);
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SAM_addNewMatch 
            ${host}, ${guest}, 
            '${sYear}-${sMonth}-${sDay} ${sHour}:${sMin}', 
            '${eYear}-${eMonth}-${eDay} ${eHour}:${eMin}'
        `);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const delMatch = async (host, guest, startTime, endTime) => {
    try {
        sYear = parseInt(startTime).toString().slice(0,4);
        sMonth = parseInt(startTime).toString().slice(4,6);
        sDay = parseInt(startTime).toString().slice(6,8);
        sHour = parseInt(startTime).toString().slice(8,10);
        sMin = parseInt(startTime).toString().slice(10);
        eYear = parseInt(endTime).toString().slice(0,4);
        eMonth = parseInt(endTime).toString().slice(4,6);
        eDay = parseInt(endTime).toString().slice(6,8);
        eHour = parseInt(endTime).toString().slice(8,10);
        eMin = parseInt(endTime).toString().slice(10);
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SAM_deleteMatch 
            ${host}, ${guest}, 
            '${sYear}-${sMonth}-${sDay} ${sHour}:${sMin}', 
            '${eYear}-${eMonth}-${eDay} ${eHour}:${eMin}'
        `);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewAllMatches = async () => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SAM_viewAllMatches`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewUpcomingMatches = async () => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SAM_viewUpcomingMatches`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewPreviousMatches = async () => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SAM_viewPreviousMatches`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewClubsNotScheduledTogether = async () => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC viewClubsNotScheduledTogether`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}



// Club Representative //
const addNewCR = async (name, username, password, club) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC CR_addRepresentative ${name}, ${club}, ${username}, ${password}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMyClub = async (username) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC CR_viewMyClub ${username}`);
        // console.log(exec);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const myUpcomingMatches = async (username) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC CR_viewUpcomingMatchesOfClub ${username}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}



// Stadium Manager //
const addNewSM = async (name, username, password, stadium) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SM_addStadiumManager ${name}, ${stadium}, ${username}, ${password}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMyStadium = async (username) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SM_viewMyStadium ${username}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMyRequests = async (username) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SM_viewAllRequests ${username}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const acceptRequest = async (username, host, guest, startTime) => {
    try {
        year = parseInt(startTime).toString().slice(0,4);
        month = parseInt(startTime).toString().slice(4,6);
        day = parseInt(startTime).toString().slice(6,8);
        hour = parseInt(startTime).toString().slice(8,10);
        min = parseInt(startTime).toString().slice(10,12);
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SM_acceptRequest ${username}, ${host}, ${guest}, 
        '${year}-${month}-${day} ${hour}:${min}'`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const rejectRequest = async (username, host, guest, startTime) => {
    try {
        year = parseInt(startTime).toString().slice(0,4);
        month = parseInt(startTime).toString().slice(4,6);
        day = parseInt(startTime).toString().slice(6,8);
        hour = parseInt(startTime).toString().slice(8,10);
        min = parseInt(startTime).toString().slice(10,12);
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SM_rejectRequest ${username}, ${host}, ${guest}, '${year}-${month}-${day} ${hour}:${min}'`);
        console.log(JSON.stringify(`${year}-${month}-${day} ${hour}:${min}`));
        return exec;
    } catch (error) {
        console.log(error);
    }
}


// Fan //
const addNewF = async (name, username, password, nat_id, birthdate, address, phone) => {
    try {
        year = parseInt(birthdate).toString().slice(0,4);
        month = parseInt(birthdate).toString().slice(4, 6);
        day = parseInt(birthdate).toString().slice(6);
        console.log(``)
        console.log(birthdate);
        console.log(typeof(birthdate));
        let pool = await sql.connect(config);
        let exec = await pool.request().query(
            `EXEC F_addFan ${name}, ${username}, ${password},
            ${nat_id}, '${year}-${month}-${day}', ${address}, ${phone}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMyTickets = async (username) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC F_viewMyTickets ${username}`);
        // console.log(exec);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewAvailableTickets = async (username) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC F_availableMatchesToAttend ${username}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const purchaseTicket = async(username, id) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC F_purchaseTicket ${username}, ${id}`)
        return exec;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getUsers,
    getStadiumManagers,
    getClubRepresentatives,

    addClub,
    delClub,
    addStadium,
    delStadium,
    blockFan,
    unblockFan,
    viewStadiums,
    viewClubs,
    viewFans,
    openStadium,
    closeStadium,

    addNewSAM,
    addNewMatch,
    delMatch,
    viewAllMatches,
    viewUpcomingMatches,
    viewPreviousMatches,
    viewClubsNotScheduledTogether,

    addNewCR,
    viewMyClub,
    myUpcomingMatches,

    addNewSM,
    viewMyStadium,
    viewMyRequests,
    acceptRequest,
    rejectRequest,
    
    addNewF,
    viewMyTickets,
    viewAvailableTickets,
    purchaseTicket
}