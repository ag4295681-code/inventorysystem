package com.inventory.inventorysystem;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int quantity;
    private double price;

    // Category
    private String category;

    // Low stock threshold — agar quantity isse kam ho toh alert
    private int lowStockThreshold = 10;

    // Legal fields
    private String licenseNumber;
    private String expiryDate;

    @Enumerated(EnumType.STRING)
    private LegalStatus legalStatus = LegalStatus.LICENSED;

    // Enum for legal status
    public enum LegalStatus {
        LICENSED,
        RESTRICTED,
        BANNED
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getLowStockThreshold() { return lowStockThreshold; }
    public void setLowStockThreshold(int lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }

    public LegalStatus getLegalStatus() { return legalStatus; }
    public void setLegalStatus(LegalStatus legalStatus) { this.legalStatus = legalStatus; }

    // Helper method — low stock check
    public boolean isLowStock() {
        return this.quantity <= this.lowStockThreshold;
    }
}