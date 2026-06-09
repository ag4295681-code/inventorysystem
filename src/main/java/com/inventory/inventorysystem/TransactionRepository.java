package com.inventory.inventorysystem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Ek product ki saari transactions
    List<Transaction> findByProductId(Long productId);

    // Type se filter — IN ya OUT
    List<Transaction> findByType(Transaction.TransactionType type);

    // Company ke hisaab se
    List<Transaction> findByCompanyName(String companyName);

}