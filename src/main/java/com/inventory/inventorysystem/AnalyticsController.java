package com.inventory.inventorysystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/summary")
    public Map<String, Object> getAnalyticsSummary() {

        List<Transaction> all = transactionRepository.findAll();

        int totalIn = 0;
        int totalOut = 0;

        Map<String, Integer> inByProduct = new HashMap<>();
        Map<String, Integer> outByProduct = new HashMap<>();

        for (Transaction t : all) {
            String product = t.getProductName() != null ? t.getProductName() : "Unknown";

            if (t.getType() == Transaction.TransactionType.IN) {
                totalIn += t.getQuantity();
                inByProduct.merge(product, t.getQuantity(), Integer::sum);
            } else {
                totalOut += t.getQuantity();
                outByProduct.merge(product, t.getQuantity(), Integer::sum);
            }
        }

        Map<String, Integer> totalByProduct = new HashMap<>();
        inByProduct.forEach((k, v) -> totalByProduct.merge(k, v, Integer::sum));
        outByProduct.forEach((k, v) -> totalByProduct.merge(k, v, Integer::sum));

        List<Map<String, Object>> topProducts = totalByProduct.entrySet().stream()
                .sorted((a, b) -> b.getValue() - a.getValue())
                .limit(5)
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("product", e.getKey());
                    m.put("totalMovement", e.getValue());
                    m.put("in", inByProduct.getOrDefault(e.getKey(), 0));
                    m.put("out", outByProduct.getOrDefault(e.getKey(), 0));
                    return m;
                })
                .collect(Collectors.toList());

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("totalIn", totalIn);
        response.put("totalOut", totalOut);
        response.put("netStock", totalIn - totalOut);
        response.put("totalTransactions", all.size());
        response.put("topProducts", topProducts);

        return response;
    }
}