package com.smartpillbox.entity;

import com.smartpillbox.enums.Compartimento;
import com.smartpillbox.enums.StatusEvento;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "eventos_remedio")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventoRemedio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_receita_id")
    private ItemReceita itemReceita;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Compartimento compartimento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusEvento status;

    @Column(name = "horario_previsto", nullable = false)
    private LocalDateTime horarioPrevisto;

    @Column(name = "horario_confirmado")
    private LocalDateTime horarioConfirmado;

    @Column(name = "alerta_enviado")
    private Boolean alertaEnviado = false;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
    }
}
