package io.github.agathaLindemberg.rest.service;

import io.github.agathaLindemberg.model.entity.Usuario;
import io.github.agathaLindemberg.rest.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    public Usuario save(Usuario usuario) {
        return repository.save(usuario);
    }

    public void deleteById(Integer idUsuario) {
        if (!repository.existsById(idUsuario)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }
        repository.deleteById(idUsuario);
    }

    public Usuario update(Integer id, Usuario usuarioAtualizado) {
        return repository.findById(id)
                .map(usuario -> {
                    usuarioAtualizado.setId(usuario.getId());
                    return repository.save(usuarioAtualizado);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    public Usuario findByLogin(String login) {
        Usuario usuario = repository.findByLogin(login);
        if (usuario == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado");
        }
        return usuario;
    }

    public Usuario authenticate(String login, String senha) {
        Usuario usuario = findByLogin(login);
        if (!usuario.getSenha().equals(senha)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login ou senha inválidos");
        }

        return usuario;
    }
}