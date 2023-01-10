package com.easydropbackend.repositories;

import com.easydropbackend.entities.Storehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StorehouseRepository extends JpaRepository<Storehouse, String> {

    Optional<Storehouse> findByIdStorehouse(String idStorehouse);

    Optional<Storehouse> findByStorehouseName(String storehouseName);

    void deleteStorehouseByIdStorehouse(String idStorehouse);
}
