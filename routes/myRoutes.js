const express = require('express');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
const searchController = require('../controllers/searchController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

const router = express.Router();
router.get("/",loginController.userLogin);
router.get("/login",loginController.userLogin);
router.post("/getUser",loginController.checkUser);
router.post("/submitDetails/:user_id", loginController.postDetails);
router.post('/signUp', loginController.userDetailsPage);
router.get("/out",loginController.destroySessionAndCookies);

router.get("/user/:user_id",homeController.userMain);
router.post("/user/post",homeController.userPost);
router.post("/user/discussion",homeController.LastestDiscussion);
router.post("/user/discussion/reply", homeController.LastestDiscussionReplies);
router.post("/user/discussion/reply/submit", homeController.postReply);

router.get("/user/:user_id/posts", postController.getAllPostByUser);
router.post("/user/search/subject", searchController.getSubjectPost);
router.get("/user/:user_id/edit", userController.edit);


router.get("/user/:user_id/view/:user", userController.index);
router.post("/user/likes", userController.increaseLikes);

router.get("/message/:user_id", messageController.index);
router.get("/message/:user_id/:conversation_id", messageController.index);
router.post("/message/post",messageController.postMessage);
router.get("/conversation/:user_id/:another_user_id",messageController.conversation);
router.post("/conversation/check",messageController.conversationCheck);

module.exports = router;