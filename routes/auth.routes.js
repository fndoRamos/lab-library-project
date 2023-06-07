const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');

const router = express.Router();

const saltRounds = 10;
router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
    const { email, password } = req.body;


    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hash => {
            return User.create({ email, passwordHash: hash });
        })
        .then(userFromDB => {
            //account create succcessfully
            res.redirect("/user-profile");
        })
        .catch(error => {
            console.log("error creating account...", error);
            next(error)
        });

});

router.get("/user-profile", (req, res,next) => res.send("this is your user profile"))


module.exports = router;