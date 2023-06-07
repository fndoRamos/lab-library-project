const express = require('express');
const Author = require('../models/Author.model');
const router = express.Router();


router.get("/authors", (req, res, next) => {

    Author.find()
        .then(authorsArr => {
            res.render("authors/authors-list", {authors: authorsArr})
        })
        .catch( e => {
            console.log("error displaying authors", e);
            next(e);
        });
})

module.exports = router;


