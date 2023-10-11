package com.kraftheinz.kraftheinzbackend.controller;

import com.kraftheinz.kraftheinzbackend.model.Cliente;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kraftheinz.kraftheinzbackend.service.ClienteService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {this.clienteService = clienteService;}

    @PostMapping
    List<Cliente> create(@RequestBody Cliente cliente) {
        return clienteService.create(cliente);}

    @GetMapping
    List<Cliente> list(){
        return clienteService.list();
    }

    @PutMapping
    List<Cliente> update(@RequestBody Cliente cliente) {return clienteService.update(cliente);}

    @DeleteMapping("{cod}")
    List<Cliente> delete(@PathVariable("cod") Long cod){
        return clienteService.delete(cod);
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestParam(value = "email") String email, @RequestParam(value = "senha") String senha){
        return clienteService.findByEmailSenha(email,senha);
    }
}
