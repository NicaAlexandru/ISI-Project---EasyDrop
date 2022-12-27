package com.easydropbackend.service;

import com.easydropbackend.entities.AppUser;
import com.easydropbackend.exceptions.UserNotFoundException;
import com.easydropbackend.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;

    /* Inject the repository, meaning you can you use it. Autowired will take care of all dependencies */

    @Autowired
    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public AppUser addUser(AppUser new_user) {
        new_user.setIdUser(UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE);
        return appUserRepository.save(new_user);
    }

    public List<AppUser> findAllUsers() {
        return appUserRepository.findAll();
    }

    public AppUser findUserById(Long idUser) {
        return appUserRepository.findByIdUser(idUser).orElseThrow(() ->
                new UserNotFoundException("User with id " + "was not found"));
    }

    public AppUser updateUser(AppUser updated_user) {
        return appUserRepository.save(updated_user);
    }

    public void deleteUser(Long idUser) {
        appUserRepository.deleteUserByIdUser(idUser);
    }
}
