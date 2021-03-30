const express = require('express');

const router = express.Router();

//middlewares
const {authCheck} = require("../middlewares/auth");

//import
const {createOrUpdateUser} = require("../controllers/auth");

const myMiddleware = (req, res, next) => {
    console.log("IM  A MIDDLEWARE YAY");
    next();
}

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

router.get('/testing', myMiddleware, (req, res) => {
    res.json({
        data: 'YOU SUCCESSFULLY TRIED MIDDLEWARE',
    })
})

module.exports = router;

/*router.get("/create-or-update-user", (req, res) => {
    res.json({
        data: "hey you hit create-or-update-user API endpoint",
    });
});*/