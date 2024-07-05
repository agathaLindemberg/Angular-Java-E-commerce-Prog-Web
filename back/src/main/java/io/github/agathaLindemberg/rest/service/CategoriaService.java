package io.github.agathaLindemberg.rest.service;

import io.github.agathaLindemberg.model.entity.Categoria;
import io.github.agathaLindemberg.rest.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository repository;

    public List<Categoria> findAll() {
        return repository.findAll();
    }

    public Categoria save(Categoria categoria) {
        return repository.save(categoria);
    }

    public Categoria findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        repository.deleteById(id);
    }

    public void update(Integer id, Categoria categoriaAtualizada) {
        Categoria categoria = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        categoriaAtualizada.setId(categoria.getId());
        repository.save(categoriaAtualizada);
    }
}
