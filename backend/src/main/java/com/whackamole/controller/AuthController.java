package com.whackamole.controller;

import com.whackamole.dto.LoginRequest;
import com.whackamole.dto.SignupRequest;
import com.whackamole.dto.UserResponse;
import com.whackamole.entity.User;
import com.whackamole.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody SignupRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        // Validate input
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username is required");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Email is required");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            response.put("success", false);
            response.put("message", "Password must be at least 6 characters");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Check if username exists
        if (userRepository.existsByUsername(request.getUsername())) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Check if email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Create new user (Note: In production, hash the password!)
        User user = new User(
            request.getUsername(),
            request.getEmail(),
            request.getPassword(), // TODO: Hash password in production
            request.getFullName()
        );
        
        User savedUser = userRepository.save(user);
        
        UserResponse userResponse = new UserResponse(
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            savedUser.getFullName(),
            savedUser.getCreatedAt(),
            savedUser.getLastLogin()
        );
        
        response.put("success", true);
        response.put("message", "User registered successfully");
        response.put("user", userResponse);
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        // Find user by username
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
            return ResponseEntity.badRequest().body(response);
        }
        
        User user = userOpt.get();
        
        // Check password (Note: In production, use password hashing!)
        if (!user.getPassword().equals(request.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        UserResponse userResponse = new UserResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFullName(),
            user.getCreatedAt(),
            user.getLastLogin()
        );
        
        response.put("success", true);
        response.put("message", "Login successful");
        response.put("user", userResponse);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/profile/{userId}")
    public ResponseEntity<Map<String, Object>> getProfile(@PathVariable Long userId) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.notFound().build();
        }
        
        User user = userOpt.get();
        
        UserResponse userResponse = new UserResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFullName(),
            user.getCreatedAt(),
            user.getLastLogin()
        );
        
        response.put("success", true);
        response.put("user", userResponse);
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/profile/{userId}")
    public ResponseEntity<Map<String, Object>> updateProfile(
            @PathVariable Long userId,
            @RequestBody Map<String, String> updates) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.notFound().build();
        }
        
        User user = userOpt.get();
        
        // Update fields
        if (updates.containsKey("fullName")) {
            user.setFullName(updates.get("fullName"));
        }
        if (updates.containsKey("email")) {
            user.setEmail(updates.get("email"));
        }
        
        User updatedUser = userRepository.save(user);
        
        UserResponse userResponse = new UserResponse(
            updatedUser.getId(),
            updatedUser.getUsername(),
            updatedUser.getEmail(),
            updatedUser.getFullName(),
            updatedUser.getCreatedAt(),
            updatedUser.getLastLogin()
        );
        
        response.put("success", true);
        response.put("message", "Profile updated successfully");
        response.put("user", userResponse);
        
        return ResponseEntity.ok(response);
    }
}
