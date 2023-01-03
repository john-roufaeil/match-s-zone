const config = require('./dbConfig');
const sql = require('mssql');

const addNewSAM = async (name, username, password) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(`EXEC SAM_addAssociationManager ${name}, ${username}, ${password}`);
        console.log(exec);
        return exec;
    } catch (error) {
        console.log("");
    }
}

const addNewF = async (name, username, password, nat_id, birthdate, address, phone) => {
    try {
        let pool = await sql.connect(config);
        let exec = await pool.request().query(
            `EXEC F_addFan ${name}, ${username}, ${password},
            ${nat_id}, ${birthdate}, ${address}, ${phone}`);
        console.log(exec);
        return exec;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addNewSAM,
    addNewF
}