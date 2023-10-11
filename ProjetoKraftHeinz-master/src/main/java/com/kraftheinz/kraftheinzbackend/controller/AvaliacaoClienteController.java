package com.kraftheinz.kraftheinzbackend.controller;

import com.kraftheinz.kraftheinzbackend.model.AvaliacaoCliente;
import com.kraftheinz.kraftheinzbackend.service.AvaliacaoClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/avaliacaoclientes")
public class AvaliacaoClienteController {
    private final AvaliacaoClienteService avaliacaoClienteService;

    public AvaliacaoClienteController(AvaliacaoClienteService avaliacaoClienteService) { this.avaliacaoClienteService = avaliacaoClienteService; }

    @PostMapping
    List<AvaliacaoCliente> create(@RequestBody AvaliacaoCliente avaliacaoCliente) {
        return avaliacaoClienteService.create(avaliacaoCliente);
    }
    @GetMapping("/getMarcaProduto")
    List<Map<String, Object>> objects() {
        return avaliacaoClienteService.getAvalicaoAndMarcaAndProduto();
    }
    @GetMapping
    List<AvaliacaoCliente> list() { return avaliacaoClienteService.list(); }
    @GetMapping("/getEncontraNota")
    List<AvaliacaoCliente> objects(@RequestParam int valor) {
        return avaliacaoClienteService.getEncontrarPorNota(valor);
    }


    @PutMapping
    List<AvaliacaoCliente> update(@RequestBody AvaliacaoCliente avaliacaoCliente) { return avaliacaoClienteService.update(avaliacaoCliente); }

    @DeleteMapping("{cod}")
    List<AvaliacaoCliente> delete(@PathVariable("cod") Long cod) { return avaliacaoClienteService.delete(cod); }
}
