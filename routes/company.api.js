const express = require('express');
const passport = require('passport');
const { getAllCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } = require('../controllers/company.controller');
const router = express.Router();


router.get('/company', passport.authenticate("bearer", { session: false }),getAllCompanies)
router.get('/company/:id', passport.authenticate("bearer", { session: false }),getCompanyById)
router.post('/company', passport.authenticate("bearer", { session: false }),createCompany)
router.put('/company/:id', passport.authenticate("bearer", { session: false }),updateCompany)
router.delete('/company/:id', passport.authenticate("bearer", { session: false }),deleteCompany)


module.exports = router