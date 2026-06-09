package com.inventory.inventorysystem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerName(String customerName);
    List<Order> findByStatus(Order.OrderStatus status);
    List<Order> findByProductId(Long productId);
}