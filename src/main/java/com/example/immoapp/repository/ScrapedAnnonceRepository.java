package com.example.immoapp.repository;

import com.example.immoapp.model.ScrapedAnnonce;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScrapedAnnonceRepository extends JpaRepository<ScrapedAnnonce, Long> {
}
