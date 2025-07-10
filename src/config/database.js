//Arquivo especialmente criado para englobar toda parte de banco de dados que envolva o mysql2

const mysql = require('mysql2');

// Cria a conexão com o banco
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MiguelMota0102',
  database: 'faturamento_db'
});

// "Exporta" a conexão para que outros arquivos possam usá-la
module.exports = connection;