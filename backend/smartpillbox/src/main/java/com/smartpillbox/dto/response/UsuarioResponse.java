package com.smartpillbox.dto.response;

import com.smartpillbox.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResponse {
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private UserRole role;
    private Boolean ativo;
    private LocalDateTime criadoEm;
}
