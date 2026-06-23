package com.smartpillbox.service;

import com.smartpillbox.dto.request.PacienteRequest;
import com.smartpillbox.dto.response.PacienteResponse;

import java.util.List;

public interface PacienteService {
    PacienteResponse criar(PacienteRequest request);
    PacienteResponse buscarPorId(Long id);
    List<PacienteResponse> listarTodos();
    List<PacienteResponse> buscarPorNome(String nome);
    PacienteResponse atualizar(Long id, PacienteRequest request);
    void desativar(Long id);
}
