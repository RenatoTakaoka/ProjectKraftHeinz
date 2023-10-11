package com.kraftheinz.kraftheinzbackend.repository;

import com.kraftheinz.kraftheinzbackend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT m.nome, COUNT(af.nota) AS notas_funcionarios\n"
            + "FROM Produto m\n"
            + "JOIN m.avaliacaoFuncionarios af\n"
            + "WHERE af.nota = :nota\n"
            + "GROUP BY m.nome")
    List<Object[]> findNomeAndCountOfNotasFuncionarios(@Param("nota") int nota);

    @Query("SELECT m.nome, COUNT(ac.nota) AS notas_clientes\n"
            + "FROM Produto m\n"
            + "JOIN m.avaliacaoClientes ac\n"
            + "WHERE ac.nota = :nota\n"
            + "GROUP BY m.nome")
    List<Object[]> findNomeAndCountOfNotasClientes(@Param("nota") int nota);

}
