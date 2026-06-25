package com.inventory.inventorysystem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Name se search — case insensitive
    List<Product> findByNameContainingIgnoreCase(String name);

    // Category se filter
    List<Product> findByCategory(String category);

    // Legal status se filter
    List<Product> findByLegalStatus(Product.LegalStatus legalStatus);

}