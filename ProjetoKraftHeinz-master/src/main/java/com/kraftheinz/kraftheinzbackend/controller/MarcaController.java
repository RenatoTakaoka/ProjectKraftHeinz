package com.kraftheinz.kraftheinzbackend.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kraftheinz.kraftheinzbackend.model.Marca;
import com.kraftheinz.kraftheinzbackend.model.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.kraftheinz.kraftheinzbackend.service.MarcaService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/marcas")
public class MarcaController {
    private final MarcaService marcaService;

    public MarcaController(MarcaService marcaService) {
        this.marcaService = marcaService;
    }

    @PostMapping
    List<Marca> create(@RequestPart String marca, @RequestPart  MultipartFile file) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Marca marca1 = objectMapper.readValue(marca, Marca.class);
        return marcaService.create(marca1, file);
    }
@GetMapping("/getNota")
Object getGrafico(){
        return marcaService.sumNotasByName();
}
    @GetMapping
    List<Marca> list() {
        return marcaService.list();
    }
    @PutMapping
    List<Marca> update(@RequestBody String marca) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Marca marca1 = objectMapper.readValue(marca, Marca.class);
        return marcaService.update(marca1);
    }
    @DeleteMapping("{cod}")
    List<Marca> delete(@PathVariable("cod") Long cod){
        return marcaService.delete(cod);
}
    @GetMapping("{cod}")
    Optional<Marca> findById(@PathVariable("cod") Long cod){ return marcaService.findById(cod);}

    @GetMapping("paginada")
    public Page<Marca> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pr = PageRequest.of(page,size);
        return marcaService.listaPaginada(pr);
    }
}
