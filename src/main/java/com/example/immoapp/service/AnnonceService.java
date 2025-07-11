package com.example.immoapp.service;

import com.example.immoapp.model.Annonce;
import com.example.immoapp.repository.AnnonceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnonceService {

    private final AnnonceRepository annonceRepository;

    public AnnonceService(AnnonceRepository repo) {
        this.annonceRepository = repo;
    }

    public List<Annonce> search(String location, Double minPrice, Double maxPrice) {
        return annonceRepository.search(location, minPrice, maxPrice);
    }

    public List<Annonce> getAll() {
        return annonceRepository.findAll();
    }

    public Optional<Annonce> getById(Long id) {
        return annonceRepository.findById(id);
    }

    public Annonce save(Annonce annonce) {
        return annonceRepository.save(annonce);
    }

    public void delete(Long id) {
        annonceRepository.deleteById(id);
    }
}
