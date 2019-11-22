let db = require('../util/connectionMSSQL');

function getAllUsers() {
    let sql = "SELECT * FROM dbo.usersProfile;";
    return db.execute(sql);
}
function addNewUser(email,firstName,lastName,password){
    let sql = "INSERT INTO dbo.usersProfile (firstName,lastName,email,password) "
             +"OUTPUT INSERTED.user_id "
             +"VALUES('"+firstName+"','"+lastName+"','"+email+"','"+password+"');";
    return db.execute(sql);
}
// Add a details to the database
function updateDetails(data) {
    console.log(data);
    let sql = ""
    if(data.firstName == null || data.lastName == null){
        sql = "UPDATE [dbo].[usersProfile] "
        +"SET image_url = '" + data.img_URL + "'"
             + ", about = '" + data.about + "'" 
             + ", country =  '" + data.country + "'"
             + ", dob = '" + data.dob+ "' "
        +"WHERE user_id = " + data.user_id +";";
    }else{
        sql = "UPDATE [dbo].[usersProfile] "
        +"SET image_url = '" + data.img_URL + "'"
             + ", about = '" + data.about + "'" 
             + ", country =  '" + data.country + "'"
             + ", dob = '" + data.dob+ "'"
             + ", firstName = '" + data.firstName + "'"
             + ", lastName = '" + data.lastName +"' "
        +"WHERE user_id = " + data.user_id +";";
    }
    console.log(sql);
    return db.execute(sql);
}


module.exports = {
    getAll : getAllUsers,
    addDetails : updateDetails,
    addNewUser : addNewUser
}