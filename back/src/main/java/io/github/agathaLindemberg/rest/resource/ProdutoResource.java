package io.github.agathaLindemberg.rest.resource;

import io.github.agathaLindemberg.model.entity.Produto;
import io.github.agathaLindemberg.rest.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/produto")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class ProdutoResource {

    private final ProdutoService service;

    @GetMapping
    public List<Produto> obterTodos() {
        return service.getAll();
    }

    @Transactional
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Produto save(@RequestBody @Valid Produto produto) {
        return service.save(produto);
    }

    @Transactional
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Integer id,
                                       @RequestBody @Valid Produto produtoAtualizado) {
        try {
            service.update(id, produtoAtualizado);
            return ResponseEntity.noContent().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatus()).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> findById(@PathVariable Integer id) {
        try {
            Produto produto = service.findById(id);
            return ResponseEntity.ok(produto);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatus()).body(null);
        }
    }

    @GetMapping("/por-categoria/{idCategoria}")
    public List<Produto> getProdutosPorCategoria(@PathVariable Integer idCategoria) {
        return service.findByCategoriaId(idCategoria);
    }
}
