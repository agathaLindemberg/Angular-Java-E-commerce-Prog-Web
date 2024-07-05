package io.github.agathaLindemberg.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    @NotEmpty(message = "{campo.nome.obrigatorio}")
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false,length = 100)
    private String email;

    @Column(nullable = false,length = 50)
    private String login;

    @Column(nullable = false,length = 100)
    private String senha;

    @Column(nullable = false)
    private Boolean administrador;
}
