package com.easydropbackend.service;

import com.easydropbackend.entities.AppUser;
import com.easydropbackend.entities.Storehouse;
import com.easydropbackend.repositories.StorehouseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StorehouseService {
    private final StorehouseRepository storehouseRepository;

    public StorehouseService(StorehouseRepository storehouseRepository) {
        this.storehouseRepository = storehouseRepository;
    }

    public Storehouse addStorehouse(Storehouse new_storehouse) {
       return storehouseRepository.save(new_storehouse);
    }

    public List<Storehouse> findAllStores() {
        return storehouseRepository.findAll();
    }

    public Storehouse findStorehouseById(String idStorehouse) {
        return storehouseRepository.findByIdStorehouse(idStorehouse).orElse(null);
    }

    public Storehouse findStorehouseByStorehouseName(String storehouseName) {
        return storehouseRepository.findByStorehouseName(storehouseName).orElse(null);
    }

    public Storehouse updateStorehouse(Storehouse updated_storehouse) {
        return storehouseRepository.save(updated_storehouse);
    }

    public void deleteStorehouse(String idStorehouse) {
        storehouseRepository.deleteStorehouseByIdStorehouse(idStorehouse);
    }
}
