package io.github.agathaLindemberg.rest.service;

import io.github.agathaLindemberg.model.entity.Produto;
import io.github.agathaLindemberg.model.entity.Venda;
import io.github.agathaLindemberg.model.entity.VendaProduto;
import io.github.agathaLindemberg.rest.repository.ProdutoRepository;
import io.github.agathaLindemberg.rest.repository.VendaProdutoRepository;
import io.github.agathaLindemberg.rest.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private VendaProdutoRepository vendaProdutoRepository;

    public Venda salvarVenda(Venda vendaDTO) {
        Venda vendaSalva = new Venda();
        vendaSalva.setDataHora(vendaDTO.getDataHora());
        vendaSalva.setUsuario(vendaDTO.getUsuario());
        vendaRepository.save(vendaSalva);

        List<VendaProduto> itens = vendaDTO.getItens();

        for (VendaProduto vendaProduto : itens) {
            Produto produto = produtoRepository.findById(vendaProduto.getProduto().getId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            vendaProduto.setVenda(vendaSalva);
            vendaProduto.setProduto(produto);

            int novaQuantidade = produto.getQuantidade() - vendaProduto.getQuantidade();
            if (novaQuantidade < 0) {
                throw new RuntimeException("Quantidade insuficiente no estoque para o produto: " + produto.getNome());
            }

            produto.setQuantidade(novaQuantidade);
            vendaProdutoRepository.save(vendaProduto);
            produtoRepository.save(produto);
        }

        vendaSalva.setItens(itens);
        return vendaSalva;
    }


    public void delete(Integer idVenda) {
        Venda venda = vendaRepository.findById(idVenda)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));

        List<VendaProduto> itensVenda = vendaProdutoRepository.findByVendaId(venda.getId());
        vendaProdutoRepository.deleteAll(itensVenda);

        vendaRepository.delete(venda);
    }


    public List<Venda> getAllVendas() {
        return vendaRepository.findAll();
    }

    public List<Venda> getVendasPorUsuario(Integer idUsuario) {
        return vendaRepository.findByUsuarioId(idUsuario);
    }

    public List<Venda> getVendasPorProduto(Integer idProduto) {
        List<VendaProduto> vendaProdutos = vendaProdutoRepository.findByProdutoId(idProduto);
        return vendaProdutos.stream()
                .map(VendaProduto::getVenda)
                .collect(Collectors.toList());
    }
}

