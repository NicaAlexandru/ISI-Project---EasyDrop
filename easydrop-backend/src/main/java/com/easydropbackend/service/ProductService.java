package com.easydropbackend.service;

import com.easydropbackend.entities.AppUser;
import com.easydropbackend.entities.Product;
import com.easydropbackend.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product new_product) {
        return productRepository.save(new_product);
    }

    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public Product findProductByIdProduct(String idProduct) {
        return productRepository.findByIdProduct(idProduct).orElse(null);
    }

    public Product findProductByProductName(String productName) {
        return productRepository.findProductByProductName(productName).orElse(null);
    }
    public List<Product> findProductByIdStorehouse(String idStorehouse) {
        return productRepository.findProductByIdStorehouse(idStorehouse).orElse(null);
    }

    public void deleteProduct(String idProduct) {
        productRepository.deleteProductByIdProduct(idProduct);
    }
}
