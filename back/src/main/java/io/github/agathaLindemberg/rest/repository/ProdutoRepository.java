package io.github.agathaLindemberg.rest.repository;

import io.github.agathaLindemberg.model.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Integer>{
    List<Produto> findByCategoriaId (Integer id);
}
