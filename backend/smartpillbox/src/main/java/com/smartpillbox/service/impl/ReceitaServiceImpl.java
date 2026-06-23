package com.smartpillbox.service.impl;

import com.smartpillbox.dto.request.ItemReceitaRequest;
import com.smartpillbox.dto.request.ReceitaRequest;
import com.smartpillbox.dto.response.ReceitaResponse;
import com.smartpillbox.entity.*;
import com.smartpillbox.exception.ResourceNotFoundException;
import com.smartpillbox.repository.*;
import com.smartpillbox.service.ReceitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReceitaServiceImpl implements ReceitaService {

    private final ReceitaRepository receitaRepository;
    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final MedicamentoRepository medicamentoRepository;

    @Override
    @Transactional
    public ReceitaResponse criar(ReceitaRequest request, String emailMedico) {
        Paciente paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado"));

        Usuario medico = usuarioRepository.findByEmail(emailMedico)
                .orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado"));

        Receita receita = Receita.builder()
                .paciente(paciente)
                .medico(medico)
                .dataInicio(request.getDataInicio())
                .dataFim(request.getDataFim())
                .observacoes(request.getObservacoes())
                .ativa(true)
                .build();

        List<ItemReceita> itens = request.getItens().stream().map(itemReq -> {
            Medicamento med = medicamentoRepository.findById(itemReq.getMedicamentoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Medicamento não encontrado"));
            return ItemReceita.builder()
                    .receita(receita)
                    .medicamento(med)
                    .dosagem(itemReq.getDosagem())
                    .compartimento(itemReq.getCompartimento())
                    .horario(itemReq.getHorario())
                    .diasSemana(itemReq.getDiasSemana())
                    .instrucoes(itemReq.getInstrucoes())
                    .build();
        }).collect(Collectors.toList());

        receita.setItens(itens);
        return toResponse(receitaRepository.save(receita));
    }

    @Override
    public ReceitaResponse buscarPorId(Long id) {
        return toResponse(receitaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receita não encontrada")));
    }

    @Override
    public List<ReceitaResponse> listarPorPaciente(Long pacienteId) {
        return receitaRepository.findByPacienteId(pacienteId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ReceitaResponse atualizar(Long id, ReceitaRequest request) {
        Receita receita = receitaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receita não encontrada"));
        receita.setDataInicio(request.getDataInicio());
        receita.setDataFim(request.getDataFim());
        receita.setObservacoes(request.getObservacoes());
        return toResponse(receitaRepository.save(receita));
    }

    @Override
    public void desativar(Long id) {
        Receita receita = receitaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receita não encontrada"));
        receita.setAtiva(false);
        receitaRepository.save(receita);
    }

    private ReceitaResponse toResponse(Receita r) {
        List<ReceitaResponse.ItemReceitaResponse> itens = r.getItens() == null ? List.of() :
                r.getItens().stream().map(i -> ReceitaResponse.ItemReceitaResponse.builder()
                        .id(i.getId())
                        .medicamentoId(i.getMedicamento().getId())
                        .medicamentoNome(i.getMedicamento().getNome())
                        .dosagem(i.getDosagem())
                        .compartimento(i.getCompartimento())
                        .horario(i.getHorario())
                        .diasSemana(i.getDiasSemana())
                        .instrucoes(i.getInstrucoes())
                        .build()).collect(Collectors.toList());

        return ReceitaResponse.builder()
                .id(r.getId())
                .pacienteId(r.getPaciente().getId())
                .pacienteNome(r.getPaciente().getNome())
                .medicoNome(r.getMedico().getNome())
                .dataInicio(r.getDataInicio())
                .dataFim(r.getDataFim())
                .observacoes(r.getObservacoes())
                .ativa(r.getAtiva())
                .criadoEm(r.getCriadoEm())
                .itens(itens)
                .build();
    }
}
