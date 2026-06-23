package com.smartpillbox.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MedicamentoRequest {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    private String descricao;
    private String fabricante;
    private String principioAtivo;
}
