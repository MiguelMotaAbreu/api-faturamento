//Somente neste arquivo se faz necessária a presença de lógica das rotas
const express = require('express');
const router = express.Router(); // Usamos o Router do Express

// Importando "paciente.controller.js" para termos uma função específica para cada rota colocada
const pacienteController = require('../controllers/paciente.controllers');

// Aqui definimos qual rota vai usar qual função para cumprir seu papel, seja um POST, GET...
router.get('/', pacienteController.getAllPacientes);
router.post('/', pacienteController.createPaciente);
router.get('/:id', pacienteController.getPacienteById);
router.put('/:id', pacienteController.updatePaciente);
router.delete('/:id', pacienteController.deletePaciente);

// Exportamos todas as manifestações acima do router
module.exports = router;