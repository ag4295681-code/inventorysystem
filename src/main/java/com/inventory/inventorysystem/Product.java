package com.inventory.inventorysystem;
 
import java.time.LocalDateTime;
 
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
 
@Entity
@Table(name = "products")
public class Product {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    private String name;
    private int quantity;
    private double price;
    private String category;
    private String companyName;  // NEW — company ka naam
 
    private int lowStockThreshold = 10;
 
    private String licenseNumber;
    private String expiryDate;
 
    private LocalDateTime createdAt = LocalDateTime.now();
 
    @Enumerated(EnumType.STRING)
    private LegalStatus legalStatus = LegalStatus.LICENSED;
 
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
 
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
 
    public int getLowStockThreshold() { return lowStockThreshold; }
    public void setLowStockThreshold(int lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; }
 
    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }
 
    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
 
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
 
    public LegalStatus getLegalStatus() { return legalStatus; }
    public void setLegalStatus(LegalStatus legalStatus) { this.legalStatus = legalStatus; }
 
    public boolean isLowStock() {
        return this.quantity <= this.lowStockThreshold;
    }
}
 