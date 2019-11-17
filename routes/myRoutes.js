const express = require('express');
const loginController = require('../controllers/loginController');
const homeController = require('../controllers/homeController');
const searchController = require('../controllers/searchController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get("/login",loginController.userLogin)


router.get("/",homeController.index);
router.get("/user/:user_id",homeController.userMain)
router.post("/user/post",homeController.userPost)
router.post("/user/discussion",homeController.LastestDiscussion)
router.post("/user/discussion/reply", homeController.LastestDiscussionReplies)
router.post("/user/discussion/reply/submit", homeController.postReply)

router.get("/user/:user_id/posts", postController.getAllPostByUser)
router.post("/user/search/subject", searchController.getSubjectPost)
router.get("/user/:user_id/edit", userController.index)

router.get("/user/:user_id/view/:user", userController.index)
router.post("/user/likes", userController.increaseLikes)
router.get("/detailsPage", loginController.userDetailsPage);

router.post('/submitDetails', loginController.postDetails);


module.exports = router;