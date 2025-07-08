// Importando express, mysql2 e criando a instância definitiva do express no projeto.
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Middleware para o Express entender JSON, garantindo mais segurança e compatibilidade para as rotas quanto ao recebimento de dados.
app.use(express.json());

// Estabelecendo conexão com o banco de dados.
const PORT = 3000;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MiguelMota0102',
  database: 'faturamento_db'
});

//Criando as Rotas de requisição (GET)

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

//Rota para buscar TODOS os atendimentos
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

//Rota para buscar os Atendimentos identificados por ID
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

//Criando rotas para inserção de novos pacientes (POST)
app.post('/pacientes', (req, res) => {
    //Aqui, define-se o esqueleto do json para novos POSTs no banco de dados.
    const {nome_completo, data_nascimento, cpf} = req.body; //req.body cumpre essa função de guardar o esqueleto

    //Validando se os dados necessários do novo paciente a ser cadastrado estão devidamente preenchidos
    if (!nome_completo || !cpf){
      return res.status(400).json({message: 'Nome completo e CPF são obrigatórios.'});
    }
    //Inserção SQL a ser executada dentro do banco de dados.
    const sqlQuery = `INSERT INTO Pacientes (nome_completo, data_nascimento, cpf) VALUES (?, ?, ?);`;

    connection.query(sqlQuery, [nome_completo, data_nascimento, cpf], (err, results) => {
      if (err){
        console.error("Erro ao criar paciente: ", err);
        //A linha abaixo evita conflito de cadastros de pacientes pois retorna erro de duplicidade encontrada, caso seja verdadeiro.
        if(err.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({message: 'Este CPF já está cadastrado.'})
        }
        //Abrangendo qualquer outro tipo de erro
        return res.status(500).json({error: "Erro interno do servidor."})
      }
      const novoPacienteId = results.insertId; //Id em que foi cadastrado o novo paciente
      res.status(201).json({ id: novoPacienteId, nome_completo, data_nascimento, cpf }); //Retornando o Id e o cadastro do paciente efetuado com sucesso nos parâmetros do banco de dados.
    })
})

//Inicializando o servidor
app.listen(PORT, () => {
  console.log(`API de Faturamento rodando em http://localhost:${PORT}`);
});


