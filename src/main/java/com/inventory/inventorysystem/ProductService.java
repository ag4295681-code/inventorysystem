package com.inventory.inventorysystem;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    // Sab products
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    // Ek product by ID
    public Product getProductById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // Add product
    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    // Update product
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = getProductById(id);
        existing.setName(updatedProduct.getName());
        existing.setQuantity(updatedProduct.getQuantity());
        existing.setPrice(updatedProduct.getPrice());
        existing.setCategory(updatedProduct.getCategory());
        existing.setLicenseNumber(updatedProduct.getLicenseNumber());
        existing.setExpiryDate(updatedProduct.getExpiryDate());
        existing.setLegalStatus(updatedProduct.getLegalStatus());
        existing.setLowStockThreshold(updatedProduct.getLowStockThreshold());
        return repository.save(existing);
    }

    // Delete product
    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }

    // Search by name
    public List<Product> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    // Search by category
    public List<Product> getByCategory(String category) {
        return repository.findByCategory(category);
    }

    // Low stock products
    public List<Product> getLowStockProducts() {
        return repository.findAll()
                .stream()
                .filter(Product::isLowStock)
                .collect(Collectors.toList());
    }

    // Legal status filter
    public List<Product> getByLegalStatus(Product.LegalStatus status) {
        return repository.findByLegalStatus(status);
    }
}