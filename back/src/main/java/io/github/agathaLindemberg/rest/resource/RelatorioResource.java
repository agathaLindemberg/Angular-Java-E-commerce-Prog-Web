package io.github.agathaLindemberg.rest.resource;

import io.github.agathaLindemberg.rest.service.RelatorioService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/relatorio")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class RelatorioResource {
    private final RelatorioService service;

    @GetMapping(value = "/relatorio", produces = "application/text")
    public ResponseEntity<String> downloadRelatorio(
            @RequestParam("dataInicio") String dataInicioStr,
            @RequestParam("dataFim") String dataFimStr,
            @RequestParam("tipoRelatorio") String tipoRelatorio) {

        Map<String, Object> parametros = new HashMap<>();

        try {
            if (tipoRelatorio.equals("relatorio_venda")) {
                if (!dataInicioStr.isEmpty() && !dataFimStr.isEmpty()) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    Date dataInicio;
                    Date dataFim;

                    try {
                        dataInicio = sdf.parse(dataInicioStr);
                        dataFim = sdf.parse(dataFimStr);
                    } catch (ParseException e) {
                        throw new IllegalArgumentException("Formato de data inválido", e);
                    }

                    parametros.put("condicaoDataInicio", dataInicio);
                    parametros.put("condicaoDataFim", dataFim);
                }
            }

            byte[] pdf = service.gerarRelatorio(tipoRelatorio, parametros);
            String base64pdf = "data:application/pdf;base64," + Base64.encodeBase64String(pdf);

            return ResponseEntity.ok(base64pdf);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao gerar o relatório: " + e.getMessage());
        }
    }
}
