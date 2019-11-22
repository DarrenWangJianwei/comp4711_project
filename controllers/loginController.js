let loginModel = require('../models/loginData');

exports.userLogin = (req, res) => {
    res.render('login', { loginCSS: true });
}

exports.userDetailsPage = async (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let confirmP = req.body.confirmpassword;
    if(password != confirmP){
        res.render('login',{info:"Passwords not match for each other!"})
    }else{
        let newUser_id = await loginModel.addNewUser(email,firstName,lastName,password)
        console.log(newUser_id[0]);
        res.render('detailsPage', { user_id: newUser_id[0], detailCSS: true });
    }
   
}

exports.postDetails = async (req, res, next) => {
    let a_imageURL = req.body.img_Url;
    let a_about = req.body.about;
    let a_country = req.body.country;
    let a_dob = req.body.dob;
    let a_user_id = req.body.user_id;
    let a_firstName = req.body.firstName;
    let a_password = req.body.lastName;
    let detailsObject = {
        img_URL: a_imageURL,
        about: a_about,
        country: a_country,
        dob: a_dob,
        user_id:a_user_id,
        firstName : a_firstName,
        lastName : a_password
    }
    let postUserDetail = await loginModel.addDetails(detailsObject)
    console.log("testing Error");
    res.redirect(301, '/user/'+a_user_id);
}
