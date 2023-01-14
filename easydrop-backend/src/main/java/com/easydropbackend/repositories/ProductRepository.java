package com.easydropbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.easydropbackend.entities.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {

    Optional<Product> findByIdProduct(String idProduct);

    Optional<Product> findProductByProductName(String nameProduct);

    Optional<List<Product>> findProductByIdStorehouse(String idStorehouse);

    void deleteProductByIdProduct(String idProduct);

}
