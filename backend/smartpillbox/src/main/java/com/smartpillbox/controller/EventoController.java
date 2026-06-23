package com.smartpillbox.controller;

import com.smartpillbox.dto.response.ApiResponse;
import com.smartpillbox.dto.response.EventoResponse;
import com.smartpillbox.enums.Compartimento;
import com.smartpillbox.service.EventoService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/eventos")
@RequiredArgsConstructor
public class EventoController {

    private final EventoService eventoService;

    // Endpoint chamado pelo ESP32 quando a caixa é aberta
    @PostMapping("/confirmar/{pacienteId}/{compartimento}")
    public ResponseEntity<ApiResponse<EventoResponse>> confirmarAbertura(
            @PathVariable Long pacienteId,
            @PathVariable Compartimento compartimento) {
        return ResponseEntity.ok(ApiResponse.sucesso(
                eventoService.confirmarAbertura(pacienteId, compartimento)));
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<ApiResponse<List<EventoResponse>>> listarPorPaciente(
            @PathVariable Long pacienteId) {
        return ResponseEntity.ok(ApiResponse.sucesso(eventoService.listarPorPaciente(pacienteId)));
    }

    @GetMapping("/historico/{pacienteId}")
    public ResponseEntity<ApiResponse<List<EventoResponse>>> historico(
            @PathVariable Long pacienteId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        return ResponseEntity.ok(ApiResponse.sucesso(
                eventoService.historicoPorPaciente(pacienteId, inicio, fim)));
    }
}
