// Criação isolada das querys em SQL, corretamente configuradas com possíveis erros e resultados. Podendo ser exportadas para outros arquivos.

// Importa a conexão que acabamos de isolar
const connection = require('../config/database');

// Cada função corresponde a uma rota e contém a lógica que estava nela em server.js
const getAllPacientes = (req, res) => {
  connection.query("SELECT * FROM Pacientes;", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json(results);
  });
};

const getPacienteById = (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM Pacientes WHERE id = ?;", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Paciente não encontrado." });
    return res.json(results[0]);
  });
};

const createPaciente = (req, res) => {
  const { nome_completo, data_nascimento, cpf } = req.body;
  if (!nome_completo || !cpf) return res.status(400).json({ message: 'Nome e CPF são obrigatórios.' });

  const query = "INSERT INTO Pacientes (nome_completo, data_nascimento, cpf) VALUES (?, ?, ?);";
  connection.query(query, [nome_completo, data_nascimento, cpf], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Este CPF já está cadastrado.'});
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json({ id: results.insertId, nome_completo, data_nascimento, cpf });
  });
};

const updatePaciente = (req, res) => {
  const { id } = req.params;
  const { nome_completo, data_nascimento, cpf } = req.body;
  if (!nome_completo || !cpf) return res.status(400).json({ message: 'Nome e CPF são obrigatórios.' });

  const query = "UPDATE Pacientes SET nome_completo = ?, data_nascimento = ?, cpf = ? WHERE id = ?;";
  connection.query(query, [nome_completo, data_nascimento, cpf, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Paciente não encontrado.' });
    return res.status(200).json({ message: 'Paciente atualizado com sucesso.', id: id });
  });
};

const deletePaciente = (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM Pacientes WHERE id = ?;", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Paciente não encontrado.' });
    return res.status(204).send();
  });
};

// Exportando todas as funções para que outro arquivo possa usá-las
module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};