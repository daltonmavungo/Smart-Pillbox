package com.smartpillbox.controller;

import com.smartpillbox.dto.request.PacienteRequest;
import com.smartpillbox.dto.response.ApiResponse;
import com.smartpillbox.dto.response.PacienteResponse;
import com.smartpillbox.service.PacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteService pacienteService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<ApiResponse<PacienteResponse>> criar(@Valid @RequestBody PacienteRequest request) {
        return ResponseEntity.ok(ApiResponse.sucesso(pacienteService.criar(request)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PacienteResponse>> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.sucesso(pacienteService.buscarPorId(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PacienteResponse>>> listarTodos() {
        return ResponseEntity.ok(ApiResponse.sucesso(pacienteService.listarTodos()));
    }

    @GetMapping("/buscar")
    public ResponseEntity<ApiResponse<List<PacienteResponse>>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(ApiResponse.sucesso(pacienteService.buscarPorNome(nome)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<ApiResponse<PacienteResponse>> atualizar(
            @PathVariable Long id, @Valid @RequestBody PacienteRequest request) {
        return ResponseEntity.ok(ApiResponse.sucesso(pacienteService.atualizar(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> desativar(@PathVariable Long id) {
        pacienteService.desativar(id);
        return ResponseEntity.ok(ApiResponse.sucesso("Paciente desactivado", null));
    }
}
