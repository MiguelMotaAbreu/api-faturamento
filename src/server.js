// Importando express, mysql2 e criando a instância definitiva do express no projeto.
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Estabelecendo conexão com o banco de dados.
const PORT = 3000;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MiguelMota0102',
  database: 'faturamento_db'
});

//Criando as Rotas

// Rota raiz, da 'página inicial'
app.get('/', (req, res) => {
  res.send('<h1>API de Faturamento está funcionando!</h1>');
});


// Rota para buscar TODOS os pacientes
app.get('/pacientes', (req, res) => {
  const sqlQuery = "SELECT * FROM Pacientes;";

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Erro ao buscar pacientes: ", err);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
    return res.json(results);
  });
});


// Rota para buscar UM paciente em específico por ID
app.get('/pacientes/:id', (req, res) => {
    const pacienteId = req.params.id;
    const sqlQuery = "SELECT * FROM Pacientes WHERE id = ?;";

  connection.query(sqlQuery, [pacienteId], (err, results) => {
    if (err) {
      console.error("Erro ao buscar paciente por ID: ", err);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }

    //Verificando se o paciente realmente foi encontrado
    if (results.length === 0) {
      return res.status(404).json({ message: "Paciente não encontrado." });
    }

    //Retornando apenas o primeiro elemento do array, já que o id é único, só precisamos que ele exiba o primeiro.
    return res.json(results[0]);
  });
});

//Rota para TODOS os atendimentos
app.get('/atendimentos', (req, res) => {
  const sqlQuery = `SELECT * FROM Atendimentos;`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Erro ao buscar os Atendimentos: ", err);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
    return res.json(results);
  })
})

//Rota para os Atendimentos identificados por ID
app.get('/atendimentos/:id', (req, res) => {
  const atendimentosID = req.params.id;
  const sqlQuery = `SELECT * FROM Atendimentos WHERE id = ?;`;

  connection.query(sqlQuery, [atendimentosID], (err, results) => {
    if (err) {
      console.error("Error ao buscar o Atendimento por ID: ", err);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
    if (results.length === 0){
      return res.status(404).json({ message: "Atendimento não encontrado." });
    }
    return res.json(results[0]);
  })
})

//Inicializando o servidor
app.listen(PORT, () => {
  console.log(`API de Faturamento rodando em http://localhost:${PORT}`);
});


