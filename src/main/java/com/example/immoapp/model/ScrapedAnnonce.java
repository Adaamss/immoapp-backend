package com.example.immoapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@Entity
public class ScrapedAnnonce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;
    private double surface;          // m²
    private double price;            // listed price
    private double estimatedPrice;   // calculated price
    private String url;              // link to the ad

}
