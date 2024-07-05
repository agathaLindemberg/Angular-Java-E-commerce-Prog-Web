package io.github.agathaLindemberg.rest.repository;

import io.github.agathaLindemberg.model.entity.Venda;
import io.github.agathaLindemberg.model.entity.VendaProduto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VendaProdutoRepository extends JpaRepository<VendaProduto, Integer>{
    List<VendaProduto> findByProdutoId(Integer idProduto);

    List<VendaProduto> findByVendaId(Integer idVenda);
}
