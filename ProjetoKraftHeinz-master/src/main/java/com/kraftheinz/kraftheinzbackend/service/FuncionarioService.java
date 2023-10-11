package com.kraftheinz.kraftheinzbackend.service;

import com.kraftheinz.kraftheinzbackend.model.Cliente;
import com.kraftheinz.kraftheinzbackend.model.Funcionario;
import com.kraftheinz.kraftheinzbackend.repository.FuncionarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {
    private FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) { this.funcionarioRepository = funcionarioRepository; }
    public List<Funcionario> create(Funcionario funcionario) {
        funcionarioRepository.save(funcionario);
        return list();
    }
    public List<Funcionario> list() { return funcionarioRepository.findAll(); }
    public List<Funcionario> update(Funcionario funcionario) {
        funcionarioRepository.save(funcionario);
        return list();
    }
    public List<Funcionario> delete(Long cod) {
        funcionarioRepository.deleteById(cod);
        return list();
    }
    public ResponseEntity<?> findByEmailSenha(String email, String senha){
        Funcionario funcionario = funcionarioRepository.findUserExistsByEmailSenha(email,senha);
        if (funcionario == null)
            return new ResponseEntity<String>("Login ou senha não coicidem!", HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<Funcionario>(funcionario,HttpStatus.OK);
    }
}
