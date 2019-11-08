let db = require('../util/connectionMSSQL');

function getAllUsers() {
    let sql = "";
    return db.execute(sql);
}



module.exports = {
    getAll : getAllUsers,
}