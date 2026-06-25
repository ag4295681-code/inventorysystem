package com.inventory.inventorysystem;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    // Sab categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Add category
    @PostMapping
    public ResponseEntity<Map<String, Object>> addCategory(@RequestBody Category category) {
        Map<String, Object> response = new HashMap<>();

        if (categoryRepository.existsByName(category.getName())) {
            response.put("message", "Category already exists");
            return ResponseEntity.badRequest().body(response);
        }

        categoryRepository.save(category);
        response.put("message", "Category added successfully");
        response.put("category", category);
        return ResponseEntity.ok(response);
    }

    // Delete category
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        categoryRepository.deleteById(id);
        response.put("message", "Category deleted successfully");
        return ResponseEntity.ok(response);
    }
}