package com.kraftheinz.kraftheinzbackend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name="AVALIACOESCLIENTES")
final public class AvaliacaoCliente{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator ="avalicaocliente_sequence")
    @SequenceGenerator(name="avalicaocliente_sequence", sequenceName = "avalicaocliente_sequence",initialValue=1, allocationSize=1)
    @Column(name = "AVALIACOES_CLIENTE_ID")
    private Long codAvaliacoesCliente;
    @Column(name = "mensagem_ac")
    private String mensagem;
    @Column(name = "data_avaliacao_ac")
    private Date dataAvalicao = new Date(new java.util.Date().getTime());

    @Column(name="NOTA", nullable = true)
    private int nota;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "AUX_AVALIACOES_CLIENTES",
            joinColumns = @JoinColumn(name = "AVALIACOES_CLIENTE_ID",referencedColumnName = "AVALIACOES_CLIENTE_ID"),
            inverseJoinColumns = @JoinColumn(name = "TAG_ID",referencedColumnName = "TAG_ID"))
    @JsonIgnoreProperties(value = {"avaliacaoFuncionario","avaliacaoCliente"})
    Set<Tag> tagsCliente;

    @ManyToOne
    @JoinColumn(name="cliente_id", nullable=false)
    @JsonBackReference(value = "clientes-avaliacoesclientes")
    private Cliente clientes;

    @ManyToOne
    @JoinColumn(name="produto_id")
    @JsonBackReference(value = "produtos-avaliacoesclientes")
    private Produto produtos;

    @ManyToOne
    @JoinColumn(name="marca_id")
    @JsonBackReference(value = "marcas-avaliacaoclientes")
    private Marca marcas;

    public AvaliacaoCliente(String mensagem, Date dataAvalicao, int nota, Set<Tag> tagsCliente, Cliente clientes, Produto produtos, Marca marcas) {
        this.mensagem = mensagem;
        this.dataAvalicao = dataAvalicao;
        this.nota = nota;
        this.tagsCliente = tagsCliente;
        this.clientes = clientes;
        this.produtos = produtos;
        this.marcas = marcas;
    }

    public AvaliacaoCliente() {
    }

    public Long getCodAvaliacoesCliente() {
        return codAvaliacoesCliente;
    }

    public void setCodAvaliacoesCliente(Long codAvaliacoesCliente) {
        this.codAvaliacoesCliente = codAvaliacoesCliente;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Date getDataAvalicao() {
        return dataAvalicao;
    }

    public void setDataAvalicao(Date dataAvalicao) {
        this.dataAvalicao = dataAvalicao;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public Set<Tag> getTagsCliente() {
        return tagsCliente;
    }

    public void setTagsCliente(Set<Tag> tagsCliente) {
        this.tagsCliente = tagsCliente;
    }

    public Cliente getClientes() {
        return clientes;
    }

    public void setClientes(Cliente clientes) {
        this.clientes = clientes;
    }

    public Produto getProdutos() {
        return produtos;
    }

    public void setProdutos(Produto produtos) {
        this.produtos = produtos;
    }

    public Marca getMarcas() {
        return marcas;
    }

    public void setMarcas(Marca marcas) {
        this.marcas = marcas;
    }
}
