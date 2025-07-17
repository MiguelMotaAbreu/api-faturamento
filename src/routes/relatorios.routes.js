const express = require('express');
const router = express.Router();

const relatoriosController = require('../controllers/relatorio.controllers');

router.get('/procedimentos', relatoriosController.getRelatoriodeProcedimentos);

module.exports = router;