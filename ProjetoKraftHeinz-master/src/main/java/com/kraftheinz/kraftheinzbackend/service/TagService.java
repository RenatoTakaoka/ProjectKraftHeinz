package com.kraftheinz.kraftheinzbackend.service;

import com.kraftheinz.kraftheinzbackend.model.Tag;
import com.kraftheinz.kraftheinzbackend.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TagService {
    private TagRepository tagRepository;

    public TagService(TagRepository tagRepository) { this.tagRepository = tagRepository; }
    public List<Tag> create(Tag tag) {
        tagRepository.save(tag);
        return list();
    }
    public List<Tag> list() { return tagRepository.findAll(); }
    public List<Tag> update(Tag tag) {
        tagRepository.save(tag);
        return list();
    }
    public int count(){
        int count = 0;
        tagRepository.count();
        return count;
    }
    public List<Map<String, Object>> getCountAvalicaoByTag(){
        return tagRepository.countAvaliacoesClientesByTagName();
    }
    public List<Map<String, Object>> getAvaliacoesPorDataETag() {
        List<Map<String, Object>> avaliacoesClientesSugestao = tagRepository.findAvaliacoesClientesPorDataETag();
        List<Map<String, Object>> avaliacoesFuncionariosSugestao = tagRepository.findAvaliacoesFuncionariosPorDataETag();

        List<Map<String, Object>> avaliacoes = new ArrayList<>();
        avaliacoes.addAll(avaliacoesClientesSugestao);
        avaliacoes.addAll(avaliacoesFuncionariosSugestao);

        Map<LocalDate, Long> qtdSugestao = avaliacoes.stream()
                .filter(map -> map != null && "Sugestão".equals(map.get("tag")))
                .collect(Collectors.groupingBy(map -> ((Timestamp) map.get("data")).toLocalDateTime().toLocalDate(), Collectors.counting()));

        Map<LocalDate, Long> qtdNaoSugestao = avaliacoes.stream()
                .filter(map -> map != null && !"Sugestão".equals(map.get("tag")))
                .collect(Collectors.groupingBy(map -> ((Timestamp) map.get("data")).toLocalDateTime().toLocalDate(), Collectors.counting()));

        Map<LocalDate, Map<String, Long>> resultado = new HashMap<>();


        for (Map.Entry<LocalDate, Long> entry : qtdSugestao.entrySet()) {
            resultado.put(entry.getKey(), new HashMap<String, Long>() {{
                put("Sugestões", entry.getValue());
            }});
        }

        for (Map.Entry<LocalDate, Long> entry : qtdNaoSugestao.entrySet()) {
            resultado.computeIfAbsent(entry.getKey(), k -> new HashMap<>()).put("Avaliações", entry.getValue());
        }



        List<Map<String, Object>> json = new ArrayList<>();
        for (Map.Entry<LocalDate, Map<String, Long>> entry : resultado.entrySet()) {
            LocalDate data = entry.getKey();
            Map<String, Object> avaliacao = new HashMap<>();
            avaliacao.put("data", data);
            avaliacao.put("Sugestoes", entry.getValue().getOrDefault("Sugestões", 0L));
            avaliacao.put("Avaliacoes", entry.getValue().getOrDefault("Avaliações", 0L));
            json.add(avaliacao);
        }

        return json;
    }

    public List<Tag> delete(Long cod) {
        tagRepository.deleteById(cod);
        return list();
    }
}
