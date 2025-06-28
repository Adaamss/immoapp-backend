package com.example.immoapp.service;

import com.example.immoapp.model.ScrapedAnnonce;
import com.example.immoapp.repository.ScrapedAnnonceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScrapedAnnonceService {

    private final ScrapedAnnonceRepository scrapedAnnonceRepository;

    public ScrapedAnnonceService(ScrapedAnnonceRepository scrapedAnnonceRepository) {
        this.scrapedAnnonceRepository = scrapedAnnonceRepository;
    }

    public ScrapedAnnonce save(ScrapedAnnonce annonce) {
        return scrapedAnnonceRepository.save(annonce);
    }

    public List<ScrapedAnnonce> getAll() {
        return scrapedAnnonceRepository.findAll();
    }
}
