const express = require('express');
const { login, register, forgetPassword ,resetPassword} = require('../controllers/auth.controller');
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgetPassword', forgetPassword)
router.put('/resetPassword/:token', resetPassword)

module.exports = router