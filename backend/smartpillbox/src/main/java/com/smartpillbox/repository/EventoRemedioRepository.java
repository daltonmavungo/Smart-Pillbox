package com.smartpillbox.repository;

import com.smartpillbox.entity.EventoRemedio;
import com.smartpillbox.enums.StatusEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventoRemedioRepository extends JpaRepository<EventoRemedio, Long> {
    List<EventoRemedio> findByPacienteId(Long pacienteId);
    List<EventoRemedio> findByPacienteIdAndStatus(Long pacienteId, StatusEvento status);

    @Query("SELECT e FROM EventoRemedio e WHERE e.status = 'PENDENTE' " +
           "AND e.horarioPrevisto <= :limite AND e.alertaEnviado = false")
    List<EventoRemedio> findEventosPendentesParaAlerta(LocalDateTime limite);

    @Query("SELECT e FROM EventoRemedio e WHERE e.paciente.id = :pacienteId " +
           "AND e.horarioPrevisto BETWEEN :inicio AND :fim ORDER BY e.horarioPrevisto DESC")
    List<EventoRemedio> findHistoricoPorPeriodo(Long pacienteId, LocalDateTime inicio, LocalDateTime fim);
}
