const Company = require('../models/company');
const bcrypt = require('bcrypt');

exports.getAllCompanies = async (req,res) => {
    try {
        const company = await Company.find()
        res.send(company)
    } catch (error) {
        res.status(500).send({message:'Server error!'})
    }
}

exports.getCompanyById = async (req,res) => {
    try {
        const company = await Company.findById(req.params.id)
        res.send(company)
    } catch (error) {
        res.status(500).send({message:'Server error!'})
    }
}

exports.createCompany = async (req,res) => {
    try {
        await Company.create(req.body)
        res.send({message:'Created successfully'})
    } catch (error) {
        res.status(500).send({message:'Server error!'})
    }
}

exports.updateCompany = async (req,res) => {
    try {
        await Company.findByIdAndUpdate(req.params.id, req.body)
        res.send({message:'Updated successfully'})
    } catch (error) {
        res.status(500).send({message:'Server error!'})
    }
}

exports.deleteCompany = async (req,res) => {
    try {
        await Company.findByIdAndRemove(req.params.id)
        res.send({message:'Delete successfully'})
    } catch (error) {
        res.status(500).send({message:'Server error!'})
    }
}