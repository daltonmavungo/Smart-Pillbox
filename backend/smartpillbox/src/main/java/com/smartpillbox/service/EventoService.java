package com.smartpillbox.service;

import com.smartpillbox.dto.response.EventoResponse;
import com.smartpillbox.entity.EventoRemedio;
import com.smartpillbox.entity.Paciente;
import com.smartpillbox.enums.Compartimento;
import com.smartpillbox.enums.StatusEvento;
import com.smartpillbox.exception.ResourceNotFoundException;
import com.smartpillbox.repository.EventoRemedioRepository;
import com.smartpillbox.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final EventoRemedioRepository eventoRepository;
    private final PacienteRepository pacienteRepository;

    public EventoResponse confirmarAbertura(Long pacienteId, Compartimento compartimento) {
        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado"));

        // Busca evento pendente mais recente deste compartimento
        List<EventoRemedio> pendentes = eventoRepository
                .findByPacienteIdAndStatus(pacienteId, StatusEvento.PENDENTE);

        EventoRemedio evento = pendentes.stream()
                .filter(e -> e.getCompartimento() == compartimento)
                .findFirst()
                .orElseGet(() -> {
                    // Cria evento manual se não existir
                    EventoRemedio novo = EventoRemedio.builder()
                            .paciente(paciente)
                            .compartimento(compartimento)
                            .status(StatusEvento.CONFIRMADO)
                            .horarioPrevisto(LocalDateTime.now())
                            .horarioConfirmado(LocalDateTime.now())
                            .alertaEnviado(false)
                            .build();
                    return eventoRepository.save(novo);
                });

        evento.setStatus(StatusEvento.CONFIRMADO);
        evento.setHorarioConfirmado(LocalDateTime.now());
        return toResponse(eventoRepository.save(evento));
    }

    public List<EventoResponse> historicoPorPaciente(Long pacienteId, LocalDateTime inicio, LocalDateTime fim) {
        return eventoRepository.findHistoricoPorPeriodo(pacienteId, inicio, fim)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<EventoResponse> listarPorPaciente(Long pacienteId) {
        return eventoRepository.findByPacienteId(pacienteId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    private EventoResponse toResponse(EventoRemedio e) {
        return EventoResponse.builder()
                .id(e.getId())
                .pacienteId(e.getPaciente().getId())
                .pacienteNome(e.getPaciente().getNome())
                .compartimento(e.getCompartimento())
                .status(e.getStatus())
                .horarioPrevisto(e.getHorarioPrevisto())
                .horarioConfirmado(e.getHorarioConfirmado())
                .alertaEnviado(e.getAlertaEnviado())
                .criadoEm(e.getCriadoEm())
                .build();
    }
}
