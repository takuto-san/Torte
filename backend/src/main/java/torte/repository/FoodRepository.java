package torte.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import torte.dto.response.FoodSearchResponseDto;
import torte.mapper.FoodMapper;

@Repository
public class FoodRepository {

    private final FoodMapper mapper;

    private static final int DEFAULT_LIMIT = 50;
    private static final int DEFAULT_OFFSET = 0;

    public FoodRepository(FoodMapper mapper) {
        this.mapper = mapper;
    }

    public List<FoodSearchResponseDto> searchHistory(String q, Optional<String> category) {
        if (q == null || q.isBlank()) return List.of();

        String cat = category != null && category.isPresent() ? category.get() : null;
        return mapper.searchHistory(q, cat, DEFAULT_LIMIT, DEFAULT_OFFSET);
    }

    public List<FoodSearchResponseDto> searchIngredients(String q) {
        if (q == null || q.isBlank()) return List.of();
        return mapper.searchIngredients(q, DEFAULT_LIMIT, DEFAULT_OFFSET);
    }

    public List<FoodSearchResponseDto> searchBrands(String q) {
        if (q == null || q.isBlank()) return List.of();
        return mapper.searchBrands(q, DEFAULT_LIMIT, DEFAULT_OFFSET);
    }

    public List<FoodSearchResponseDto> searchRecipes(String q) {
        if (q == null || q.isBlank()) return List.of();
        return mapper.searchRecipes(q, DEFAULT_LIMIT, DEFAULT_OFFSET);
    }
}