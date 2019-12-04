function sessionChecker(req, res,user_id){
    console.log("session: " + req.session.user_id);
    console.log("cookies: " + req.cookies.user_id);
    if (!req.session.user_id || !req.cookies.user_id || (req.session.user_id != user_id)) {
        res.redirect(301,'/login');
    }
};

module.exports = {
    sessionChecker : sessionChecker
}