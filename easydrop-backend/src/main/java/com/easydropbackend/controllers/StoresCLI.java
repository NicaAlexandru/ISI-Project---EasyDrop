package com.easydropbackend.controllers;

import com.easydropbackend.entities.AppUser;
import com.easydropbackend.entities.Storehouse;
import com.easydropbackend.service.StorehouseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/stores")
public class StoresCLI {
    private final StorehouseService storehouseService;

    public StoresCLI(StorehouseService storehouseService) {
        this.storehouseService = storehouseService;
    }

    @GetMapping("/allStores")
    public ResponseEntity<List<Storehouse>> getAllStores() {
        List<Storehouse> stores = storehouseService.findAllStores();

        // Return an OK http response (200) and the list of stores
        return new ResponseEntity<>(stores, HttpStatus.OK);

    }

    @GetMapping("/findBySellerId/{id_seller}")
    public ResponseEntity<List<Storehouse>> getStorehouseByIdSeller(@PathVariable String id_seller) {
        List<Storehouse> stores = storehouseService.findStorehouseByIdSeller(id_seller);

        // Return an OK http response (200) and the list of users
        if (stores!= null)
            return new ResponseEntity<>(stores, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findById/{id_storehouse}")
    public ResponseEntity<Storehouse> getStorehouseByIdStorehouse(@PathVariable String id_storehouse) {
        Storehouse storehouse = storehouseService.findStorehouseById(id_storehouse);

        // Return an OK http response (200) and the list of users
        if (storehouse != null)
            return new ResponseEntity<>(storehouse, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findByName/{storehouseName}")
    public ResponseEntity<Storehouse> getStorehouseByName(@PathVariable String storehouseName) {
        Storehouse storehouse = storehouseService.findStorehouseByStorehouseName(storehouseName);

        // Return an OK http response (200) and the list of users
        if (storehouse != null)
            return new ResponseEntity<>(storehouse, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    /* PostMapping is used because we will add new elements to the DB */
    @PostMapping("/add")
    public ResponseEntity<Storehouse> addStorehouse(@RequestBody Storehouse storehouse) {
        Storehouse added_storehouse = storehouseService.addStorehouse(storehouse);
        return (new ResponseEntity<Storehouse>(added_storehouse, HttpStatus.CREATED));
    }

    @PutMapping("/update")
    public ResponseEntity<Storehouse> updateStorehouse(@RequestBody Storehouse storehouse) {
        Storehouse updated_storehouse = storehouseService.addStorehouse(storehouse);
        return new ResponseEntity<>(updated_storehouse, HttpStatus.OK);
    }

    /* DeleteMapping is used because we will delete an element from the DB */
    @DeleteMapping("/delete/{id_storehouse}")
    public ResponseEntity<?> deleteUser(@PathVariable("id_storehouse") String id_storehouse) {
        storehouseService.deleteStorehouse(id_storehouse);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
