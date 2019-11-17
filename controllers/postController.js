let postModel = require('../models/postData');
let userModel = require('../models/userData');
let replyModel = require('../models/replyData');

exports.getAllPostByUser = async (req,res) =>{
    let user_id = req.params.user_id;

    let userPosts = await postModel.getPost(user_id);
    let userData = await userModel.getUser(user_id);
    let getAllReplys = await replyModel.getAllReplys();
    let postData = await postModel.getPost(user_id);
    
    res.render('userPost',{user:userData[0],userPost:postData,posts:userPosts,replys:getAllReplys});
}