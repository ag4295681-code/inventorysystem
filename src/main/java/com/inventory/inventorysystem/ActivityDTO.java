package com.inventory.inventorysystem;
 
import java.time.LocalDateTime;
 
public class ActivityDTO {
 
    private String type;       // PRODUCT, ORDER, CUSTOMER, TRANSACTION
    private String message;    // "New product added: Paracetamol"
    private LocalDateTime timestamp;
 
    public ActivityDTO(String type, String message, LocalDateTime timestamp) {
        this.type = type;
        this.message = message;
        this.timestamp = timestamp;
    }
 
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
 
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
 
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
 