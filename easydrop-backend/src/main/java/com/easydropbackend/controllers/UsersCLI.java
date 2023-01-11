package com.easydropbackend.controllers;

import com.easydropbackend.entities.AppUser;
import com.easydropbackend.entities.Client;
import com.easydropbackend.entities.Seller;
import com.easydropbackend.entities.Courier;
import com.easydropbackend.service.AppUserService;
import com.easydropbackend.service.ClientService;
import com.easydropbackend.service.SellerService;
import com.easydropbackend.service.CourierService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/* This will represent a server. The request mapping indicates where the controller can be found */
@RestController
@RequestMapping("/users")
public class UsersCLI {
    private final AppUserService appUserService;
    private final ClientService clientService;
    private final SellerService sellerService;

    private final CourierService courierService;
    private static final Logger logger = LoggerFactory.getLogger(AppUserService.class);

    public UsersCLI(AppUserService appUserService, ClientService clientService, SellerService sellerService,
                    CourierService courierService) {
        this.appUserService = appUserService;
        this.clientService = clientService;
        this.sellerService = sellerService;
        this.courierService = courierService;
    }

    /* GET request. Returns HTTP response that can contain a list of AppUsers
       The method calls the AppUserService that will interrogate the DB for all users */
    @GetMapping("/allUsers")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> appUsers = appUserService.findAllUsers();

        // Return an OK http response (200) and the list of users
        return new ResponseEntity<>(appUsers, HttpStatus.OK);
    }

    @GetMapping("/findById/{id_user}")
    public ResponseEntity<AppUser> getUserById_user(@PathVariable String id_user) {
        AppUser appUser = appUserService.findUserById(id_user);

        // Return an OK http response (200) and the list of users
        if (appUser != null)
            return new ResponseEntity<>(appUser, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findByUserName/{userName}")
    public ResponseEntity<AppUser> getUserByUserName(@PathVariable String userName) {
        AppUser appUser = appUserService.findUserByUserName(userName);

        // Return an OK http response (200) and the list of users
        if (appUser != null)
            return new ResponseEntity<>(appUser, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<AppUser> getUserByEmail(@PathVariable String email) {
        AppUser appUser = appUserService.findUserByEmail(email);

        // Return an OK http response (200) and the list of users
        if (appUser != null)
            return new ResponseEntity<>(appUser, HttpStatus.OK);

        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    /* PostMapping is used because we will add new elements to the DB */
    @PostMapping("/add")
    public List<ResponseEntity<?>> addUser(@RequestBody AppUser user) {
        ArrayList<ResponseEntity<?>> responses = new ArrayList<>();

        AppUser added_user = appUserService.addUser(user);
        responses.add(new ResponseEntity<>(added_user, HttpStatus.CREATED));

        // Add to the type table as well
        String userType = user.getUserType();
        if (userType.equals("CLIENT")) {
            Client new_client = new Client(user.getIdUser());
            Client added_client = clientService.addClient(new_client);
            responses.add(new ResponseEntity<Client>(added_client, HttpStatus.CREATED));
        }

        if (userType.equals("SELLER")) {
            Seller new_seller = new Seller(user.getIdUser());
            Seller added_seller = sellerService.addSeller(new_seller);
            responses.add(new ResponseEntity<Seller>(added_seller, HttpStatus.CREATED));
        }

        if (userType.equals("COURIER")) {
            Courier new_courier = new Courier(user.getIdUser(), "N/A", "N/A");
            Courier added_courier = courierService.addCourier(new_courier);
            responses.add(new ResponseEntity<Courier>(added_courier, HttpStatus.CREATED));
        }

        return responses;
    }
    
    /* PutMapping is used because we will alter an already existing element in the DB */
    @PutMapping("/update")
    public ResponseEntity<AppUser> updateUser(@RequestBody AppUser user) {
        AppUser updated_user = appUserService.addUser(user);
        return new ResponseEntity<>(updated_user, HttpStatus.OK);
    }

    /* DeleteMapping is used because we will delete an element from the DB */
    @DeleteMapping("/update/{id_user}")
    public ResponseEntity<?> deleteUser(@PathVariable("id_user") String id_user) {
        appUserService.deleteUser(id_user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
