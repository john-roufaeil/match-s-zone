const config = require('./dbConfig');
const sql = require('mssql');

const getTablesNames = async() => {
    try {
        let pool = await sql.connect(config);
        let tables = pool.request().query("drop table hi")
        console.log(tables);
        return tables;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTablesNames
}