package com.example.immoapp.controller;

import com.example.immoapp.dto.AuthenticationResponse;
import com.example.immoapp.dto.LoginRequest;
import com.example.immoapp.model.User;
import com.example.immoapp.security.JwtUtil;
import com.example.immoapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public UserController(UserService service, JwtUtil jwtUtil) {
        this.userService = service;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/confirm")
    public ResponseEntity<?> confirmEmail(@RequestParam String email) {
        return userService.confirmEmail(email)
                .map(u -> ResponseEntity.ok("Account confirmed"))
                .orElse(ResponseEntity.badRequest().body("Invalid confirmation link"));
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User createdUser = userService.registerUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/profile")
    public ResponseEntity<String> getProfile(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok("You're logged in as: " + user.getUsername());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.login(loginRequest);
            return ResponseEntity.ok(new AuthenticationResponse(token));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/{id:\\d+}")
    public Optional<User> getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @PutMapping("/{id:\\d+}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.save(user);
    }

    @DeleteMapping("/{id:\\d+}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
