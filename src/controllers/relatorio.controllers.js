const connection = require('../config/database');

const getPacientesComGlicemia = (req, res) => {

    const query = `SELECT p.id AS paciente_id, p.nome_completo, p.cpf, m.tipo_medicao AS tipo_medicao, m.valor_medicao AS valor_glicemia, ea.data_hora_evento \
                   FROM Pacientes p 
                    JOIN 
                        Atendimentos a ON p.id = a.paciente_id 
                    JOIN 
                        eventos_atendimento ea ON a.id = ea.atendimento_id 
                    JOIN 
                        Medicoes m ON ea.id = m.medicoes_do_evento 
                    WHERE 
                        ea.tipo_evento = 'Triagem' AND m.tipo_medicao = 'Glicemia Capilar';`

    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: 'Relatório gerado com sucesso.', data: results});
    })
}

module.exports = {
    getPacientesComGlicemia
};