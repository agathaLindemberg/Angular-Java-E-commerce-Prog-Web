package io.github.agathaLindemberg.rest.resource;

import io.github.agathaLindemberg.model.entity.Categoria;
import io.github.agathaLindemberg.rest.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categoria")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class CategoriaResource {

    private final CategoriaService service;

    @GetMapping
    public List<Categoria> obterTodos() {
        return service.findAll();
    }

    @Transactional
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Categoria save(@RequestBody @Valid Categoria categoria) {
        return service.save(categoria);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Categoria findById(@PathVariable Integer id) {
        return service.findById(id);
    }

    @Transactional
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    @Transactional
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable Integer id,
                       @RequestBody Categoria categoriaAtualizada) {
        service.update(id, categoriaAtualizada);
    }
}
