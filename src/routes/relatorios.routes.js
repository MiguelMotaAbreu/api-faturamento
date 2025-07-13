const express = require('express');
const router = express.Router();

const relatoriosController = require('../controllers/relatorio.controllers');

router.get('/pacientes-glicemia-triagem', relatoriosController.getPacientesComGlicemia);

module.exports = router;