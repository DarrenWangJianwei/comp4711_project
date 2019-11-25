let db = require('../util/connectionMSSQL');

function getALLConversationByUserId(user_id) {
    let sql = "SELECT * FROM dbo.conversation AS c "
             +"JOIN dbo.usersProfile AS u1 ON c.user1_user_id = u1.user_id "
             +"JOIN dbo.usersProfile AS u2 ON c.user2_user_id = u2.user_id "
             +"WHERE c.user1_user_id = " + user_id +" "
             +"OR c.user2_user_id = " + user_id +" "
             +"ORDER BY c.conversation_date DESC ;"
    return db.execute(sql);
}
function getAllMessage(conversation_id){
    let sql = "SELECT * FROM dbo.message AS m "
             +"JOIN dbo.usersProfile AS u1 ON m.sender_user_id = u1.user_id "
             +"JOIN dbo.usersProfile AS u2 ON m.receiver_user_id = u2.user_id "
             +"WHERE conversation_id = " + conversation_id + " "
             +"ORDER BY message_date ASC;"
    return db.execute(sql);
}
function getConversation(conversation_id){
    let sql = "SELECT * FROM dbo.conversation "
             +"WHERE conversation_id = "+ conversation_id + " ;"
    return db.execute(sql);
}
function insertMessage(conversation_id,message,meesage_date,sender_user_id,receiver_user_id){
    let sql = "INSERT INTO dbo.message(conversation_id,content,message_date,sender_user_id,receiver_user_id) "
             +"VALUES("+conversation_id+",'"+message+"','"+meesage_date+"',"+sender_user_id+","+receiver_user_id+");"
    return db.execute(sql);

}
function getConversationID(user_id,another_user_id){
    let sql = "SELECT conversation_id FROM dbo.conversation "
             +"WHERE (user1_user_id = "+ user_id +" AND user2_user_id = "+another_user_id +")"
             +"OR (user1_user_id = "+ another_user_id +" AND user2_user_id = "+user_id +");"
    return db.execute(sql);
}
function createNewConversation(conversation_date,user1_user_id,user2_user_id){
    let sql = "INSERT INTO dbo.conversation(conversation_date,user1_user_id,user2_user_id) "
             +"OUTPUT INSERTED.conversation_id "
             +"VALUES('"+conversation_date+"',"+user1_user_id+","+user2_user_id+"); "
    return db.execute(sql);
}
module.exports = {
    getALLConversationByUserId:getALLConversationByUserId,
    getAllMessage:getAllMessage,
    getConversation:getConversation,
    insertMessage:insertMessage,
    getConversationID:getConversationID,
    createNewConversation:createNewConversation
}
