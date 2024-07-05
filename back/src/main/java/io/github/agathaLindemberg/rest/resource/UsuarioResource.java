package io.github.agathaLindemberg.rest.resource;

import io.github.agathaLindemberg.model.entity.Usuario;
import io.github.agathaLindemberg.rest.dto.LoginRequest;
import io.github.agathaLindemberg.rest.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class UsuarioResource {

    private final UsuarioService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario save(@RequestBody @Valid Usuario usuario) {
        return service.save(usuario);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Integer id) {
        service.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Integer id,
                                          @RequestBody Usuario usuarioAtualizado) {
        try {
            Usuario updatedUser = service.update(id, usuarioAtualizado);
            return ResponseEntity.ok().body(updatedUser);
        } catch (ResponseStatusException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Usuario usuario = service.authenticate(loginRequest.getLogin(), loginRequest.getSenha());
            return ResponseEntity.ok(usuario);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getReason());
        }
    }
}