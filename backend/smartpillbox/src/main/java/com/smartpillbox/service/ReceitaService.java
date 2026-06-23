package com.smartpillbox.service;

import com.smartpillbox.dto.request.ReceitaRequest;
import com.smartpillbox.dto.response.ReceitaResponse;

import java.util.List;

public interface ReceitaService {
    ReceitaResponse criar(ReceitaRequest request, String emailMedico);
    ReceitaResponse buscarPorId(Long id);
    List<ReceitaResponse> listarPorPaciente(Long pacienteId);
    ReceitaResponse atualizar(Long id, ReceitaRequest request);
    void desativar(Long id);
}
