package torte.service;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import torte.dto.FoodDto;
import torte.repository.FoodRepository;

@Service
public class FoodService{

    private final FoodRepository repo;

    public FoodService(FoodRepository repo) {
        this.repo = repo;
    }

    public List<FoodDto> search(String q, Integer tab, Optional<String> category) {
        if (!StringUtils.hasText(q)) {
            return List.of();
        }

        if (tab == 1) {
            return repo.searchHistory(q, category);
        } else {
            List<FoodDto> results = new ArrayList<>();

            List<FoodDto> ingredientResults = repo.searchIngredients(q);
            if (ingredientResults != null && !ingredientResults.isEmpty()) {
                results.addAll(ingredientResults);
            }

            List<FoodDto> brandResults = repo.searchBrands(q);
            if (brandResults != null && !brandResults.isEmpty()) {
                results.addAll(brandResults);
            }

            List<FoodDto> recipeResults = repo.searchRecipes(q);
            if (recipeResults != null && !recipeResults.isEmpty()) {
                results.addAll(recipeResults);
            }

            return results;
        }
    }
}