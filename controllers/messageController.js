let userModel = require('../models/userData');
let messageModel = require('../models/messageData');
let sessionFunction = require('../controllers/sessionChecker');
let moment = require('moment');

exports.index = async (req, res) =>{
    let user_id = req.params.user_id;
    sessionFunction.sessionChecker(req,res,user_id);
    let conversation = await messageModel.getALLConversationByUserId(user_id);
    let userData = await userModel.getUser(user_id);
    let conversation_id = req.params.conversation_id;
    if(conversation_id){
        let message = await messageModel.getAllMessage(conversation_id);
        res.render("message",{user:userData[0],message:message,conversation_id:conversation_id,conversations:conversation,messageCSS:true});
    }else{
        res.render("message",{user:userData[0],conversations:conversation,messageCSS:true});
    }
    
}

exports.postMessage = async (req, res) =>{
    let user_id = req.body.user_id;
    sessionFunction.sessionChecker(req,res,user_id);
    let conversation_id = req.body.conversation_id;
    let message = req.body.message;
    let conversation = await messageModel.getConversation(conversation_id);
    let receiver_user_id;
    if(conversation[0].user1_user_id == user_id){
        receiver_user_id = conversation[0].user2_user_id;
    }else{
        receiver_user_id = conversation[0].user1_user_id;
    }
    let message_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let InsertMessage = await messageModel.insertMessage(conversation_id,message,message_date,user_id,receiver_user_id);
    res.redirect(301,"/message/"+user_id+"/"+conversation_id);
}

exports.conversation = async (req, res) =>{
    let user_id = req.params.user_id;
    sessionFunction.sessionChecker(req,res,user_id);
    let another_user_id = req.params.another_user_id;
    let another_userData = await userModel.getUser(another_user_id);
    let userData = await userModel.getUser(user_id);
    res.render("conversation",{anotherData:another_userData[0],user:userData[0],conversationCSS:true})
}

exports.conversationCheck = async (req, res) =>{
    let user_id = req.body.user_id;
    sessionFunction.sessionChecker(req,res,user_id);
    let another_user_id = req.body.another_user_id;
    let message = req.body.message;
    let message_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let check = await messageModel.getConversationID(user_id,another_user_id)
    if(!check[0]){
        check = await messageModel.createNewConversation(message_date,user_id,another_user_id);
    }
    let InsertMessage = await messageModel.insertMessage(check[0].conversation_id,message,message_date,user_id,another_user_id);
    res.redirect(301,"/message/"+user_id+"/"+check[0].conversation_id);
}