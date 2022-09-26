const Company = require('../models/company');

exports.login = async (req,res) => {
    try {
        res.json({message:'Successfully connected'})
    } catch (error) {
        res.status(500).json({message: 'error server'})
    }
}

exports.register = async (req,res) => {
    try {
        await Company.create(req.body)
        res.json({message:'Successfully registered'})
    } catch (error) {
        res.status(500).json({message: 'error server'})
    }
}