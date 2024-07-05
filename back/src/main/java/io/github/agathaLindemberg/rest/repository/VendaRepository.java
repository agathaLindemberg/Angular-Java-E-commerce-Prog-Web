package io.github.agathaLindemberg.rest.repository;

import io.github.agathaLindemberg.model.entity.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Integer>{
    List<Venda> findByUsuarioId(Integer idUsario);
}
