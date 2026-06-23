package com.smartpillbox.controller;

import com.smartpillbox.dto.request.ReceitaRequest;
import com.smartpillbox.dto.response.ApiResponse;
import com.smartpillbox.dto.response.ReceitaResponse;
import com.smartpillbox.service.ReceitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@RequiredArgsConstructor
public class ReceitaController {

    private final ReceitaService receitaService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<ApiResponse<ReceitaResponse>> criar(
            @Valid @RequestBody ReceitaRequest request,
            Authentication auth) {
        return ResponseEntity.ok(ApiResponse.sucesso(receitaService.criar(request, auth.getName())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ReceitaResponse>> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.sucesso(receitaService.buscarPorId(id)));
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<ApiResponse<List<ReceitaResponse>>> listarPorPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(ApiResponse.sucesso(receitaService.listarPorPaciente(pacienteId)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<ApiResponse<ReceitaResponse>> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody ReceitaRequest request,
            Authentication auth) {
        return ResponseEntity.ok(ApiResponse.sucesso(receitaService.atualizar(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<ApiResponse<Void>> desativar(@PathVariable Long id) {
        receitaService.desativar(id);
        return ResponseEntity.ok(ApiResponse.sucesso("Receita desactivada", null));
    }
}
