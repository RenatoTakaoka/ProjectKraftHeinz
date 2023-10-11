package com.kraftheinz.kraftheinzbackend.repository;

import com.kraftheinz.kraftheinzbackend.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    @Query(value = "SELECT c FROM Cliente c WHERE c.emailCliente = :email and c.senha = :senha")
            Cliente findUserExistsByEmailSenha(
                    @Param("email") String email,
                    @Param("senha") String senha);

}
