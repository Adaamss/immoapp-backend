package com.example.immoapp.service;

import com.example.immoapp.dto.LoginRequest;
import com.example.immoapp.model.User;
import com.example.immoapp.repository.UserRepository;
import com.example.immoapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    public String login(LoginRequest loginRequest) {
        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if password matches
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Check if user is enabled (email confirmed)
        if (!user.isEnabled()) {
            throw new RuntimeException("Email not confirmed");
        }

        // Generate JWT token
        return jwtUtil.generateToken(user.getEmail());
    }

    public User registerUser(User user) {
        // This is the key: encode password BEFORE saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);  // keep disabled until email confirmed
        User savedUser = userRepository.save(user);
//        return userRepository.save(user);

        String confirmationLink = "http://localhost:8080/api/users/confirm?email=" + savedUser.getEmail();

        // Send email with confirmation link
        emailService.sendEmail(
                savedUser.getEmail(),
                "Please Confirm Your Email",
                "Click the following link to confirm your email and activate your account: " + confirmationLink
        );

        return savedUser;
    }


    private final UserRepository userRepository;
    public Optional<User> confirmEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        userOpt.ifPresent(user -> {
            user.setEnabled(true);
            userRepository.save(user);
        });
        return userOpt;
    }
@Autowired
public UserService(UserRepository repo, JwtUtil jwtUtil) {
    this.userRepository = repo;
    this.jwtUtil = jwtUtil;
}

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}