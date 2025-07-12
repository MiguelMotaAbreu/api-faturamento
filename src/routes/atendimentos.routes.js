const express = require('express');
const router = express.Router();

const atendimentosController = require('../controllers/atendimento.controllers');

router.get('/', atendimentosController.getAllAtendimentos);
router.get('/:id', atendimentosController.getAtendimentosById);
router.post('/', atendimentosController.createAtendimento);
router.put('/:id', atendimentosController.updateAtendimento);
router.delete('/:id', atendimentosController.deleteAtendimento);

module.exports = router;