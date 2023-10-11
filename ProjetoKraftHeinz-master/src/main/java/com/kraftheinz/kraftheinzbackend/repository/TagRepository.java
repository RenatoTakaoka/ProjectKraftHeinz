package com.kraftheinz.kraftheinzbackend.repository;

import com.kraftheinz.kraftheinzbackend.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("SELECT new map(t.nomeTag as tagName, count(af.mensagem) as count) FROM Tag t JOIN t.avaliacaoFuncionario af GROUP BY t.nomeTag")
    List<Map<String, Object>> countAvaliacoesFuncionariosByTagName();

    @Query("SELECT new map(t.nomeTag as tagName, count(ac.mensagem) as count) FROM Tag t JOIN t.avaliacaoCliente ac GROUP BY t.nomeTag")
    List<Map<String, Object>> countAvaliacoesClientesByTagName();



    @Query(value = "SELECT avaliacaoCliente.DATA_AVALIACAO_AC AS data, tag.NOME_TAG AS tag, COUNT(avaliacaoCliente.AVALIACOES_CLIENTE_ID) AS qtd " +
            "FROM AVALIACOESCLIENTES avaliacaoCliente " +
            "JOIN AUX_AVALIACOES_CLIENTES avaliacaoClienteTag ON avaliacaoClienteTag.AVALIACOES_CLIENTE_ID = avaliacaoCliente.AVALIACOES_CLIENTE_ID " +
            "JOIN TAGS tag ON tag.TAG_ID = avaliacaoClienteTag.TAG_ID " +
            "GROUP BY avaliacaoCliente.DATA_AVALIACAO_AC, tag.NOME_TAG " +
            "ORDER BY avaliacaoCliente.DATA_AVALIACAO_AC", nativeQuery = true)
    List<Map<String, Object>> findAvaliacoesClientesPorDataETag();

    @Query(value = "SELECT avaliacaoFuncionario.DATA_AVALIACAO_AF AS data, tag.NOME_TAG AS tag, COUNT(avaliacaoFuncionario.AVALIACOES_FUNCIONARIO_ID) AS qtd " +
            "FROM AVALIACOESFUNCIONARIOS avaliacaoFuncionario " +
            "JOIN AUX_AVALIACOES_FUNCIONARIOS avaliacaoFuncionarioTag ON avaliacaoFuncionarioTag.AVALIACOES_FUNCIONARIO_ID = avaliacaoFuncionario.AVALIACOES_FUNCIONARIO_ID " +
            "JOIN TAGS tag ON tag.TAG_ID = avaliacaoFuncionarioTag.TAG_ID " +
            "GROUP BY avaliacaoFuncionario.DATA_AVALIACAO_AF, tag.NOME_TAG " +
            "ORDER BY avaliacaoFuncionario.DATA_AVALIACAO_AF", nativeQuery = true)
    List<Map<String, Object>> findAvaliacoesFuncionariosPorDataETag();



}
