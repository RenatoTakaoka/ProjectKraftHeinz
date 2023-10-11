package com.kraftheinz.kraftheinzbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "AVALIACOESFUNCIONARIOS")
public class AvaliacaoFuncionario{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator ="avaliacoes_funcionario_sequence")
    @SequenceGenerator(name="avaliacoes_funcionario_sequence", sequenceName = "avaliacoes_funcionario_sequence", initialValue=1, allocationSize=1)
    @Column(name = "AVALIACOES_FUNCIONARIO_ID")
    private Long codAvalicaoFuncionario;

    @Column(name = "mensagem_af")
    private String mensagem;
    @Column(name = "data_avaliacao_af")
    private Date dataAvalicao = new Date(new java.util.Date().getTime());
    @Column(name="rede_social")
    private String redeSocial;

    @Column(name = "usuario_postagem")
    private String usuarioPostagem;

    @Column(name = "NOTA", nullable = true)
    private int nota;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "AUX_AVALIACOES_FUNCIONARIOS",
            joinColumns = @JoinColumn(name = "AVALIACOES_FUNCIONARIO_ID", referencedColumnName = "AVALIACOES_FUNCIONARIO_ID"),
            inverseJoinColumns = @JoinColumn(name = "TAG_ID", referencedColumnName = "TAG_ID"))
    @JsonIgnoreProperties(value = {"avaliacaoFuncionario","avaliacaoCliente"})
    Set<Tag> tagsFuncionario;
    @ManyToOne
    @JoinColumn(name="funcionario_id", nullable=false)
    @JsonBackReference(value = "funcionario-avaliacaofuncionario")
    private Funcionario funcionarios;

    @ManyToOne
    @JoinColumn(name="produto_id", referencedColumnName = "PRODUTO_ID",columnDefinition = "PRODUTO_ID")
    @JsonBackReference(value = "produto-avaliacaofuncionarios")
    private Produto produtos;

    @ManyToOne
    @JoinColumn(name="marca_id", referencedColumnName = "MARCA_ID",columnDefinition = "MARCA_ID")
    @JsonBackReference(value = "marcas-avaliacaofuncionario")
    private Marca marcas;

    public AvaliacaoFuncionario(String mensagem, Date dataAvalicao, String redeSocial, String usuarioPostagem, int nota, Set<Tag> tagsFuncionario, Funcionario funcionarios, Produto produtos, Marca marcas) {
        this.mensagem = mensagem;
        this.dataAvalicao = dataAvalicao;
        this.redeSocial = redeSocial;
        this.usuarioPostagem = usuarioPostagem;
        this.nota = nota;
        this.tagsFuncionario = tagsFuncionario;
        this.funcionarios = funcionarios;
        this.produtos = produtos;
        this.marcas = marcas;
    }

    public AvaliacaoFuncionario() {
    }

    public Long getCodAvalicaoFuncionario() {
        return codAvalicaoFuncionario;
    }

    public void setCodAvalicaoFuncionario(Long codAvalicaoFuncionario) {
        this.codAvalicaoFuncionario = codAvalicaoFuncionario;
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

    public String getRedeSocial() {
        return redeSocial;
    }

    public void setRedeSocial(String redeSocial) {
        this.redeSocial = redeSocial;
    }

    public String getUsuarioPostagem() {
        return usuarioPostagem;
    }

    public void setUsuarioPostagem(String usuarioPostagem) {
        this.usuarioPostagem = usuarioPostagem;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public Set<Tag> getTagsFuncionario() {
        return tagsFuncionario;
    }

    public void setTagsFuncionario(Set<Tag> tagsFuncionario) {
        this.tagsFuncionario = tagsFuncionario;
    }

    public Funcionario getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(Funcionario funcionarios) {
        this.funcionarios = funcionarios;
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
