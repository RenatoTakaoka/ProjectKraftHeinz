package com.kraftheinz.kraftheinzbackend.controller;

import com.kraftheinz.kraftheinzbackend.model.Produto;
import com.kraftheinz.kraftheinzbackend.model.Tag;
import com.kraftheinz.kraftheinzbackend.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }
    @PostMapping
    ResponseEntity<?> create(@RequestBody Tag tag) {
        if(tag != null) {
            return new ResponseEntity<>(tagService.create(tag), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Faltou parametros para tag", HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/getTagsAvalicao")
    public Collection<Map<String, Object>> avaliacaoFuncionarioTags(){
        return tagService.getCountAvalicaoByTag();
    }

    @GetMapping("/getGraficoSugestões")
    public List<Map<String, Object>> avaliacaoPorDataTag(){return tagService.getAvaliacoesPorDataETag();}
    @GetMapping
    List<Tag> list() {
        return tagService.list();
    }
    @PutMapping
    List<Tag> update(@RequestBody  Tag tag){
        return tagService.update(tag);
    }

    @DeleteMapping("{cod}")
    List<Tag> delete(@PathVariable("cod") Long cod){
        return tagService.delete(cod);
    }
}
