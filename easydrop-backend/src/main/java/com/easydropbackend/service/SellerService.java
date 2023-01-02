package com.easydropbackend.service;

import com.easydropbackend.entities.Seller;
import com.easydropbackend.exceptions.SellerNotFoundException;
import com.easydropbackend.repositories.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerService {
    private final SellerRepository sellerRepository;

    @Autowired
    public SellerService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    public Seller addSeller(Seller new_seller) {
        return sellerRepository.save(new_seller);
    }

    public List<Seller> findAllSellers() {
        return sellerRepository.findAll();
    }

    public Seller findUserById(String idSeller) {
        return sellerRepository.findByIdSeller(idSeller).orElseThrow(() ->
                new SellerNotFoundException("Client with id " + "was not found"));
    }

    public Seller updateClient(Seller updated_seller) {
        return sellerRepository.save(updated_seller);
    }

    public void deleteClient(String idClient) {
        sellerRepository.deleteSellerByIdSeller(idClient);
    }

}
