package io.github.agathaLindemberg.rest.service;

import io.github.agathaLindemberg.model.entity.Produto;
import io.github.agathaLindemberg.rest.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public List<Produto> getAll() {
        return repository.findAll();
    }

    public Produto save(Produto produto) {
        return repository.save(produto);
    }

    public Produto findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    public void deleteById(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
        }
        repository.deleteById(id);
    }

    public void update(Integer id, Produto produtoAtualizado) {
        repository.findById(id)
                .map(produto -> {
                    produtoAtualizado.setId(produto.getId());
                    repository.save(produtoAtualizado);
                    return produtoAtualizado;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    public List<Produto> findByCategoriaId(Integer idCategoria) {
        return repository.findByCategoriaId(idCategoria);
    }
}
