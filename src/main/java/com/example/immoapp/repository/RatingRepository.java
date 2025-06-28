package com.example.immoapp.repository;

import com.example.immoapp.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository  extends JpaRepository<Rating, Long> {

    List<Rating> findByAnnonceId(Long annonceId);
    boolean existsByUserIdAndAnnonceId(Long userId, Long annonceId);
}
