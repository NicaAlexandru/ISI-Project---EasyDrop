package com.easydropbackend.service;

import com.easydropbackend.entities.Courier;
import com.easydropbackend.exceptions.CourierNotFoundException;
import com.easydropbackend.repositories.CourierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourierService {
    private final CourierRepository courierRepository;

    @Autowired
    public CourierService(CourierRepository courierRepository) {
        this.courierRepository = courierRepository;
    }

    public Courier addCourier(Courier new_courier) {
        return courierRepository.save(new_courier);
    }

    public List<Courier> findAllSellers() {
        return courierRepository.findAll();
    }

    public Courier findUserById(String idCourier) {
        return courierRepository.findByIdCourier(idCourier).orElseThrow(() ->
                new CourierNotFoundException("Client with id " + "was not found"));
    }

    public Courier updateClient(Courier updated_courier) {
        return courierRepository.save(updated_courier);
    }

    public void deleteCourier(String idCourier) {
        courierRepository.deleteCourierByIdCourier(idCourier);
    }

}

