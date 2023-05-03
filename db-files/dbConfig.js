var config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: process.env.DB_INSTANCE,
    },
    port: 1433,
    pool: {
        max: 3000,
    },
};

module.exports = config