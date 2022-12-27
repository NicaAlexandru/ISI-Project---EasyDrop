package com.easydropbackend.controllers;

import com.easydropbackend.entities.AppUser;
import com.easydropbackend.service.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/* This will represent a server. The request mapping indicates where the controller can be found */
@RestController
@RequestMapping("/users")
public class CLI {
    private final AppUserService appUserService;

    public CLI(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    /* GET request. Returns HTTP response that can contain a list of AppUsers
       The method calls the AppUserService that will interrogate the DB for all users */
    @GetMapping("/all")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> appUsers = appUserService.findAllUsers();

        // Return an OK http response (200) and the list of users
        return new ResponseEntity<>(appUsers, HttpStatus.OK);
    }

    @GetMapping("/find/{id_user}")
    public ResponseEntity<AppUser> getUserById_user(@PathVariable("id_user") Long id_user) {
        AppUser appUser = appUserService.findUserById(id_user);

        // Return an OK http response (200) and the list of users
        return new ResponseEntity<>(appUser, HttpStatus.OK);
    }
    
    /* PostMapping is used because we will add new elements to the DB */
    @PostMapping("/add")
    public ResponseEntity<AppUser> addUser(@RequestBody AppUser user) {
        AppUser added_user = appUserService.addUser(user);
        return new ResponseEntity<>(added_user, HttpStatus.CREATED);
    }
    
    /* PutMapping is used because we will alter an already existing element in the DB */
    @PutMapping("/update")
    public ResponseEntity<AppUser> updateUser(@RequestBody AppUser user) {
        AppUser updated_user = appUserService.addUser(user);
        return new ResponseEntity<>(updated_user, HttpStatus.OK);
    }

    /* DeleteMapping is used because we will delete an element from the DB */
    @DeleteMapping("/update/{id_user}")
    public ResponseEntity<?> deleteUser(@PathVariable("id_user") Long id_user) {
        appUserService.deleteUser(id_user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
