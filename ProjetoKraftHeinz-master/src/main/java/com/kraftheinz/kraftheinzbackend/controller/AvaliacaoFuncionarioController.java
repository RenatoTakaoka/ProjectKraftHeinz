package com.kraftheinz.kraftheinzbackend.controller;

import com.kraftheinz.kraftheinzbackend.model.AvaliacaoFuncionario;
import com.kraftheinz.kraftheinzbackend.service.AvaliacaoFuncionarioService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/avaliacaofuncionarios")
public class AvaliacaoFuncionarioController {
    private final AvaliacaoFuncionarioService avaliacaoFuncionarioService;

    public AvaliacaoFuncionarioController(AvaliacaoFuncionarioService avaliacaoFuncionarioService) { this.avaliacaoFuncionarioService = avaliacaoFuncionarioService; }

    @PostMapping
    List<AvaliacaoFuncionario> create(@RequestBody AvaliacaoFuncionario avaliacaoFuncionario) {
        return avaliacaoFuncionarioService.create(avaliacaoFuncionario);
    }
@GetMapping("/getMarcaProduto")
List<Map<String, Object>> avaliacaoFuncionario() {
        return avaliacaoFuncionarioService.getAvalicaoAndMarcaAndProduto();
}

    @GetMapping
    List<AvaliacaoFuncionario> list() { return avaliacaoFuncionarioService.list(); }

    @PutMapping
    List<AvaliacaoFuncionario> update(@RequestBody AvaliacaoFuncionario avaliacaoFuncionario) { return avaliacaoFuncionarioService.update(avaliacaoFuncionario); }

    @DeleteMapping("{cod}")
    List<AvaliacaoFuncionario> delete(@PathVariable("cod") Long cod) { return avaliacaoFuncionarioService.delete(cod); }
}
