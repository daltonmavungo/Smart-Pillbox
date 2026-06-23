package com.smartpillbox.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean sucesso;
    private String mensagem;
    private T dados;

    public static <T> ApiResponse<T> sucesso(T dados) {
        return ApiResponse.<T>builder()
                .sucesso(true)
                .mensagem("Operação realizada com sucesso")
                .dados(dados)
                .build();
    }

    public static <T> ApiResponse<T> sucesso(String mensagem, T dados) {
        return ApiResponse.<T>builder()
                .sucesso(true)
                .mensagem(mensagem)
                .dados(dados)
                .build();
    }

    public static <T> ApiResponse<T> erro(String mensagem) {
        return ApiResponse.<T>builder()
                .sucesso(false)
                .mensagem(mensagem)
                .build();
    }
}
