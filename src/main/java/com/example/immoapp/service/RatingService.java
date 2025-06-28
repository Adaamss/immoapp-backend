package com.example.immoapp.service;

import com.example.immoapp.model.Rating;
import com.example.immoapp.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.OptionalDouble;

@Service
public class RatingService {
    private final RatingRepository ratingRepo;

    public RatingService(RatingRepository ratingRepo) {
        this.ratingRepo = ratingRepo;
    }

    public Rating addRating(Long userId, Long annonceId, int stars) {
        if (stars < 1 || stars > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        if (ratingRepo.existsByUserIdAndAnnonceId(userId, annonceId)) {
            throw new IllegalArgumentException("User has already rated this annonce");
        }

        Rating rating = new Rating();
        rating.setUserId(userId);
        rating.setAnnonceId(annonceId);
        rating.setStars(stars);

        return ratingRepo.save(rating);
    }

    public double getAverageRating(Long annonceId) {
        List<Rating> ratings = ratingRepo.findByAnnonceId(annonceId);
        OptionalDouble avg = ratings.stream()
                .mapToInt(Rating::getStars)
                .average();

        return avg.orElse(0.0);
    }
    public List<Rating> getRatingsByAnnonceId(Long annonceId) {
        return ratingRepo.findByAnnonceId(annonceId);
    }
}
