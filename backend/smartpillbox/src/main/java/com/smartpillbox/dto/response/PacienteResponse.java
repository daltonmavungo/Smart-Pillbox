package com.smartpillbox.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PacienteResponse {
    private Long id;
    private String nome;
    private LocalDate dataNascimento;
    private String telefone;
    private String endereco;
    private String contatoEmergencia;
    private String telefoneEmergencia;
    private String emailFamiliar;
    private Boolean ativo;
    private LocalDateTime criadoEm;
    private String medicoNome;
}
