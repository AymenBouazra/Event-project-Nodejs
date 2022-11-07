const Company = require('../models/company');
const bcrypt = require('bcrypt');

exports.getAllCompanies = async (req, res) => {
    try {
        const company = await Company.find({})
        res.send(company)
    } catch (error) {
        res.status(500).send({ message: 'Server error!' })
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        res.send(company)
    } catch (error) {
        res.status(500).send({ message: 'Server error!' })
    }
}

exports.createCompany = async (req, res) => {
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
        res.status(500).send({ message: 'Server error!' })
    }
}

exports.updateCompany = async (req, res) => {
    try {
        await Company.findByIdAndUpdate(req.params.id, req.body)
        res.send({ message: 'Updated successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Server error!' })
    }
}

exports.deleteCompany = async (req, res) => {
    try {
        await Company.findByIdAndRemove(req.params.id)
        res.send({ message: 'Delete successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Server error!' })
    }
}