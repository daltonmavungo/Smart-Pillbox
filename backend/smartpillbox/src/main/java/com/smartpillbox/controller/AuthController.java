package com.smartpillbox.controller;

import com.smartpillbox.dto.request.LoginRequest;
import com.smartpillbox.dto.request.UsuarioRequest;
import com.smartpillbox.dto.response.ApiResponse;
import com.smartpillbox.dto.response.LoginResponse;
import com.smartpillbox.dto.response.UsuarioResponse;
import com.smartpillbox.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.sucesso(authService.login(request)));
    }

    @PostMapping("/registrar")
    public ResponseEntity<ApiResponse<UsuarioResponse>> registrar(@Valid @RequestBody UsuarioRequest request) {
        return ResponseEntity.ok(ApiResponse.sucesso("Utilizador registado com sucesso", authService.registrar(request)));
    }
}
