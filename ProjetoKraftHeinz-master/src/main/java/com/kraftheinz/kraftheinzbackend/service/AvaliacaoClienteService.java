package com.kraftheinz.kraftheinzbackend.service;

import com.kraftheinz.kraftheinzbackend.model.AvaliacaoCliente;
import com.kraftheinz.kraftheinzbackend.repository.AvaliacaoClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AvaliacaoClienteService {
    private AvaliacaoClienteRepository avaliacaoClienteRepository;

    public AvaliacaoClienteService(AvaliacaoClienteRepository avaliacaoClienteRepository) { this.avaliacaoClienteRepository = avaliacaoClienteRepository; }
    public List<AvaliacaoCliente> create(AvaliacaoCliente avaliacaoCliente) {
        avaliacaoClienteRepository.save(avaliacaoCliente);
        return list();
    }

    public List<AvaliacaoCliente> list() { return avaliacaoClienteRepository.findAll(); }
    public List<AvaliacaoCliente> update(AvaliacaoCliente avaliacaoCliente) {
        avaliacaoClienteRepository.save(avaliacaoCliente);
        return list();
    }
    public List<AvaliacaoCliente> delete(Long cod) {
        avaliacaoClienteRepository.deleteById(cod);
        return list();
    }
    public List<Map<String, Object>> getAvalicaoAndMarcaAndProduto(){
        return avaliacaoClienteRepository.getAvaliacoesAvaliacaoClienteMarcasProdutos();
    }

    public List<AvaliacaoCliente> getEncontrarPorNota(int valor){
        return avaliacaoClienteRepository.getEncontrarPorNota(valor);
    }
}
