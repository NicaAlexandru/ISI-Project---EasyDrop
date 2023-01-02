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
@Table(name = "courier")
public class Courier {

    @Id
    @Column(nullable = false, updatable = false, name="id_courier")
    private String idCourier;

    public Courier() {}

    public Courier(String idCourier) {
        this.idCourier = idCourier;
    }
}

