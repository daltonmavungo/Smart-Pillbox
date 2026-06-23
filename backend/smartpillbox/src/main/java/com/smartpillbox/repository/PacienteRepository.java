package com.smartpillbox.repository;

import com.smartpillbox.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByAtivoTrue();
    List<Paciente> findByMedicoId(Long medicoId);

    @Query("SELECT p FROM Paciente p WHERE p.ativo = true AND " +
           "(LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%')))")
    List<Paciente> buscarPorNome(String nome);
}
