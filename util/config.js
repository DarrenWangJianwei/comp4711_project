var mssql = require("mssql");

var config = {
    type: 'default',
    user: 'momo',
    password: 'Thisisagoodpassword1!!!',
    server: '4711memorybetterserver.database.windows.net',
    database: 'DarrenDB',
    connectionTimeout: 600000,
    requestTimeout: 600000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

module.exports = config;
  