package com.kraftheinz.kraftheinzbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="tag_sequence")
    @SequenceGenerator(name="tag_sequence", sequenceName = "tag_sequence",initialValue=1, allocationSize=1)
    @Column(name = "TAG_ID")
    private int codTag;

    @Column(name="nome_tag")
    private String nomeTag;

    @ManyToMany(mappedBy = "tagsFuncionario",cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("tagsFuncionario")
    Set<AvaliacaoFuncionario> avaliacaoFuncionario;

    @ManyToMany(mappedBy = "tagsCliente",cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("tagsCliente")
    Set<AvaliacaoCliente> avaliacaoCliente;

    public Tag(String nomeTag, Set<AvaliacaoFuncionario> avaliacaoFuncionario, Set<AvaliacaoCliente> avaliacaoCliente) {
        this.nomeTag = nomeTag;
        this.avaliacaoFuncionario = avaliacaoFuncionario;
        this.avaliacaoCliente = avaliacaoCliente;
    }

    public Tag() {
    }

    public int getCodTag() {
        return codTag;
    }

    public void setCodTag(int codTag) {
        this.codTag = codTag;
    }

    public String getNomeTag() {
        return nomeTag;
    }

    public void setNomeTag(String nome) {
        this.nomeTag = nome;
    }

    public Set<AvaliacaoFuncionario> getAvaliacaoFuncionario() {
        return avaliacaoFuncionario;
    }

    public void setAvaliacaoFuncionario(Set<AvaliacaoFuncionario> avaliacaoFuncionarioSet) {
        this.avaliacaoFuncionario = avaliacaoFuncionarioSet;
    }

    public Set<AvaliacaoCliente> getAvaliacaoCliente() {
        return avaliacaoCliente;
    }

    public void setAvaliacaoCliente(Set<AvaliacaoCliente> avaliacaoClienteSet) {
        this.avaliacaoCliente = avaliacaoClienteSet;
    }
}
