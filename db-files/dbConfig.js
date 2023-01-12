var config = {
    user: 'bitte',
    password: '',
    server: 'localhost',  
    database: 'match-s-zone-database',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS',
    },
    port: 1433,
    pool: {
        max: 100,
        log: log
    },
};

module.exports = config