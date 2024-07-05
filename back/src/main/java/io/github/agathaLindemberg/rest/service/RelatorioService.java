package io.github.agathaLindemberg.rest.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.InputStream;
import java.io.Serializable;
import java.sql.Connection;
import java.util.Map;

@Service
public class RelatorioService implements Serializable {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private DataSource dataSource;

    public byte[] gerarRelatorio(String nomeRelatorio, Map<String, Object> parametros) throws JRException {        InputStream jasperStream = this.getClass().getResourceAsStream("/relatorios/" + nomeRelatorio + ".jasper");
        if (jasperStream == null) {
            throw new JRException("Arquivo de relatório não encontrado");
        }
        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(jasperStream);

        try (Connection connection = dataSource.getConnection()) {
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, connection);
            return JasperExportManager.exportReportToPdf(jasperPrint);
        } catch (Exception e) {
            throw new JRException("Erro ao gerar o relatório", e);
        }
    }
}
