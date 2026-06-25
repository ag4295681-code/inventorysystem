package com.inventory.inventorysystem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/transactions")
public class InventoryStockController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ProductRepository productRepository;

    // Sab transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // Ek product ki transactions
    @GetMapping("/product/{productId}")
    public List<Transaction> getByProduct(@PathVariable Long productId) {
        return transactionRepository.findByProductId(productId);
    }

    // Type se filter — IN ya OUT
    @GetMapping("/type/{type}")
    public List<Transaction> getByType(@PathVariable Transaction.TransactionType type) {
        return transactionRepository.findByType(type);
    }

    // Naya transaction add karo
    @PostMapping
    public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction) {

        Product product = productRepository.findById(transaction.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (transaction.getType() == Transaction.TransactionType.IN) {
            product.setQuantity(product.getQuantity() + transaction.getQuantity());
        } else {
            if (product.getQuantity() < transaction.getQuantity()) {
                return ResponseEntity.badRequest().body("Insufficient stock!");
            }
            product.setQuantity(product.getQuantity() - transaction.getQuantity());
        }

        transaction.setProductName(product.getName());
        transaction.setCompanyName(product.getCompanyName());

        productRepository.save(product);
        transactionRepository.save(transaction);

        return ResponseEntity.ok(transaction);
    }

    // Transaction delete karo
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id) {
        transactionRepository.deleteById(id);
        return ResponseEntity.ok("Transaction deleted");
    }
}