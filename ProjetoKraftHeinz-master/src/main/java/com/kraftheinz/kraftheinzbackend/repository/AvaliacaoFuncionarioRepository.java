package com.kraftheinz.kraftheinzbackend.repository;

import com.kraftheinz.kraftheinzbackend.model.AvaliacaoFuncionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface AvaliacaoFuncionarioRepository extends JpaRepository<AvaliacaoFuncionario, Long> {

        @Query("SELECT new map(af as avaliacaoFuncionario, m.nome as NomeMarca, p.nome as NomeProduto) FROM AvaliacaoFuncionario af LEFT JOIN af.marcas m LEFT JOIN af.produtos p")
        List<Map<String, Object>> getAvaliacoesFuncionariosMarcasProdutos();

}
