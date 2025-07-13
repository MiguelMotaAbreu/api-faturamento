const express = require('express');

// Importamos nosso direcionador de rotas
const pacientesRoutes = require('./routes/pacientes.routes.js');
const atendimentosRoutes = require('./routes/atendimentos.routes.js')
const relatoriosRoutes = require('./routes/relatorios.routes.js')

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Aqui estamos simplificando o uso do app.use, indicando apenas a URL inicial e de onde ele deve tirar a função.
// Basicamente, qualquer interação que comece a URL com 'pacientes', a instância será responsável por procurar a melhor alternativa para aquele caso.
app.use('/pacientes', pacientesRoutes);
app.use('/atendimentos', atendimentosRoutes);
app.use('/relatorios', relatoriosRoutes);

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log(`API de Faturamento rodando em http://localhost:${PORT}`);
});


