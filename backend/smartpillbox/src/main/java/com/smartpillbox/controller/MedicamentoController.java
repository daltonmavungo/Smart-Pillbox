package com.smartpillbox.controller;

import com.smartpillbox.dto.request.MedicamentoRequest;
import com.smartpillbox.dto.response.ApiResponse;
import com.smartpillbox.entity.Medicamento;
import com.smartpillbox.service.MedicamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicamentos")
@RequiredArgsConstructor
public class MedicamentoController {

    private final MedicamentoService medicamentoService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<ApiResponse<Medicamento>> criar(@Valid @RequestBody MedicamentoRequest request) {
        return ResponseEntity.ok(ApiResponse.sucesso(medicamentoService.criar(request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Medicamento>>> listarTodos() {
        return ResponseEntity.ok(ApiResponse.sucesso(medicamentoService.listarTodos()));
    }

    @GetMapping("/buscar")
    public ResponseEntity<ApiResponse<List<Medicamento>>> buscar(@RequestParam String nome) {
        return ResponseEntity.ok(ApiResponse.sucesso(medicamentoService.buscarPorNome(nome)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Medicamento>> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.sucesso(medicamentoService.buscarPorId(id)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<ApiResponse<Medicamento>> atualizar(
            @PathVariable Long id, @Valid @RequestBody MedicamentoRequest request) {
        return ResponseEntity.ok(ApiResponse.sucesso(medicamentoService.atualizar(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deletar(@PathVariable Long id) {
        medicamentoService.deletar(id);
        return ResponseEntity.ok(ApiResponse.sucesso("Medicamento removido", null));
    }
}
