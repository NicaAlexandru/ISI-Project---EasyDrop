package com.easydropbackend.repositories;

import com.easydropbackend.entities.Courier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CourierRepository extends JpaRepository<Courier, String> {
    Optional<Courier> findByIdCourier(String idCourier);

    void deleteCourierByIdCourier(String idCourier);
}
