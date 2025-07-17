const connection = require('../config/database');

const getRelatoriodeProcedimentos = (req, res) => {
    //O req.query faz o trabalho de selecionar os parâmetros usados na URL que vêm depois de um '?', isso torna a função mais escalável, exatamente como queremos a partir de agora.
    const { evento, medicao } = req.query;
    //Aqui, mudamos o formato para 'let' para nos permitir alterar ou incrementar o valor mais abaixo.
    let query = `SELECT p.id AS paciente_id, p.nome_completo, p.cpf, m.tipo_medicao AS tipo_medicao, m.valor_medicao AS valor_glicemia, ea.data_hora_evento \
                   FROM Pacientes p 
                    JOIN 
                        Atendimentos a ON p.id = a.paciente_id 
                    JOIN 
                        eventos_atendimento ea ON a.id = ea.atendimento_id 
                    JOIN 
                        Medicoes m ON ea.id = m.medicoes_do_evento` 

    //Torna-se necessário transformar os filtros usados em arrays, já que, estaremos relacionando o tipo de evento e o que foi calculado dentro da medição, alternando entre um e outro nos índices de array, segmentando melhor a informação sem perder a funcionalidade que abrange todos.         
    const filtros = [];
    const valores = [];

    if (evento) {
        filtros.push("ea.tipo_evento = ?");
        valores.push(evento);
    }
    //No caso de utilizarmos os dois filtros na URL, como citado no comentário acima, a info será segmentada e direcionada onde, por exemplo, a medição seja a respeito da glicemia capilar.
    if (medicao) {
        filtros.push("m.tipo_medicao = ?");
        valores.push(medicao);
    }
    //Aqui, verificamos se os tipos de evento e medição foram inclusos na lista de filtros, incrementando a nossa query ambas condicionais que sejam congruentes, e verdadeiras, aos filtros usados.
      if (filtros.length > 0) {
    query += " WHERE " + filtros.join(" AND ");
    }
    query += ";"

    connection.query(query, valores, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: 'Relatório gerado com sucesso.', filtros: { evento, medicao }, data: results});
    })
}

module.exports = {
    getRelatoriodeProcedimentos
};