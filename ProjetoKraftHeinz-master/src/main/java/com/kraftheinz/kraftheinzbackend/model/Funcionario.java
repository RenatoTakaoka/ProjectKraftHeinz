package com.kraftheinz.kraftheinzbackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "FUNCIONARIOS")
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="funcionario_sequence")
    @SequenceGenerator(name="funcionario_sequence", sequenceName = "funcionario_sequence", initialValue=1, allocationSize=1)
    @Column(name = "FUNCIONARIO_ID")
    private Long codFuncionario;
    @Column(name="primeiro_nome")
    private String primeiroNome;
    @Column(name="ultimo_nome")
    private String ultimoNome;
    @Column(name="senha_func")
    private String senha;
    @Column(name="cargo")
    private String cargo;
    @Column(name="email_funcionario")
    private String emailFuncionario;
    @Column(name="cpf")
    private int cpfFuncionario;

    @OneToMany(mappedBy = "funcionarios")
    @JsonManagedReference(value = "funcionario-avaliacaofuncionario")
    private Set<AvaliacaoFuncionario> avaliacaoFuncionarios;

    @OneToMany(mappedBy= "funcionario")
    @JsonManagedReference(value = "produto-funcionario")
    private Set<Produto> produtos;
    @OneToMany(mappedBy = "funcionario")
    @JsonManagedReference(value = "marcas-funcionario")
    private Set<Marca> marcas;

    public Funcionario(String primeiroNome, String ultimoNome, String senha, String cargo, String emailFuncionario, int cpfFuncionario) {
        this.primeiroNome = primeiroNome;
        this.ultimoNome = ultimoNome;
        this.senha = senha;
        this.cargo = cargo;
        this.emailFuncionario = emailFuncionario;
        this.cpfFuncionario = cpfFuncionario;
    }

    public Funcionario() {
    }

    public Long getCodFuncionario() {
        return codFuncionario;
    }

    public void setCodFuncionario(Long codFuncionario) {
        this.codFuncionario = codFuncionario;
    }

    public String getPrimeiroNome() {
        return primeiroNome;
    }

    public void setPrimeiroNome(String primeiroNome) {
        this.primeiroNome = primeiroNome;
    }

    public String getUltimoNome() {
        return ultimoNome;
    }

    public void setUltimoNome(String ultimoNome) {
        this.ultimoNome = ultimoNome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getEmailFuncionario() {
        return emailFuncionario;
    }

    public void setEmailFuncionario(String emailFuncionario) {
        this.emailFuncionario = emailFuncionario;
    }

    public int getCpfFuncionario() {
        return cpfFuncionario;
    }

    public void setCpfFuncionario(int cpfFuncionario) {
        this.cpfFuncionario = cpfFuncionario;
    }


    public Set<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
    }


    public Set<Marca> getMarcas() {
        return marcas;
    }

    public void setMarcas(Set<Marca> marcas) {
        this.marcas = marcas;
    }
}
