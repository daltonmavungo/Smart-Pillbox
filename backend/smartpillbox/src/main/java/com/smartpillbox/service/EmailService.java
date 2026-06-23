package com.smartpillbox.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void enviarAlertaMedicamento(
            String emailFamiliar,
            String nomePaciente,
            String nomeMedicamento,
            String compartimento,
            String horarioPrevisto
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("josedalton258@gmail.com");
            helper.setTo(emailFamiliar);
            helper.setSubject("Alerta: " + nomePaciente + " nao tomou o medicamento");

            String html = """
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8"/>
                  <style>
                    body { font-family: Inter, Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 0; }
                    .container { max-width: 520px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
                    .header { background: linear-gradient(135deg, #0f2744, #1e3a5f); padding: 32px; text-align: center; }
                    .header h1 { color: #fff; font-size: 20px; margin: 0; font-weight: 700; }
                    .header p { color: #7aa8c8; font-size: 13px; margin: 6px 0 0; }
                    .alert-badge { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 20px; display: inline-block; margin-top: 16px; }
                    .body { padding: 32px; }
                    .body p { color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px; }
                    .info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0; }
                    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
                    .info-row:last-child { border-bottom: none; }
                    .info-label { color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
                    .info-value { color: #1e293b; font-size: 13px; font-weight: 600; }
                    .footer { background: #f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #e2e8f0; }
                    .footer p { color: #94a3b8; font-size: 11px; margin: 0; line-height: 1.6; }
                    .icon { font-size: 36px; margin-bottom: 8px; display: block; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <span class="icon">&#128138;</span>
                      <h1>Smart Pillbox</h1>
                      <p>Sistema de Gestao de Medicamentos</p>
                      <div class="alert-badge">Alerta de Medicamento</div>
                    </div>
                    <div class="body">
                      <p>Caro familiar,</p>
                      <p>O sistema detectou que <strong>%s</strong> nao confirmou a toma do medicamento no horario previsto. Por favor verifique a situacao.</p>
                      <div class="info-card">
                        <div class="info-row">
                          <span class="info-label">Paciente</span>
                          <span class="info-value">%s</span>
                        </div>
                        <div class="info-row">
                          <span class="info-label">Medicamento</span>
                          <span class="info-value">%s</span>
                        </div>
                        <div class="info-row">
                          <span class="info-label">Compartimento</span>
                          <span class="info-value">%s</span>
                        </div>
                        <div class="info-row">
                          <span class="info-label">Horario previsto</span>
                          <span class="info-value">%s</span>
                        </div>
                      </div>
                      <p>Se a situacao ja foi resolvida, pode ignorar este email.</p>
                    </div>
                    <div class="footer">
                      <p>Este email foi enviado automaticamente pelo Smart Pillbox.<br/>Cuidando de quem cuidou de nos.</p>
                    </div>
                  </div>
                </body>
                </html>
                """.formatted(nomePaciente, nomePaciente, nomeMedicamento, compartimento, horarioPrevisto);

            helper.setText(html, true);
            mailSender.send(message);
            log.info("Email de alerta enviado para: {}", emailFamiliar);

        } catch (MessagingException e) {
            log.error("Erro ao enviar email de alerta: {}", e.getMessage());
        }
    }
}