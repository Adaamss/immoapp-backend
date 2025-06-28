package com.example.immoapp.controller;

import com.example.immoapp.model.Rating;
import com.example.immoapp.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/rate")
    public ResponseEntity<?> rateAnnonce(@RequestParam Long userId,
                                         @RequestParam Long annonceId,
                                         @RequestParam int stars) {
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
