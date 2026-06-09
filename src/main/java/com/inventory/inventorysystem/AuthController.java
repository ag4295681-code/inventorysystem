package com.inventory.inventorysystem;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            response.put("message", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }

        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        response.put("message", "Registration successful");
        return ResponseEntity.ok(response);
    }

    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User loginRequest) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isEmpty()) {
            response.put("message", "Email not found");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOpt.get();

        
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("message", "Incorrect password");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("message", "Login successful");
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }

    
    @GetMapping("/profile/{id}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }

    
    @PutMapping("/profile/{id}")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @PathVariable Long id,
            @RequestBody User updatedUser) {
        Map<String, Object> response = new HashMap<>();

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        userRepository.save(user);

        response.put("message", "Profile updated successfully");
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }
}