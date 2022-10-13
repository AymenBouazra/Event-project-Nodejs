const express = require('express');
const { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } = require('../controllers/company.controller');
const router = express.Router();

router.get('/company',getAllCompanies)
router.get('/company/:id',getCompanyById)
router.post('/company',createCompany)
router.put('/company/:id',updateCompany)
router.delete('/company/:id',deleteCompany)


module.exports = router