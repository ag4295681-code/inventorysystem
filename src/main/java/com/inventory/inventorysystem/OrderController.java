package com.inventory.inventorysystem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    // Sab orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Ek order
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return ResponseEntity.ok(order);
    }

    // Status se filter
    @GetMapping("/status/{status}")
    public List<Order> getByStatus(@PathVariable Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    // Naya order
    @PostMapping
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        Product product = productRepository.findById(order.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() < order.getQuantity()) {
            return ResponseEntity.badRequest().body("Insufficient stock!");
        }

        order.setProductName(product.getName());
        order.setCompanyName(product.getCompanyName());
        order.setTotalPrice(product.getPrice() * order.getQuantity());

        // Stock kam karo
        product.setQuantity(product.getQuantity() - order.getQuantity());
        productRepository.save(product);

        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    // Order status update
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(
            @PathVariable Long id,
            @RequestBody Order updatedOrder) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(updatedOrder.getStatus());
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    // Order delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return ResponseEntity.ok("Order deleted");
    }
}