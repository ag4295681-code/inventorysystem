package com.inventory.inventorysystem;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
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

@CrossOrigin(origins = "*")
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

    @PutMapping("/change-password/{id}")
    public ResponseEntity<Map<String, String>> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        Map<String, String> response = new HashMap<>();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(request.get("oldPassword"), user.getPassword())) {
            response.put("message", "Old password is incorrect");
            return ResponseEntity.badRequest().body(response);
        }
        user.setPassword(passwordEncoder.encode(request.get("newPassword")));
        userRepository.save(user);
        response.put("message", "Password changed successfully");
        return ResponseEntity.ok(response);
    }

    // ✅ GitHub Login — class ke ANDAR hai
    @PostMapping("/github")
    public ResponseEntity<Map<String, Object>> githubLogin(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        String code = request.get("code");
        try {
            RestTemplate restTemplate = new RestTemplate();
            String tokenUrl = "https://github.com/login/oauth/access_token" +
                "?client_id=Ov23li3NWUYr3vNMmdN3" +
                "&client_secret=ab2c9423a55bbe7b18dd4dab518939119259a4c6" +
                "&code=" + code;
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/json");
            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Map> tokenResponse = restTemplate.exchange(
                tokenUrl, HttpMethod.POST, entity, Map.class);
            String accessToken = (String) tokenResponse.getBody().get("access_token");
            HttpHeaders userHeaders = new HttpHeaders();
            userHeaders.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> userEntity = new HttpEntity<>(userHeaders);
            ResponseEntity<Map> userResponse = restTemplate.exchange(
                "https://api.github.com/user", HttpMethod.GET, userEntity, Map.class);
            String name = (String) userResponse.getBody().get("login");
            String email = (String) userResponse.getBody().get("email");
            response.put("name", name);
            response.put("email", email != null ? email : name + "@github.com");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "GitHub login failed");
            return ResponseEntity.badRequest().body(response);
        }
    }

} 