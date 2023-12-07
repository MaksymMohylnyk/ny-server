const express = require('express'); //import express
const router = express.Router();
const userController = require('./userController.js');

router.get('/users/', userController.getUsers);
router.put('/users/:id', userController.putUser);
router.get('/page', getPage)
router.get('/front.js', getFront)

function getPage(req, res, next){
    res.sendFile('./test.html', {root: __dirname })
}

function getFront(req, res, next){
    res.sendFile('./front.js', {root: __dirname })
}


module.exports = router; // export to use in server.js