const Company = require('../models/company');
const Token = require('../models/token')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomString = require('randomstring')
exports.login = async (req, res) => {
    try {
        const companyFound = await Company.findOne({ email: req.body.email });
        if (companyFound) {
            bcrypt.compare(req.body.password, companyFound.password).then((result) => {
                if (result) {
                    let data = {
                        companyId: companyFound._id,
                        role: companyFound.role
                    }
                    const createdToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
                    res.status(200).send({ message: 'Connected successfully!', token: createdToken })
                } else {
                    res.status(400).json({ message: 'Email or password incorrect.' })
                }
            }
            )
        } else {
            res.status(400).json({ message: 'Email or password incorrect.' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error server' })
    }
}

exports.register = async (req, res) => {
    try {
        const companyFound = await Company.findOne({ email: req.body.email });
        if (companyFound) {
            res.status(400).send({ message: 'Company already exist!' })
        } else {
            const saltRounds = bcrypt.genSaltSync(10);
            bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
                if (error) {
                    res.status(500).json({ message: 'Server Error' })
                }
                req.body.password = hash
                await Company.create(req.body);
                res.send({ message: 'User registered successfully!' });
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'error server' })
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const found = await Company.findOne({ email: req.body.email });
        if (found) {
            const token = await Token.findOne({ companyId: found._id });
            if (token) {
                await token.deleteOne()
            }
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
            const resetToken = randomString.generate(30)
            const createdToken = await new Token({
                companyId: found._id,
                token: resetToken,
            }).save();
            const resetLink = 'http://localhost:3000/resetPassword/' + resetToken
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: req.body.email,
                subject: `Reset password request for ${found.companyName} company`,
                html: `<h1>You requested to reset your password so here is your reset password link</h1>
                <p>${resetLink}</p>`
            })
            res.send({ message: 'Reset password mail sent successfully.', token: createdToken })
        } else {
            res.status(400).send({ message: 'Email not found, please enter a valid e-mail!' })
        }
    } catch (error) {
        res.status(500).json({ message: 'error server' })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const token = await Token.findOne({ token: req.params.token })
        if (token) {
            const diffDate = new Date() - token.createdAt;
            const diffSeconds = Math.floor(diffDate / 1000);
            if (diffSeconds < 3600) {
                const saltRounds = bcrypt.genSaltSync(10);
                bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
                    if (error) {
                        res.status(500).json({ message: 'Server Error' })
                    } else {
                        await Company.findByIdAndUpdate(token.companyId, { password: hash })
                        res.send({ message: 'Password reset successfully!' });
                    }
                })
                await Token.findByIdAndRemove(token._id)
            } else {
                await Token.findByIdAndRemove(token._id)
                res.status(400).send({ message: 'Token expired!' });
            }
        } else {
            res.status(400).send({ message: 'Invalid token!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'error server' })
    }
}