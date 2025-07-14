-- Adicionando ON DELETE CASCADE para garantir a integridade dos dados ao deletar um registro pai.
ALTER TABLE Atendimentos DROP FOREIGN KEY atendimentos_ibfk_1;

ALTER TABLE Atendimentos
ADD CONSTRAINT fk_atendimentos_pacientes
FOREIGN KEY (paciente_id) REFERENCES Pacientes(id) ON DELETE CASCADE;

ALTER TABLE eventos_atendimento DROP FOREIGN KEY eventos_atendimento_ibfk_1;

ALTER TABLE eventos_atendimento
ADD CONSTRAINT fk_eventos_atendimento
FOREIGN KEY (atendimento_id) REFERENCES Atendimentos(id) ON DELETE CASCADE;

ALTER TABLE Medicoes DROP FOREIGN KEY medicoes_ibfk_1;

ALTER TABLE Medicoes
ADD CONSTRAINT fk_medicoes
FOREIGN KEY (medicoes_do_evento) REFERENCES eventos_atendimento(id) ON DELETE CASCADE;