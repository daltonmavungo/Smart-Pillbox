package com.smartpillbox.service;

import com.smartpillbox.entity.EventoRemedio;
import com.smartpillbox.enums.StatusEvento;
import com.smartpillbox.repository.EventoRemedioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlertaService {

    private final EventoRemedioRepository eventoRepository;
    private final JavaMailSender mailSender;

    @Scheduled(fixedDelay = 60000) // verifica a cada 1 minuto
    public void verificarEsquecimentos() {
        LocalDateTime limite = LocalDateTime.now().minusMinutes(30);
        List<EventoRemedio> pendentes = eventoRepository.findEventosPendentesParaAlerta(limite);

        for (EventoRemedio evento : pendentes) {
            evento.setStatus(StatusEvento.ESQUECIDO);
            evento.setAlertaEnviado(true);
            eventoRepository.save(evento);

            String emailFamiliar = evento.getPaciente().getEmailFamiliar();
            if (emailFamiliar != null && !emailFamiliar.isBlank()) {
                enviarAlertaEmail(emailFamiliar, evento);
            }
            log.warn("Alerta de esquecimento enviado para paciente: {}", evento.getPaciente().getNome());
        }
    }

    private void enviarAlertaEmail(String destinatario, EventoRemedio evento) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(destinatario);
            message.setSubject("⚠️ Smart Pillbox - Alerta de Medicamento");
            message.setText(String.format(
                "Olá!\n\n" +
                "O(a) paciente %s não tomou o medicamento do compartimento %s " +
                "previsto para as %s.\n\n" +
                "Por favor, verifique se está tudo bem.\n\n" +
                "Smart Pillbox - Sistema de Monitoramento",
                evento.getPaciente().getNome(),
                evento.getCompartimento().name(),
                evento.getHorarioPrevisto().toLocalTime().toString()
            ));
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Erro ao enviar email de alerta: {}", e.getMessage());
        }
    }
}
