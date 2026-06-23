package com.smartpillbox.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PacienteRequest {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private LocalDate dataNascimento;
    private String telefone;
    private String endereco;
    private String contatoEmergencia;
    private String telefoneEmergencia;
    private String emailFamiliar;
    private Long medicoId;
}
