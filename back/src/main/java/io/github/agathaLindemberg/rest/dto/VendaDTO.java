package io.github.agathaLindemberg.rest.dto;

import io.github.agathaLindemberg.model.entity.Venda;
import io.github.agathaLindemberg.model.entity.VendaProduto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class VendaDTO {
    private Venda venda;
    private List<VendaProduto> itens;
}
