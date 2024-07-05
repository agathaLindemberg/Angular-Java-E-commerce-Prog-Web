package io.github.agathaLindemberg.rest.resource;

import io.github.agathaLindemberg.model.entity.Venda;
import io.github.agathaLindemberg.rest.service.VendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venda")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class VendaResource {

    private final VendaService service;

    @GetMapping
    public ResponseEntity<List<Venda>> getVendas() {
        List<Venda> vendas = service.getAllVendas();
        return ResponseEntity.ok(vendas);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Venda>> getVendasPorUsuario(@PathVariable Integer idUsuario) {
        List<Venda> vendas = service.getVendasPorUsuario(idUsuario);
        return ResponseEntity.ok(vendas);
    }

    @Transactional
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Venda salvarVenda(@RequestBody Venda venda) {
        return service.salvarVenda(venda);
    }

    @Transactional
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    @GetMapping("/por-produto/{idProduto}")
    public ResponseEntity<List<Venda>> getVendasPorProduto(@PathVariable Integer idProduto) {
        List<Venda> vendas = service.getVendasPorProduto(idProduto);
        return ResponseEntity.ok(vendas);
    }
}
