package com.easydropbackend.service;

import com.easydropbackend.entities.AppUser;
import com.easydropbackend.entities.Client;
import com.easydropbackend.exceptions.ClientNotFoundException;
import com.easydropbackend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client addClient(Client new_client) {
        return clientRepository.save(new_client);
    }

    public List<Client> findAllClients() {
        return clientRepository.findAll();
    }

    public Client findUserById(String idClient) {
        return clientRepository.findByIdClient(idClient).orElseThrow(() ->
                new ClientNotFoundException("Client with id " + "was not found"));
    }

    public Client updateClient(Client updated_client) {
        return clientRepository.save(updated_client);
    }

    public void deleteClient(String idClient) {
        clientRepository.deleteClientByIdClient(idClient);
    }
}
