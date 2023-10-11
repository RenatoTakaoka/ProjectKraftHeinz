package com.kraftheinz.kraftheinzbackend.repository;

import com.kraftheinz.kraftheinzbackend.model.Cliente;
import com.kraftheinz.kraftheinzbackend.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    @Query(value = "SELECT f FROM Funcionario f WHERE f.emailFuncionario = :email and f.senha = :senha")
    Funcionario findUserExistsByEmailSenha(
            @Param("email") String email,
            @Param("senha") String senha);
}
