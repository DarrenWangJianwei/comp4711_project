let loginModel = require('../models/loginData');

exports.userLogin = (req, res) => {
    res.render('login', { loginCSS: true });
}

exports.postDetails = (req, res, next) => {
    let a_imageURL = req.body.img_Url;
    let a_about = req.body.about;
    let a_country = req.body.country;
    let a_dob = req.body.dob;

    let detailsObject = {
        img_URL: a_imageURL,
        about: a_about,
        country: a_country,
        dob: a_dob
    }

    artistModel.add(detailsObject);
    res.redirect(301, '/login');
}
