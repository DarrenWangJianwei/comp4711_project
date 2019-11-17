let db = require('../util/connectionMSSQL');

function getAllUsers() {
    let sql = "";
    return db.execute(sql);
}

// Add a details to the database
function addDetails(data) {
    let sql = "UPDATE [dbo].[usersProfile]"
            +"SET image_url = '" + data.image_url + "', about = '" + data.about + "', country =  '" + data.country+ "', dob = '" + data.dob+ "'"
            + "WHERE ID = \'' + ID + '\''";
    db.execute(sql);
}


module.exports = {
    getAll : getAllUsers,
    add : addDetails
}