let loginModel = require('../models/loginData');
let userModel = require('../models/userData')
let postModel = require('../models/postData');
let replyModel = require('../models/replyData');
let moment = require('moment')
exports.userMain = async (req,res) =>{
    let user_id = req.params.user_id;
    let userData = await userModel.getUser(user_id);
    let postData = await postModel.getPost(user_id);

   // let getUniquePostByReplys = await replyModel.getReply(user_id);
    let getPostWithPosterImg = await replyModel.getPostWithPosterImg(user_id);
    let getAllReplys = await replyModel.getAllReplys();
    // console.log(getPostWithPosterImg);
    // console.log("*************************************************************");
    // console.log(getAllReplys);
    
    res.render('home',{user:userData[0],userPost:postData,posts:getPostWithPosterImg,replys:getAllReplys});
}
exports.userPost = async (req,res) =>{
    let user_id = req.body.user_id;
    let topic = req.body.topic;
    let subject = req.body.subject;
    let detail = req.body.detail;
    let post_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.log(post_date);
    //let format_date = post_date.getFullYear()+'-'+(post_date.getMonth()+1)+'-'+post_date.getDate()+'T'+post_date.getHours()+":"+post_date.getMinutes()+":"+post_date.getSeconds();
    let postToDatabase = await postModel.postSubject(subject,detail,topic,post_date,user_id);
    res.redirect(301,'/user/'+user_id);
}

exports.LastestDiscussion = async (req,res)=>{
    let post_id = req.body.post_id;
    let discussion = await postModel.getPostInfo(post_id);
    // console.log(discussion[0]);
    res.json(discussion[0]);
}
exports.LastestDiscussionReplies = async(req,res)=>{
    let post_id = req.body.post_id;
    let discussion = await replyModel.getAllReplysForAPost(post_id);
    // console.log(discussion);
    res.json(discussion);
}
exports.postReply = async(req,res)=>{
    let comment = req.body.comment;
    let reply_date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    let post_id = req.body.post_id;
    let user_id = req.body.user_id;
    console.log(comment);
    console.log(reply_date);
    console.log(post_id);
    console.log(user_id);
    let postReply = await replyModel.postReply(comment,reply_date,post_id,user_id);
    res.redirect(301,'/user/'+user_id);
}
exports.index = (req,res)=>{
    res.render('home',{homeCSS:true})
}
