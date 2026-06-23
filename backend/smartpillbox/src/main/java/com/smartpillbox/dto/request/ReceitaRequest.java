package com.smartpillbox.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ReceitaRequest {
    @NotNull(message = "Paciente é obrigatório")
    private Long pacienteId;

    @NotNull(message = "Data de início é obrigatória")
    private LocalDate dataInicio;

    private LocalDate dataFim;
    private String observacoes;

    @NotNull(message = "Itens são obrigatórios")
    private List<ItemReceitaRequest> itens;
}
