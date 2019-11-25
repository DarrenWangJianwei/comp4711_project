let postModel = require('../models/postData');
let userModel = require('../models/userData');
let replyModel = require('../models/replyData');
let messageModel = require('../models/messageData');

exports.getSubjectPost = async (req,res) =>{
    let user_id = req.body.search_user_id;
    let subject = req.body.searchInput;
    let posts = await postModel.getSubjectPost(subject);
    let userPosts = await postModel.getPost(user_id);
    let userData = await userModel.getUser(user_id);
    let getAllReplys = await replyModel.getAllReplys();
    let conversation = await messageModel.getALLConversationByUserId(user_id);

    console.log(userData);
    res.render('search',{user:userData[0],conversation:conversation,userPost:userPosts,posts:posts,replys:getAllReplys,searchCSS:true});
}