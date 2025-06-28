package com.example.immoapp.controller;

import com.example.immoapp.model.ScrapedAnnonce;
import com.example.immoapp.service.ScrapedAnnonceService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/scrape")
public class ScrapedAnnonceController {

    private final ScrapedAnnonceService scrapedAnnonceService;

    // Define average price per m² for each location
    private static final Map<String, Double> averagePricePerM2ByLocation = Map.of(
            "SOUSSE", 2000.0,
            "ARIANA", 2500.0,
            "TUNIS", 2800.0
    );

    public ScrapedAnnonceController(ScrapedAnnonceService scrapedAnnonceService) {
        this.scrapedAnnonceService = scrapedAnnonceService;
    }

    @GetMapping
    public List<ScrapedAnnonce> scrapeAnnonces() throws IOException {
        String url = "https://immobiliere.tn/cherche/appartement-vente";
        Document doc = Jsoup.connect(url).get();

        Elements items = doc.select(".product-item");
        List<ScrapedAnnonce> results = new ArrayList<>();

        for (Element item : items) {
            String title = item.select(".product-category-title").text();

            String rawLocation = item.select("p").text(); // e.g., "SOUSSE , SOUSSE"
            String locationKey = rawLocation.split(",")[0].trim().toUpperCase();

            String surfaceRaw = item.select(".product-date").get(1).text();
            String priceRaw = item.select(".product-price").text();
            String link = item.select("a").attr("href");

            double surface = 0.0;
            double price = 0.0;
            double estimatedPrice = 0.0;

            try {
                surface = Double.parseDouble(surfaceRaw.replaceAll("[^\\d.]", ""));
                price = Double.parseDouble(priceRaw.replaceAll("[^\\d.]", ""));
            } catch (NumberFormatException e) {
                // skip invalid entries
                continue;
            }

            double avgPerM2 = averagePricePerM2ByLocation.getOrDefault(locationKey, 1500.0);
            estimatedPrice = surface * avgPerM2;

            ScrapedAnnonce annonce = new ScrapedAnnonce();
            annonce.setTitle(title);
            annonce.setLocation(rawLocation);
            annonce.setSurface(surface);
            annonce.setPrice(price);
            annonce.setUrl(link);
            annonce.setEstimatedPrice(estimatedPrice);

            scrapedAnnonceService.save(annonce);
            results.add(annonce);
        }

        return results;
    }
}
