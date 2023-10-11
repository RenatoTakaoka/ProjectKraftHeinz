package com.kraftheinz.kraftheinzbackend.service;

import com.kraftheinz.kraftheinzbackend.model.AvaliacaoFuncionario;
import com.kraftheinz.kraftheinzbackend.repository.AvaliacaoFuncionarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AvaliacaoFuncionarioService {
    private AvaliacaoFuncionarioRepository avaliacaoFuncionarioRepository;

    public AvaliacaoFuncionarioService(AvaliacaoFuncionarioRepository avaliacaoFuncionarioRepository) { this.avaliacaoFuncionarioRepository = avaliacaoFuncionarioRepository; }
    public List<AvaliacaoFuncionario> create(AvaliacaoFuncionario avaliacaoFuncionario) {
        avaliacaoFuncionarioRepository.save(avaliacaoFuncionario);
        return list();
    }
    public List<AvaliacaoFuncionario> list() { return avaliacaoFuncionarioRepository.findAll(); }
    public List<AvaliacaoFuncionario> update(AvaliacaoFuncionario avaliacaoFuncionario) {
        avaliacaoFuncionarioRepository.save(avaliacaoFuncionario);
        return list();
    }
    public List<AvaliacaoFuncionario> delete(Long cod) {
        avaliacaoFuncionarioRepository.deleteById(cod);
        return list();
    }
public List<Map<String, Object>> getAvalicaoAndMarcaAndProduto(){
        return avaliacaoFuncionarioRepository.getAvaliacoesFuncionariosMarcasProdutos();
}

}
