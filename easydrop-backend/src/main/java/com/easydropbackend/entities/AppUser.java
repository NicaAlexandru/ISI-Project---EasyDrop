package com.easydropbackend.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "app_user")
public class AppUser implements Serializable {
    @Id
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDHexGenerator")
    @GeneratedValue(generator = "uuid")
    @Column(nullable = false, updatable = false, name="id_user")
    private String idUser;

    @Column(unique=true, name="email")
    private String email;

    @Column(name="user_password")
    private String userPassword;

    @Column(name="user_type")
    private String userType;

    @Column(unique=true, name="user_name")
    private String userName;

    @Column(columnDefinition = "text", name="phone_number")
    private String phoneNumber;

    public AppUser() {}

    public AppUser(String idUser, String email, String userPassword,
                   String userType, String userName, String phoneNumber) {
        this.idUser = idUser;
        this.email = email;
        this.userPassword = userPassword;
        this.userType = userType;
        this.userName = userName;
        this.phoneNumber = phoneNumber;

    }
}
