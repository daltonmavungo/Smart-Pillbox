package com.smartpillbox.repository;

import com.smartpillbox.entity.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByPacienteId(Long pacienteId);
    List<Receita> findByPacienteIdAndAtivaTrue(Long pacienteId);

    @Query("SELECT r FROM Receita r WHERE r.paciente.id = :pacienteId " +
           "AND r.ativa = true AND (r.dataFim IS NULL OR r.dataFim >= :hoje)")
    Optional<Receita> findReceitaAtivaPorPaciente(Long pacienteId, LocalDate hoje);
}
