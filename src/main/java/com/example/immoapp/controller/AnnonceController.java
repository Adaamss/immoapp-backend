package com.example.immoapp.controller;

import com.example.immoapp.model.Annonce;
import com.example.immoapp.service.AnnonceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {
    private final AnnonceService annonceService;

    public AnnonceController(AnnonceService service) {
        this.annonceService = service;
    }
    @GetMapping("/search")
    public ResponseEntity<List<Annonce>> search(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        if (minPrice == null) minPrice = 0.0;
        if (maxPrice == null) maxPrice = Double.MAX_VALUE;
        List<Annonce> result = annonceService.search(location, minPrice, maxPrice);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public List<Annonce> getAll() {
        return annonceService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Annonce> getById(@PathVariable Long id) {
        return annonceService.getById(id);
    }

    @PostMapping
    public Annonce create(@RequestBody Annonce annonce) {
        return annonceService.save(annonce);
    }

    @PutMapping("/{id}")
    public Annonce update(@PathVariable Long id, @RequestBody Annonce annonce) {
        annonce.setId(id);
        return annonceService.save(annonce);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        annonceService.delete(id);
    }
}