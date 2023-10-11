package com.kraftheinz.kraftheinzbackend.repository;

import com.kraftheinz.kraftheinzbackend.model.AvaliacaoCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AvaliacaoClienteRepository extends JpaRepository<AvaliacaoCliente, Long> {
    @Query("SELECT new map(af as AvaliacaoCliente, c.primeroNome as PrimeiroNomeCliente, c.ultimoNome as UltimoNomeCliente, m.nome as NomeMarca, p.nome as NomeProduto) FROM AvaliacaoCliente af LEFT JOIN af.clientes c LEFT JOIN af.marcas m LEFT JOIN af.produtos p")
    List<Map<String, Object>> getAvaliacoesAvaliacaoClienteMarcasProdutos();

    @Query("SELECT a FROM AvaliacaoCliente a WHERE a.nota = :nota")
    List<AvaliacaoCliente> getEncontrarPorNota(@Param("nota") int nota);

}
