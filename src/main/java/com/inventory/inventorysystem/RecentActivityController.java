package com.inventory.inventorysystem;
 
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class RecentActivityController {
 
    @Autowired
    private ProductRepository productRepository;
 
    @Autowired
    private OrderRepository orderRepository;
 
    @Autowired
    private CustomerRepository customerRepository;
 
    @Autowired
    private TransactionRepository transactionRepository;
 
    @GetMapping("/recent-activity")
    public List<ActivityDTO> getRecentActivity() {
 
        List<ActivityDTO> activities = new ArrayList<>();
 
        // Products
        for (Product p : productRepository.findAll()) {
            activities.add(new ActivityDTO(
                    "PRODUCT",
                    "New product added: " + p.getName(),
                    p.getCreatedAt()
            ));
        }
 
        // Orders
        for (Order o : orderRepository.findAll()) {
            activities.add(new ActivityDTO(
                    "ORDER",
                    "Order #" + o.getId() + " placed by " + o.getCustomerName(),
                    o.getOrderDate()
            ));
        }
 
        // Customers
        for (Customer c : customerRepository.findAll()) {
            activities.add(new ActivityDTO(
                    "CUSTOMER",
                    "New customer registered: " + c.getName(),
                    c.getCreatedAt()
            ));
        }
 
        // Transactions
        for (Transaction t : transactionRepository.findAll()) {
            String action = t.getType() == Transaction.TransactionType.IN ? "Stock added" : "Stock removed";
            activities.add(new ActivityDTO(
                    "TRANSACTION",
                    action + ": " + t.getProductName() + " (" + t.getQuantity() + " units)",
                    t.getDate()
            ));
        }
 
        // Sort by timestamp, latest first, and take top 5
        return activities.stream()
                .filter(a -> a.getTimestamp() != null)
                .sorted(Comparator.comparing(ActivityDTO::getTimestamp).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }
}
 