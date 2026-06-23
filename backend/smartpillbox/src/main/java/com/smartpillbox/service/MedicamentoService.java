package com.smartpillbox.service;

import com.smartpillbox.dto.request.MedicamentoRequest;
import com.smartpillbox.dto.response.ApiResponse;
import com.smartpillbox.entity.Medicamento;
import com.smartpillbox.exception.ResourceNotFoundException;
import com.smartpillbox.repository.MedicamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicamentoService {

    private final MedicamentoRepository medicamentoRepository;

    public Medicamento criar(MedicamentoRequest request) {
        Medicamento med = Medicamento.builder()
                .nome(request.getNome())
                .descricao(request.getDescricao())
                .fabricante(request.getFabricante())
                .principioAtivo(request.getPrincipioAtivo())
                .build();
        return medicamentoRepository.save(med);
    }

    public List<Medicamento> listarTodos() {
        return medicamentoRepository.findAll();
    }

    public List<Medicamento> buscarPorNome(String nome) {
        return medicamentoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Medicamento buscarPorId(Long id) {
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medicamento não encontrado"));
    }

    public Medicamento atualizar(Long id, MedicamentoRequest request) {
        Medicamento med = buscarPorId(id);
        med.setNome(request.getNome());
        med.setDescricao(request.getDescricao());
        med.setFabricante(request.getFabricante());
        med.setPrincipioAtivo(request.getPrincipioAtivo());
        return medicamentoRepository.save(med);
    }

    public void deletar(Long id) {
        medicamentoRepository.deleteById(id);
    }
}
