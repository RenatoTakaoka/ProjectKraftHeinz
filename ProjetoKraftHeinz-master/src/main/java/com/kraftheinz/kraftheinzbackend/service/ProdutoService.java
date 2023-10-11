package com.kraftheinz.kraftheinzbackend.service;

import com.kraftheinz.kraftheinzbackend.model.Marca;
import com.kraftheinz.kraftheinzbackend.model.Produto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.kraftheinz.kraftheinzbackend.repository.ProdutoRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProdutoService {
    private ProdutoRepository produtoRepository;

    private ProdutoService(ProdutoRepository produtoRepository) { this.produtoRepository = produtoRepository;}
    public List<Produto> create(Produto produto, MultipartFile imagemFile) throws IOException {
            produto.setImagemProduto(imagemFile.getBytes());
            produtoRepository.save(produto);
        return list();
    }
    public List<Produto> list() { return produtoRepository.findAll();}
    public List<Produto> update(Produto produto, MultipartFile imagemFile) throws IOException {
            produto.setImagemProduto(imagemFile.getBytes());
            produtoRepository.save(produto);
        return list();
    }
    public List<Map<String, Object>> sumNotasByName() {

        // Crie uma lista para armazenar os valores das notas
        List<Integer> valoresNotas = Arrays.asList(5, 4, 3, 2, 1);

        // Crie uma lista para armazenar os resultados finais
        List<Map<String, Object>> notasMap = new ArrayList<>();

        // Para cada valor de nota, faça uma consulta ao banco de dados e obtenha os nomes e as quantidades das marcas
        for (Integer valorNota : valoresNotas) {
            List<Object[]> notasClientes =  produtoRepository.findNomeAndCountOfNotasClientes(valorNota);
            List<Object[]> notasFuncionarios = produtoRepository.findNomeAndCountOfNotasFuncionarios(valorNota);

            // Crie um mapa para armazenar os nomes e as notas dos clientes
            Map<String, Integer> mapaClientes = new HashMap<>();
            for (Object[] notaCliente : notasClientes) {
                mapaClientes.put((String) notaCliente[0], ((Number) notaCliente[1]).intValue());
            }

            // Crie um mapa para armazenar os nomes e as notas dos funcionários
            Map<String, Integer> mapaFuncionarios = new HashMap<>();
            for (Object[] notaFuncionario : notasFuncionarios) {
                mapaFuncionarios.put((String) notaFuncionario[0], ((Number) notaFuncionario[1]).intValue());
            }

            // Combine os dois mapas em um único mapa
            Map<String, Integer> mapaNotas = new HashMap<>();
            for (String nome : mapaClientes.keySet()) {
                mapaNotas.put(nome, mapaClientes.get(nome) + mapaFuncionarios.getOrDefault(nome, 0));
            }
            for (String nome : mapaFuncionarios.keySet()) {
                mapaNotas.putIfAbsent(nome, mapaFuncionarios.get(nome));
            }

            // Atualize a lista de resultados com o mapa de notas
            for (Map<String, Object> notaMap : notasMap) {
                notaMap.put("Notas" + valorNota, mapaNotas.getOrDefault(notaMap.get("produto"), 0));
            }

            // Adicione os novos nomes e notas à lista de resultados
            for (String nome : mapaNotas.keySet()) {
                boolean existe = false;
                for (Map<String, Object> notaMap : notasMap) {
                    if (notaMap.get("produto").equals(nome)) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) {
                    Map<String, Object> notaMap = new HashMap<>();
                    notaMap.put("produto", nome);
                    notaMap.put("Notas" + valorNota, mapaNotas.get(nome));
                    notasMap.add(notaMap);
                }
            }
        }

        return notasMap;
    }
    public List<Produto> delete(Long cod) {
        produtoRepository.deleteById(cod);
        return list();
    }
    public Optional<Produto> findById(Long cod){
       return produtoRepository.findById(cod);
    }
    public Page<Produto> listaPaginada(PageRequest pr){return  produtoRepository.findAll(pr);}
}
