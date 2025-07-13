//Assim como há um controller somente para as rotas relacionadas a pacientes, o mesmo ocorre com as rotas de Atendimentos.
//Por exemplo: Não é regra todas tabelas possuírem rotas para as mesmas, no entanto, sempre que uma tabela apresenta algo que preenche uma chave entre duas características de duas tabelas diferentes, a criação das rotas é indicada.

const { json } = require("express");
const connection = require("../config/database");

const getAllAtendimentos = (req, res) => {
    //Novamente, se a função tem objetivo de abranger toda uma tabela, não há necessidade de definir parâmetros em 'req'
    connection.query("SELECT * FROM Atendimentos;", (err, results) => {
        if (err) return res.status(500).json({ error: err.message }); //Em caso do decorrer da condição estiver na mesma linha do 'if', não há necessidade de chaves.
        return res.json(results)
    });
};

const getAtendimentosById = (req, res) => {
    const {id} = req.params;
    connection.query("SELECT * FROM Atendimentos WHERE id = ?;", [id], (err, results) => {
        if (err) return res.status(500).json({ error:err.message });
        if (results.length === 0) return res.status(404).json({ message: "Atendimento não encontrado." });
        return res.json(results[0])
    });
};

const createAtendimento = (req, res) => {
    const { paciente_id, data_hora_entrada, data_hora_saida, tipo_atendimento } = req.body;
    if (!paciente_id || !data_hora_entrada ||!tipo_atendimento) return res.status(400).json({ message: 'O id do paciente, a data e hora em que ele entrou e o tipo de atendimento são obrigatórios para registrar um novo Atendimento.' });

    const query = "INSERT INTO Atendimentos (paciente_id, data_hora_entrada, data_hora_saida, tipo_atendimento) VALUES (?, ?, ?, ?);";
    connection.query(query, [paciente_id, data_hora_entrada, data_hora_saida, tipo_atendimento], (err, results) => {
        if (err) return res.status(500).json({ error:err.message });
        return res.status(201).json({ id: results.insertId, paciente_id, data_hora_entrada, data_hora_saida, tipo_atendimento});
    });
};

const updateAtendimento = (req, res) => {
    const {id} = req.params;
    const {paciente_id, data_hora_entrada, data_hora_saida, tipo_atendimento } = req.body;
    if (!paciente_id || !data_hora_saida) return res.status(400).json({ message: 'É obrigatório indicar o id do Paciente e o momento em que ele encerrou seu atendimento.' });

    const query = "UPDATE Atendimentos SET paciente_id = ?, data_hora_entrada = ?, data_hora_saida = ?, tipo_atendimento = ? WHERE id = ?;";
    connection.query(query, [paciente_id, data_hora_entrada, data_hora_saida, tipo_atendimento, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Atendimento não encontrado.' });
        return res.status(200).json({ message: 'Atendimento atualizado com sucesso.', id: id });
    });
};

const deleteAtendimento = (req, res) => {
    const {id} = req.params;
    connection.query("DELETE FROM Atendimentos WHERE id = ?;", [id], (err, results) => {
        if (err) return res.status(500).json({error: err.message});
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Atendimento não encontrado.' }); //Lembremos que o DELETE, assim como o UPDATE, retorna um objeto de linhas que foram afetadas por sua ação
        return res.status(204).send();
    });
};

module.exports = {
    getAllAtendimentos,
    getAtendimentosById,
    createAtendimento,
    updateAtendimento,
    deleteAtendimento
};