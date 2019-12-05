let db = require('../util/connectionMSSQL');

function getUserPostInfo(id) {
    let sql = "SELECT * FROM [dbo].[post] "
             +"JOIN [dbo].[usersProfile] ON [dbo].[usersProfile].[user_id] = [dbo].[post].[user_id] "
             +"WHERE [dbo].[post].[user_id] = "+id+" "
             +"ORDER BY [dbo].[post].[post_id];";
    return db.execute(sql);
}
function getSubjectPostInfo(subject){
    let sql = "SELECT * FROM [dbo].[post] "
             +"JOIN [dbo].[usersProfile] ON [dbo].[usersProfile].[user_id] = [dbo].[post].[user_id] "
             +"WHERE subject LIKE '%"+subject+"%' ORDER BY post_id;";
    return db.execute(sql);
}
function postSubject(subject,detail,topic,post_date,user_id){
    
    let sql = "INSERT INTO [dbo].[post] (subject,details,topic,post_date,user_id) VALUES ('"+subject+"', '"+detail+"', '"+topic+"', '"+post_date+"', "+user_id+");";
    console.log(sql);
    return db.execute(sql);
}
function getPostInfo(post_id){
    let sql = "SELECT * FROM [dbo].[post] "
             +"JOIN [dbo].[usersProfile] ON [dbo].[usersProfile].[user_id] = [dbo].[post].[user_id] "
             +"WHERE post_id ="+post_id+";";
    return db.execute(sql);
}
module.exports = {
    getPost: getUserPostInfo,
    postSubject: postSubject,
    getPostInfo: getPostInfo,
    getSubjectPost : getSubjectPostInfo
}
