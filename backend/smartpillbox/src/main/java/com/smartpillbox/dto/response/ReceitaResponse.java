package com.smartpillbox.dto.response;

import com.smartpillbox.enums.Compartimento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReceitaResponse {
    private Long id;
    private Long pacienteId;
    private String pacienteNome;
    private String medicoNome;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String observacoes;
    private Boolean ativa;
    private LocalDateTime criadoEm;
    private List<ItemReceitaResponse> itens;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ItemReceitaResponse {
        private Long id;
        private Long medicamentoId;
        private String medicamentoNome;
        private String dosagem;
        private Compartimento compartimento;
        private LocalTime horario;
        private String diasSemana;
        private String instrucoes;
    }
}
