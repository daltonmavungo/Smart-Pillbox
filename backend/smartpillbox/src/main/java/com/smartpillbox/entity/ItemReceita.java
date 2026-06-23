package com.smartpillbox.entity;

import com.smartpillbox.enums.Compartimento;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "itens_receita")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemReceita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receita_id", nullable = false)
    private Receita receita;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicamento_id", nullable = false)
    private Medicamento medicamento;

    @Column(nullable = false)
    private String dosagem;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Compartimento compartimento;

    @Column(name = "horario", nullable = false)
    private LocalTime horario;

    @Column(name = "dias_semana")
    private String diasSemana; // "1,2,3,4,5,6,7" = todos os dias

    @Column
    private String instrucoes;
}
