package com.smartpillbox.service.impl;

import com.smartpillbox.dto.request.PacienteRequest;
import com.smartpillbox.dto.response.PacienteResponse;
import com.smartpillbox.entity.Paciente;
import com.smartpillbox.entity.Usuario;
import com.smartpillbox.exception.ResourceNotFoundException;
import com.smartpillbox.repository.PacienteRepository;
import com.smartpillbox.repository.UsuarioRepository;
import com.smartpillbox.service.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    public PacienteResponse criar(PacienteRequest request) {
        Paciente paciente = Paciente.builder()
                .nome(request.getNome())
                .dataNascimento(request.getDataNascimento())
                .telefone(request.getTelefone())
                .endereco(request.getEndereco())
                .contatoEmergencia(request.getContatoEmergencia())
                .telefoneEmergencia(request.getTelefoneEmergencia())
                .emailFamiliar(request.getEmailFamiliar())
                .ativo(true)
                .build();

        if (request.getMedicoId() != null) {
            Usuario medico = usuarioRepository.findById(request.getMedicoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado"));
            paciente.setMedico(medico);
        }

        paciente = pacienteRepository.save(paciente);
        return toResponse(paciente);
    }

    @Override
    public PacienteResponse buscarPorId(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com id: " + id));
        return toResponse(paciente);
    }

    @Override
    public List<PacienteResponse> listarTodos() {
        return pacienteRepository.findByAtivoTrue()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public List<PacienteResponse> buscarPorNome(String nome) {
        return pacienteRepository.buscarPorNome(nome)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public PacienteResponse atualizar(Long id, PacienteRequest request) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com id: " + id));

        paciente.setNome(request.getNome());
        paciente.setDataNascimento(request.getDataNascimento());
        paciente.setTelefone(request.getTelefone());
        paciente.setEndereco(request.getEndereco());
        paciente.setContatoEmergencia(request.getContatoEmergencia());
        paciente.setTelefoneEmergencia(request.getTelefoneEmergencia());
        paciente.setEmailFamiliar(request.getEmailFamiliar());

        if (request.getMedicoId() != null) {
            Usuario medico = usuarioRepository.findById(request.getMedicoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado"));
            paciente.setMedico(medico);
        }

        return toResponse(pacienteRepository.save(paciente));
    }

    @Override
    public void desativar(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com id: " + id));
        paciente.setAtivo(false);
        pacienteRepository.save(paciente);
    }

    private PacienteResponse toResponse(Paciente p) {
        return PacienteResponse.builder()
                .id(p.getId())
                .nome(p.getNome())
                .dataNascimento(p.getDataNascimento())
                .telefone(p.getTelefone())
                .endereco(p.getEndereco())
                .contatoEmergencia(p.getContatoEmergencia())
                .telefoneEmergencia(p.getTelefoneEmergencia())
                .emailFamiliar(p.getEmailFamiliar())
                .ativo(p.getAtivo())
                .criadoEm(p.getCriadoEm())
                .medicoNome(p.getMedico() != null ? p.getMedico().getNome() : null)
                .build();
    }
}
