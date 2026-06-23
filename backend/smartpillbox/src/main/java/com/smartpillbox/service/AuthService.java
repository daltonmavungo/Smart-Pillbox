package com.smartpillbox.service;

import com.smartpillbox.dto.request.LoginRequest;
import com.smartpillbox.dto.request.UsuarioRequest;
import com.smartpillbox.dto.response.LoginResponse;
import com.smartpillbox.dto.response.UsuarioResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    UsuarioResponse registrar(UsuarioRequest request);
}
