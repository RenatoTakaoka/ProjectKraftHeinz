package com.kraftheinz.kraftheinzbackend.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kraftheinz.kraftheinzbackend.model.Marca;
import com.kraftheinz.kraftheinzbackend.model.Produto;
import com.kraftheinz.kraftheinzbackend.service.ProdutoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/produto")
public class ProdutoController {
    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @PostMapping
    ResponseEntity<?> create(@RequestPart String produto, @RequestPart MultipartFile file) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Produto produto1 = objectMapper.readValue(produto, Produto.class);
        if(produto != null && file != null) {
            try {
                return new ResponseEntity<>(produtoService.create(produto1, file), HttpStatus.OK);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }else{
            return new ResponseEntity<>("Faltou parametros para produto e file", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getNota")
    Object getGrafico(){
        return produtoService.sumNotasByName();
    }
    @GetMapping
    List<Produto> list() {
        return produtoService.list();
    }

    @PutMapping
    ResponseEntity<?>  update(@RequestBody  @RequestPart String produto, @RequestPart MultipartFile file) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Produto produto1 = objectMapper.readValue(produto, Produto.class);
        if(produto != null && file != null) {
            try {
                return new ResponseEntity<>(produtoService.update(produto1, file), HttpStatus.OK);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }else{
            return new ResponseEntity<>("Faltou parametros para produto e file", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{cod}")
    Optional<Produto>  findById(@PathVariable("cod") Long cod){ return produtoService.findById(cod);}
    @DeleteMapping("{cod}")
    List<Produto> delete(@PathVariable("cod") Long cod){
        return produtoService.delete(cod);
    }
    @GetMapping("paginada")
    public Page<Produto> findAll(@RequestParam int page, @RequestParam int size) {
        PageRequest pr = PageRequest.of(page,size);
        return produtoService.listaPaginada(pr);
    }
}
