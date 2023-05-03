require('dotenv').config();
const sql = require('mssql');

const config = require('./dbConfig.js');

let connectionCount = 0;

const log = (message) => {
  console.log(`[mssql] ${message}`);
}

//create the pool
const pool = new sql.ConnectionPool(config);
pool.on('connect', (connection) => {
    connectionCount += 1;
    console.log(`[ConnectionPool] Connection established. Current connection count: ${connectionCount}`);
});
pool.on('close', (connection) => {
    connectionCount -= 1;
    console.log(`[ConnectionPool] Connection closed. Current connection count: ${connectionCount}`);
});
pool.connect();

const getUsers = async() => {
    try {
        let request = pool.request();
        let exec = await request.query(`SELECT * FROM systemUser`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const getStadiumManagers = async() => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC viewStadiumManagers`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const getClubRepresentatives = async() => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC viewClubRepresentatives`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

// Admin //
const addClub = async (name, location) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_addClub [${name.toLowerCase()}], [${location.toLowerCase()}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const delClub = async (name) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_deleteClub [${name.toLowerCase()}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const addStadium = async (name, location, capacity) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_addStadium [${name.toLowerCase()}], [${location.toLowerCase()}], [${capacity}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const delStadium = async (name) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_deleteStadium [${name.toLowerCase()}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const blockFan = async (nat_id) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_blockFan [${nat_id}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const unblockFan = async (nat_id) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_unblockFan[${nat_id}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewStadiums = async () => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_viewStadiums`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewClubs = async () => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_viewClubs`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewFans = async () => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_viewFans`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const openStadium = async (name) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_openStadium[${name.toLowerCase()}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const closeStadium = async (name) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SA_closeStadium[${name.toLowerCase()}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

// Sports Association Manager //
const addNewSAM = async (name, username, password) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SAM_addAssociationManager[${name.toLowerCase()}],[${username.toLowerCase()}],[${password}]`);
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
        let request = pool.request();
        let exec = await request.query(`EXEC SAM_addNewMatch 
           [${host.toLowerCase()}],[${guest.toLowerCase()}], 
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
        let request = pool.request();
        let exec = await request.query(`EXEC SAM_deleteMatch 
           [${host.toLowerCase()}],[${guest.toLowerCase()}], 
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
        let request = pool.request();
        let exec = await request.query(`EXEC SAM_viewAllMatches`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewUpcomingMatches = async () => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SAM_viewUpcomingMatches`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewPreviousMatches = async () => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SAM_viewPreviousMatches`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewClubsNotScheduledTogether = async () => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC viewClubsNotScheduledTogether`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

// Club Representative //
const addNewCR = async (name, username, password, club) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC CR_addRepresentative[${name.toLowerCase()}],[${club.toLowerCase()}],[${username.toLowerCase()}],[${password}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMyClub = async (username) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC CR_viewMyClub[${username.toLowerCase()}]`);
        // console.log(exec);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const myUpcomingMatches = async (username) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC CR_viewUpcomingMatchesOfClub[${username.toLowerCase()}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const availableStadiumsOn = async (date) => {
    try {
        date = date.replaceAll('-', '').replaceAll(' ', '').replaceAll(':', '');
        year = parseInt(date).toString().slice(0,4);
        month = parseInt(date).toString().slice(4,6);
        day = parseInt(date).toString().slice(6,8);
        hour = parseInt(date).toString().slice(8,10);
        min = parseInt(date).toString().slice(10,12); 
        let request = pool.request();
        let exec = await request.query(`EXEC CR_viewAvailableStadiumsOn '${year}-${month}-${day} ${hour}:${min}'`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const addHostRequest = async (cr_id, sm_id, m_id) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC CR_addHostRequest [${cr_id}], [${sm_id}], [${m_id}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewRequests = async () =>{
    try {
        let request = pool.request();
        let exec = await request.query(`SELECT * FROM hostRequest`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

// Stadium Manager //
const addNewSM = async (name, username, password, stadium) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SM_addStadiumManager[${name.toLowerCase()}],[${stadium.toLowerCase()}],[${username.toLowerCase()}],[${password}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMyStadium = async (username) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SM_viewMyStadium[${username.toLowerCase()}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMyRequests = async (username) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SM_viewAllRequests[${username.toLowerCase()}]`);
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
        let request = pool.request();
        let exec = await request.query(`EXEC SM_acceptRequest[${username.toLowerCase()}],[${host.toLowerCase()}],[${guest.toLowerCase()}], 
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
        let request = pool.request();
        let exec = await request.query(`EXEC SM_rejectRequest[${username.toLowerCase()}],[${host.toLowerCase()}],[${guest.toLowerCase()}], '${year}-${month}-${day} ${hour}:${min}'`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMatchesOnStadium = async (username) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC SM_viewMatchesOnStadium[${username.toLowerCase()}]`);
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
        let request = pool.request();
        let exec = await request.query(
            `EXEC F_addFan[${name.toLowerCase()}],[${username.toLowerCase()}],[${password}],
           [${nat_id.toLowerCase()}], '${year}-${month}-${day}',[${address.toLowerCase()}],[${phone}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewMyTickets = async (username) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC F_viewMyTickets[${username.toLowerCase()}]`);
        // console.log(exec);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const viewAvailableTickets = async (username) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC F_availableMatchesToAttend[${username.toLowerCase()}]`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

const purchaseTicket = async(username, id) => {
    try {
        let request = pool.request();
        let exec = await request.query(`EXEC F_purchaseTicket[${username.toLowerCase()}],[${id}]`)
        return exec;
    } catch (error) {
        console.log(error);
    }
}

process.on('exit', async () => {
    await pool.close();
});

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
    availableStadiumsOn,
    addHostRequest,
    viewRequests,

    addNewSM,
    viewMyStadium,
    viewMyRequests,
    acceptRequest,
    rejectRequest,
    viewMatchesOnStadium,
    
    addNewF,
    viewMyTickets,
    viewAvailableTickets,
    purchaseTicket
}