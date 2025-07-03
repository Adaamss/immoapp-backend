package com.example.immoapp.controller;

import com.example.immoapp.model.Rating;
import com.example.immoapp.model.User;
import com.example.immoapp.repository.UserRepository;
import com.example.immoapp.service.RatingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingService ratingService;
    private final UserRepository userRepository;

    public RatingController(RatingService ratingService, UserRepository userRepository) {
        this.ratingService = ratingService;
        this.userRepository = userRepository;
    }

    @PostMapping("/rate")
    public ResponseEntity<?> rateAnnonce(
            @RequestParam Long annonceId,
            @RequestParam int stars,
            Principal principal // 👈 this gives you the logged-in user's email
    ) {
        String email = principal.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");

        Long userId = userOpt.get().getId();

        try {
            Rating rating = ratingService.addRating(userId, annonceId, stars);
            return ResponseEntity.ok(rating);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/average/{annonceId}")
    public double getAverage(@PathVariable Long annonceId) {
        return ratingService.getAverageRating(annonceId);
    }

    @GetMapping("/annonce/{annonceId}")
    public ResponseEntity<List<Rating>> getRatingsForAnnonce(@PathVariable Long annonceId) {
        List<Rating> ratings = ratingService.getRatingsByAnnonceId(annonceId);
        return ResponseEntity.ok(ratings);
    }


}
