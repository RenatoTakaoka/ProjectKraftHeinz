package com.kraftheinz.kraftheinzbackend.controller;

import com.kraftheinz.kraftheinzbackend.model.Funcionario;
import com.kraftheinz.kraftheinzbackend.service.FuncionarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {
    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) { this.funcionarioService = funcionarioService; }

    @PostMapping
    List<Funcionario> create(@RequestBody Funcionario funcionario) {
        return funcionarioService.create(funcionario);
    }

    @GetMapping
    List<Funcionario> list() { return funcionarioService.list(); }

    @PutMapping
    List<Funcionario> update(@RequestBody Funcionario funcionario) { return funcionarioService.update(funcionario); }

    @DeleteMapping("{cod}")
    List<Funcionario> delete(@PathVariable("cod") Long cod) { return funcionarioService.delete(cod); }


    @PostMapping("/login")
    ResponseEntity<?> login(@RequestParam(value = "email") String email, @RequestParam(value = "senha") String senha){
        return funcionarioService.findByEmailSenha(email,senha);
    }
}

