package com.easydropbackend.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "client")
public class Client {
    @Id
    @Column(nullable = false, updatable = false, name="id_client")
    private String idClient;

    public Client() {}

    public Client(String idClient) {
        this.idClient = idClient;
    }
}
