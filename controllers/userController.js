let postModel = require('../models/postData');
let userModel = require('../models/userData');
let replyModel = require('../models/replyData');

exports.index = async (req,res) =>{
    let user_id = req.params.user_id;
    let userData = await userModel.getUser(user_id);
    let user = req.params.user;
    let theUser = await userModel.getUser(user);
    let userPosts = await postModel.getPost(user);
    let getAllReplys = await replyModel.getAllReplys();
    console.log(userData);
    res.render('user',{user:userData[0],theUser:theUser[0],posts:userPosts,replys:getAllReplys,userCSS:true});
}
exports.edit = async (req,res) =>{
    let user_id = req.params.user_id;
    let userData = await userModel.getUser(user_id);
    res.render('detailsPageWithName', { user_id: userData[0], detailCSS: true });
}


exports.increaseLikes = async (req,res) =>{
    let user_id = req.body.user_id;
    let theUser_id = req.body.theUser_id;
    let likes = req.body.likes;
    let addLikes = await userModel.increaseLikes(theUser_id);
    res.redirect(301,"/user/"+user_id+"/view/"+theUser_id);
}