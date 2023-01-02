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
@Table(name = "seller")
public class Seller {

    @Id
    @Column(nullable = false, updatable = false, name="id_seller")
    private String idSeller;

    public Seller() {}

    public Seller(String idSeller) {
        this.idSeller= idSeller;
    }
}
