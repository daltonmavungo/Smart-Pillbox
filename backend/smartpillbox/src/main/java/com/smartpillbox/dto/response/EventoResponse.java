package com.smartpillbox.dto.response;

import com.smartpillbox.enums.Compartimento;
import com.smartpillbox.enums.StatusEvento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventoResponse {
    private Long id;
    private Long pacienteId;
    private String pacienteNome;
    private Compartimento compartimento;
    private StatusEvento status;
    private LocalDateTime horarioPrevisto;
    private LocalDateTime horarioConfirmado;
    private Boolean alertaEnviado;
    private LocalDateTime criadoEm;
}
