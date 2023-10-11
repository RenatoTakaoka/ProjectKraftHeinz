package com.kraftheinz.kraftheinzbackend.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "MARCAS")
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="marca_sequence")
    @SequenceGenerator(name="marca_sequence", sequenceName = "marca_sequence", initialValue=1, allocationSize=1)
    @Column(name = "MARCA_ID")
    private Long codMarca;
    @Column(name = "nome_marca")
    private String nome;
    @Lob
    @Column(name = "imagem_marca", columnDefinition="BLOB")
    private byte[] imagemMarca;

    @ManyToOne
    @JoinColumn(name = "FUNCIONARIO_ID", nullable = false)
    @JsonBackReference(value = "marcas-funcionario")
    private Funcionario funcionario;

    @OneToMany(mappedBy = "marcas")
    @JsonManagedReference(value = "marcas-avaliacaofuncionario")
    private Set<AvaliacaoFuncionario> avaliacaoFuncionarios;

    @OneToMany(mappedBy = "marcas")
    @JsonManagedReference(value = "marcas-avaliacaoclientes")
    private Set<AvaliacaoCliente> avaliacaoClientes;


    @OneToMany(mappedBy="marca")
    @JsonManagedReference(value = "marcas-produtos")
    private Set<Produto> produtos;


    public Marca() {
    }

    public Marca(String nome, byte[] imagemMarca, Funcionario funcionario, Set<AvaliacaoFuncionario> avaliacaoFuncionarios, Set<AvaliacaoCliente> avaliacaoClientes, Set<Produto> produtos) {
        this.nome = nome;
        this.imagemMarca = imagemMarca;
        this.funcionario = funcionario;
        this.avaliacaoFuncionarios = avaliacaoFuncionarios;
        this.avaliacaoClientes = avaliacaoClientes;
        this.produtos = produtos;
    }

    public Long getCodMarca() {
        return codMarca;
    }

    public void setCodMarca(Long codMarca) {
        this.codMarca = codMarca;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public byte[] getImagemMarca() {
        return imagemMarca;
    }

    public void setImagemMarca(byte[] imagemMarca) {
        this.imagemMarca = imagemMarca;
    }



    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
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

    public Set<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
    }
}
