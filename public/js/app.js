//Funciona em conjunto com o 'defer' em index.html, esperando o conteúdo da página ser carregado antes de executar o script, baixando o conteúdo de app sem interromper o carregamento, colocando ordem na execução.
document.addEventListener('DOMContentLoaded', () =>{

    //Relacionando os elementos html que mais interagiremos com constantes, facilitando o acesso e chamamento
    const filtroEvento = document.getElementById('filtro-evento');
    const filtroMedicao = document.getElementById('filtro-medicao');
    const btnBuscar = document.getElementById('btn-buscar');
    const tabelaResultados = document.getElementById('tabela-resultados');
    const msgSemResultados = document.getElementById('sem-resultados');

    console.log('Elementos relacionados:', {
        filtroEvento,
        filtroMedicao,
        btnBuscar,
        tabelaResultados,
        msgSemResultados
    })


    //Conectando o ato de clicar o botão com a conexão com a API e para isso, precisamos de uma função
    //Em primeiro momento ela precisa ser uma função 'anônima', como ela está vazia, ela espera até que seja devidamente preenchida, evitando dor de cabeça de retornar valor undefined
    btnBuscar.addEventListener('click', () => {
        //Também precisamos dos filtros selecionados para serem usados como parâmetros dentro da busca dos dados
        const evento = filtroEvento.value;
        const medicao = filtroMedicao.value;
        //Agora sim os valores são devidamente preenchidos e retornados após o 'click'
        buscarDadosNaAPI(evento, medicao)
    });
    async function buscarDadosNaAPI(evento, medicao) {
        //Verificação mais exata e sucinta, ao invés de apenas verificar se os valores estão vazios com ""
        if (!evento && !medicao) {
            alert('Por favor, selecione ao menos um filtro para a busca.');
            return;
        }
        //Aqui, além de estabelecermos uma url de ponto de partida, também criamos um URLSearchParams, um gerenciador que cuida dos mínimos detalhes quando o assunto são os possíveis e impossíveis parâmetros da URL
        const urlBase = 'http://localhost:3000/relatorios/procedimentos'
        const params = new URLSearchParams();

        if (evento) {
            //Simplificando o uso, funciona como um objeto em JS, criando a etiqueta e atribuindo valor a ela.
            //Nesse caso, só adicionando a etiqueta na url, SE evento estiver preenchido
            params.append('evento', evento);
        }
        //Fazendo o mesmo com o possível parâmetro de medição
        if (medicao) {
            params.append('medicao', medicao);
        }
        const urlFinal = `${urlBase}?${params.toString()}`;

        //Elaborando o caminho 'feliz', onde tudo é executado corretamente
        try {
            //Guardando o status de resposta do mensageiro 'fetch' com a nossa API, usando a URL como endereço para buscar a info
            const response = await fetch(urlFinal);
            //response.ok abrange os valores de status que indicam sucesso na entrega da resposta, com '!' é justamente o contrário
            if (!response.ok) {
                throw new Error('A resposta da rede não foi OK');
            }
            //Response é tudo o que é a resposta do nosso mensageiro, sendo assim, podemos formatar a mensagem antes dela ser entregue
            const dados = await response.json();

            //Exibindo a mensagem entregue
            renderizarTabelas(dados.data);
        }
        //Caso algo saia do caminho 'feliz'
        catch (error) {
            console.error('Houve um problema coma a requisição fetch: ', error);
        }

    }
    function renderizarTabelas(dados){
        //Limpando a tabela de possíveis vestígios de outras pesquisas feitas anteriormente
        tabelaResultados.innerHTML = '';
        //Verificando se há ocorrência de dados no banco de dados que combinem com os parâmetros usados na URL
        if (dados.length === 0) {
            msgSemResultados.style.display = 'block' //Retornando a mensagem caso não haja ocorrência
        } else {
            msgSemResultados.style.display = 'none' //Escondendo a mensagem, pois foram encontrados dados nessas especificações
        }
        dados.forEach(item => {
            //Loop para criar uma Table Row, uma linha, conforme cada item que for requisitado para ser preenchido e alocado na tabela
            const linha = document.createElement('tr');
            //Criando e preenchendo cada célula da tabela com seu respectivo valor
            linha.innerHTML = `
                <td>${item.nome_completo}</td>
                <td>${item.cpf}</td>
                <td>${item.paciente_id}</td> 
                <td>${item.tipo_medicao}</td>
                <td>${item.valor_glicemia}</td>
                <td>${new Date(item.data_hora_evento).toLocaleString('pt-BR')}</td>
                `;
                //Adiciona a linha completamente preenchida a tabela final de ersltados
                tabelaResultados.appendChild(linha);
        })
    }

})

