package io.github.agathaLindemberg.rest.repository;

import io.github.agathaLindemberg.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
    Usuario findByLogin(String login);
}
