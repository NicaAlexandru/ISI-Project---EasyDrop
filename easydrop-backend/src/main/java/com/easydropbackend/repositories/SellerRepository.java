package com.easydropbackend.repositories;

import com.easydropbackend.entities.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, String> {
    Optional<Seller> findByIdSeller(String idSeller);

    void deleteSellerByIdSeller(String idSeller);
}
