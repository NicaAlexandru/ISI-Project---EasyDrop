package com.easydropbackend.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="product")
public class Product {
    @Id
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDHexGenerator")
    @GeneratedValue(generator = "uuid")
    @Column(nullable = false, updatable = false, name="id_product")
    private String idProduct;

    @Column(name="id_command")
    private String idSeller;

    @Column(name="id_storehouse")
    private String idStorehouse;

    @Column(name="product_name")
    private String productName;

    @Column(name="product_description")
    private String productDescription;

    @Column(name="product_price")
    private int productPrice;

    public Product() {}
}
