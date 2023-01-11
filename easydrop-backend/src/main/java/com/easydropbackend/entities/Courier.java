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

    @Column(name="x_pos")
    private String xCoord;

    @Column(name="y_pos")
    private String yCoord;

    public Courier() {}

    public Courier(String idCourier, String xCoord, String yCoord) {
        this.idCourier = idCourier;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
    }
}

