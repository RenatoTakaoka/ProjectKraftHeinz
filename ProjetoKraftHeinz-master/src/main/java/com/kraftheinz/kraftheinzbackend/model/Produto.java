package com.kraftheinz.kraftheinzbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="produto_sequence")
    @SequenceGenerator(name="produto_sequence", sequenceName = "produto_sequence",initialValue=1, allocationSize=1)
    @Column(name = "PRODUTO_ID")
    private Long codProduto;
    @Column(name = "nome_produto")
    private String nome;
    @Column(name = "descricao")
    private String descricao;
    @Lob
    @Column(name = "imagem", columnDefinition="BLOB")
    private byte[] imagemProduto;


    @ManyToOne
    @JoinColumn(name = "FUNCIONARIO_ID", nullable = false)
    @JsonBackReference(value = "produto-funcionario")
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name="marca_id", nullable=false)
    @JsonBackReference(value = "marcas-produtos")
    private Marca marca;

    @OneToMany(mappedBy = "produtos")
    @JsonManagedReference(value = "produto-avaliacaofuncionarios")
    private Set<AvaliacaoFuncionario> avaliacaoFuncionarios;

    @OneToMany(mappedBy = "produtos")
    @JsonManagedReference(value = "produtos-avaliacoesclientes")
    private Set<AvaliacaoCliente> avaliacaoClientes;

    public  Produto(){}

    public Produto(String nome, String descricao, byte[] imagemProduto, Funcionario funcionario, Marca marca, Set<AvaliacaoFuncionario> avaliacaoFuncionarios, Set<AvaliacaoCliente> avaliacaoClientes) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagemProduto = imagemProduto;
        this.funcionario = funcionario;
        this.marca = marca;
        this.avaliacaoFuncionarios = avaliacaoFuncionarios;
        this.avaliacaoClientes = avaliacaoClientes;
    }

    public Long getCodProduto() {
        return codProduto;
    }

    public void setCodProduto(Long codProduto) {
        this.codProduto = codProduto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public byte[] getImagemProduto() {
        return imagemProduto;
    }

    public void setImagemProduto(byte[] imagemProduto) {
        this.imagemProduto = imagemProduto;
    }



    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Set<AvaliacaoFuncionario> getAvaliacaoFuncionarios() {
        return avaliacaoFuncionarios;
    }

    public void setAvaliacaoFuncionarios(Set<AvaliacaoFuncionario> avaliacaoFuncionarios) {
        this.avaliacaoFuncionarios = avaliacaoFuncionarios;
    }

    public Set<AvaliacaoCliente> getAvaliacaoClientes() {
        return avaliacaoClientes;
    }

    public void setAvaliacaoClientes(Set<AvaliacaoCliente> avaliacaoClientes) {
        this.avaliacaoClientes = avaliacaoClientes;
    }
}
