let db = require('../util/connectionMSSQL');

function getReplysInfo(id) {
    let sql = "SELECT DISTINCT [dbo].[reply].[post_id], MAX([dbo].[reply].[reply_id]) FROM [dbo].[reply] "
             +"WHERE [dbo].[reply].[user_id] = "+id + " "
             +"GROUP BY [dbo].[reply].[post_id] "
             +"ORDER BY MAX([dbo].[reply].[reply_id]) DESC, [dbo].[reply].[post_id];";
    return db.execute(sql);
}
function getReplysForThePost(post_id){
    let sql = "SELECT * FROM [dbo].[reply] "
             +"JOIN [dbo].[usersProfile] ON [dbo].[reply].[user_id] = [dbo].[usersProfile].[user_id] "   
             +"WHERE post_id = "+ post_id+" "
             +"ORDER BY [dbo].[reply].[reply_id] DESC;";
    return db.execute(sql);
}
function postReply(comment,reply_date,post_id,user_id){
    let sql = "INSERT INTO [dbo].[reply] (content,reply_date,post_id,user_id) VALUES ('"+comment+"', '"+reply_date+"', "+post_id+", "+user_id+");";
    return db.execute(sql);
}
function getPostWithPosterImg(user_id){
    let sql = "SELECT DISTINCT [dbo].[reply].[post_id],[dbo].[post].[subject],[dbo].[post].[details],[dbo].[post].[topic],[dbo].[post].[post_date],[dbo].[usersProfile].[image_url], [dbo].[post].[user_id], MAX([dbo].[reply].[reply_id]) FROM [dbo].[reply] "
             +"JOIN [dbo].[post] ON [dbo].[reply].[post_id] = [dbo].[post].[post_id] "
             +"JOIN [dbo].[usersProfile] ON [dbo].[post].[user_id] = [dbo].[usersProfile].[user_id] "
             +"WHERE [dbo].[reply].[user_id] =" + user_id
             +"GROUP BY [dbo].[reply].[post_id],[dbo].[post].[subject],[dbo].[post].[details],[dbo].[post].[topic],[dbo].[post].[post_date],[dbo].[usersProfile].[image_url], [dbo].[post].[user_id] "
             +"ORDER BY MAX([dbo].[reply].[reply_id]) DESC, [dbo].[reply].[post_id];"
    return db.execute(sql);
}
function getAllReplys(){
    let sql = "SELECT [dbo].[reply].[reply_id],[dbo].[reply].[content],[dbo].[reply].[post_id],[dbo].[usersProfile].[image_url] FROM [dbo].[reply] "
             +"JOIN [dbo].[usersProfile] ON [dbo].[reply].[user_id] = [dbo].[usersProfile].[user_id] "
             +"ORDER BY [dbo].[reply].[reply_id] DESC"
    return db.execute(sql);
}
module.exports = {
    getReply: getReplysInfo,
    getAllReplysForAPost : getReplysForThePost,
    postReply:postReply,
    getPostWithPosterImg: getPostWithPosterImg,
    getAllReplys: getAllReplys
}
