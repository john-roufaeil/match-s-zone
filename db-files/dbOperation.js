const config = require('./dbConfig');
const sql = require('mssql');

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

// Club Representative //
const addNewCR = async (name, username, password, club) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC CR_addRepresentative ${name}, ${username}, ${password}, ${club}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

// Stadium Manager //
const addNewSM = async (name, username, password, stadium) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SM_addStadiumManager ${name}, ${username}, ${password}, ${stadium}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

// Fan //
const addNewF = async (name, username, password, nat_id, birthdate, address, phone) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(
            `EXEC F_addFan ${name}, ${username}, ${password},
            ${nat_id}, ${birthdate}, ${address}, ${phone}`);
        return exec;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    addClub,
    delClub,
    addStadium,
    delStadium,
    blockFan,
    unblockFan,
    addNewSAM,
    addNewCR,
    addNewSM,
    addNewF,
}