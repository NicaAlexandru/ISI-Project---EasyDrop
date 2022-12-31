package com.easydropbackend.repositories;

import com.easydropbackend.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, String> {
    void deleteUserByIdUser(String idUser);

    Optional<AppUser> findByIdUser(String idUser);

    Optional<AppUser> findByUserName(String userName);

    Optional<AppUser> findByEmail(String email);
}
