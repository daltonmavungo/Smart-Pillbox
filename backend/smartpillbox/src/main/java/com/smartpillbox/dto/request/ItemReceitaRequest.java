package com.smartpillbox.dto.request;

import com.smartpillbox.enums.Compartimento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class ItemReceitaRequest {
    @NotNull(message = "Medicamento é obrigatório")
    private Long medicamentoId;

    @NotBlank(message = "Dosagem é obrigatória")
    private String dosagem;

    @NotNull(message = "Compartimento é obrigatório")
    private Compartimento compartimento;

    @NotNull(message = "Horário é obrigatório")
    private LocalTime horario;

    private String diasSemana = "1,2,3,4,5,6,7";
    private String instrucoes;
}
