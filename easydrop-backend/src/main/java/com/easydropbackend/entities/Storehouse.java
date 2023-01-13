package com.easydropbackend.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "storehouse")
public class Storehouse {
    @Id
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDHexGenerator")
    @GeneratedValue(generator = "uuid")
    @Column(nullable = false, updatable = false, name="id_storehouse")
    private String idStorehouse;

    @Column(name="id_seller")
    private String idSeller;

    @Column(name="storehouse_name")
    private String storehouseName;

    @Column(name="x_coord")
    private String xCoord;

    @Column(name="y_coord")
    private String yCoord;

    @Column(name="img_url")
    private String imgURL;
}
