let loginModel = require('../models/loginData');

exports.userLogin = (req,res) =>{
    res.render('login',{loginCSS:true});
}