package com.example.immoapp.repository;

import com.example.immoapp.model.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
    @Query("SELECT a FROM Annonce a " +
            "WHERE (:location IS NULL OR a.location = :location) " +
            "AND (:minPrice IS NULL OR a.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR a.price <= :maxPrice)")
    List<Annonce> search(
            @Param("location") String location,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );
}
