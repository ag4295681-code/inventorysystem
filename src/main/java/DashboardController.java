package com.inventory.inventorysystem;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getDashboard(@PathVariable Long userId) {
        Map<String, Object> dashboard = new HashMap<>();

        // User profile
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", user.getName());
        profile.put("email", user.getEmail());
        dashboard.put("profile", profile);

        // Products stats
        List<Product> allProducts = productRepository.findAll();
        dashboard.put("totalProducts", allProducts.size());

        // Low stock
        List<Product> lowStock = allProducts.stream()
                .filter(Product::isLowStock)
                .toList();
        dashboard.put("lowStockCount", lowStock.size());
        dashboard.put("lowStockProducts", lowStock);

        // Legal stats
        long banned = allProducts.stream()
                .filter(p -> p.getLegalStatus() == Product.LegalStatus.BANNED)
                .count();
        long restricted = allProducts.stream()
                .filter(p -> p.getLegalStatus() == Product.LegalStatus.RESTRICTED)
                .count();
        dashboard.put("bannedCount", banned);
        dashboard.put("restrictedCount", restricted);

        // Categories
        dashboard.put("totalCategories", categoryRepository.count());

        // Transactions
        dashboard.put("totalTransactions", transactionRepository.count());

        return ResponseEntity.ok(dashboard);
    }
}