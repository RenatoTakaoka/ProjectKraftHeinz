package com.kraftheinz.kraftheinzbackend.service;

import com.kraftheinz.kraftheinzbackend.model.Cliente;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.kraftheinz.kraftheinzbackend.repository.ClienteRepository;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
public class ClienteService {
    private ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    public List<Cliente> create(Cliente cliente){
        clienteRepository.save(cliente);
        return list();
    }
    public List<Cliente> list(){
        return clienteRepository.findAll();
    }
    public List<Cliente> update(Cliente cliente){
        clienteRepository.save(cliente);
        return list();
    }
    public List<Cliente> delete(Long cod){
        clienteRepository.deleteById(cod);
        return list();
    }
public ResponseEntity<?> findByEmailSenha(String email, String senha){
  Cliente cliente = clienteRepository.findUserExistsByEmailSenha(email,senha);
  if (cliente == null)
      return new ResponseEntity<String>("Login ou senha não coicidem!", HttpStatus.NOT_FOUND);
  else
      return new ResponseEntity<Cliente>(cliente,HttpStatus.OK);
}
}
