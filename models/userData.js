let db = require('../util/connectionMSSQL');

function getUserInfo(id) {
    let sql = "SELECT * FROM [dbo].[usersProfile] WHERE user_id = "+id+";";
    return db.execute(sql);
}
function addLikes(id){
    let sql = "UPDATE [dbo].[usersProfile] "
             +"SET [dbo].[usersProfile].[likes] = [dbo].[usersProfile].[likes] + 1 "
             +"WHERE [dbo].[usersProfile].[user_id] = " + id;
    return db.execute(sql);   
}

module.exports = {
    getUser: getUserInfo,
    increaseLikes: addLikes
}
