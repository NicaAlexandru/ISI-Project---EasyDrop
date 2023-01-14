package com.easydropbackend.controllers;

import com.easydropbackend.entities.Product;
import com.easydropbackend.entities.Storehouse;
import com.easydropbackend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/products")
public class ProductCLI {
    private final ProductService productService;

    public ProductCLI(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/allProducts")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.findAllProducts();

        // Return an OK http response (200) and the list of products
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/findByIdStorehouse/{id_storehouse}")
    public ResponseEntity<List<Product>> getProductByIdStorehouse(@PathVariable String id_storehouse) {
        List<Product> products = productService.findProductByIdStorehouse(id_storehouse);

        // Return an OK http response (200) and the list of products
        if (products != null) {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findByProductName/{product_name}")
    public ResponseEntity<Product> getProductByProductName(@PathVariable String product_name) {
        Product product = productService.findProductByProductName(product_name);

        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findByProductId/{product_id}")
    public ResponseEntity<Product> getProductByProductId(@PathVariable String product_id) {
        Product product = productService.findProductByProductName(product_id);

        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    /* PostMapping is used because we will add new elements to the DB */
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product added_product = productService.addProduct(product);
        return (new ResponseEntity<Product>(added_product, HttpStatus.CREATED));
    }

    /* DeleteMapping is used because we will delete an element from the DB */
    @DeleteMapping("/delete/{id_product}")
    public ResponseEntity<?> deleteProdus(@PathVariable("id_product") String id_product) {
        productService.deleteProduct(id_product);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
