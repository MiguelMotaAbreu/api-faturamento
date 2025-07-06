CREATE DATABASE faturamento_db;
USE faturamento_db;

CREATE TABLE Pacientes (
id INT PRIMARY KEY AUTO_INCREMENT,
nome_completo VARCHAR(255) NOT NULL,
data_nascimento DATE,
cpf VARCHAR(14) UNIQUE NOT NULL
);

CREATE TABLE Atendimentos (
	id INT PRIMARY KEY AUTO_INCREMENT,
	paciente_id INT NOT NULL,
    data_hora_entrada DATETIME NOT NULL,
    data_hora_saida DATETIME NOT NULL,
    tipo_atendimento VARCHAR(100),
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id)
);

CREATE TABLE eventos_atendimento (
	id INT PRIMARY KEY AUTO_INCREMENT,
    atendimento_id INT NOT NULL,
    tipo_evento VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    data_hora_evento DATETIME NOT NULL,
	FOREIGN KEY (atendimento_id) REFERENCES Atendimentos(id)
);

CREATE TABLE Medicoes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    medicoes_do_evento INT NOT NULL,
    tipo_medicao VARCHAR(100) NOT NULL,
    valor_medicao VARCHAR(100) NOT NULL,
    FOREIGN KEY (medicoes_do_evento) REFERENCES eventos_atendimento(id)
);

INSERT INTO Pacientes (nome_completo, data_nascimento, cpf) 
VALUES ('Miguel Mota de Abreu', '2006-08-08', '498.128.018-12');

SELECT id FROM Pacientes WHERE cpf = '498.128.018-12';
INSERT INTO Atendimentos (paciente_id, data_hora_entrada, data_hora_saida, tipo_atendimento) 
VALUES (1, '2025-07-04 13:33:45', '2025-07-04 16:45:32', 'Clínica Geral');

SELECT id FROM Atendimentos WHERE paciente_id = 1;
INSERT INTO eventos_atendimento (atendimento_id, tipo_evento, descricao, data_hora_evento)
VALUES (1, 'Triagem', 'O paciente foi classficado como Azul', '2025-07-04 14:57:32');

SELECT id FROM eventos_atendimento WHERE atendimento_id = 1;
INSERT INTO Medicoes (medicoes_do_evento, tipo_medicao, valor_medicao)
VALUES (1, 'Glicemia Capilar',  '95');

SELECT Pacientes.nome_completo, Atendimentos.data_hora_entrada
FROM Pacientes
JOIN Atendimentos ON Pacientes.id = Atendimentos.paciente_id;

SELECT Pacientes.nome_completo, Atendimentos.data_hora_entrada, evento_atendimento.tipo_evento, evento_atendimento.descricao
FROM Pacientes
JOIN Atendimentos ON Pacientes.id = Atendimentos.paciente_id
JOIN evento_atendimento ON Atendimentos.id = eventos_atendimento.atendimento_id;

SELECT Pacientes.nome_completo, eventos_atendimento.tipo_evento, Medicoes.tipo_medicao, Medicoes.valor_medicao
FROM Pacientes
JOIN Atendimentos ON Pacientes.id = Atendimentos.paciente_id
JOIN eventos_atendimento ON Atendimentos.id = eventos_atendimento.atendimento_id
JOIN Medicoes ON eventos_atendimento.id = Medicoes.medicoes_do_evento
WHERE eventos_atendimento.tipo_evento = 'Triagem' AND Medicoes.tipo_medicao = 'Glicemia Capilar'
