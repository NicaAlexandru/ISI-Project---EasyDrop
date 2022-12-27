package com.easydropbackend.repositories;

import com.easydropbackend.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    void deleteUserByIdUser(Long idUser);

    Optional<AppUser> findByIdUser(Long idUser);
}
