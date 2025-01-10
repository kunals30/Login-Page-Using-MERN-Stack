const express = require('express');
const { signUp, signIn, logOut } = require('../controller/authController'); 

const authRouter = express.Router();

authRouter.post('/signup', signUp)
authRouter.post('/signin',signIn)
authRouter.get('/logout',logOut)

module.exports = {
    authRouter
}