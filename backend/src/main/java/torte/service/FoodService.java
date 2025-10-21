package torte.service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import torte.dto.request.FoodSearchRequestDto;
import torte.dto.response.FoodSearchResponseDto;
import torte.repository.FoodRepository;

@Service
public class FoodService {

    private final FoodRepository repo;

    public FoodService(FoodRepository repo) {
        this.repo = repo;
    }

    public List<FoodSearchResponseDto> search(FoodSearchRequestDto req) {
        if (req == null) {
            return Collections.emptyList();
        }

        String q = req.getQ();
        Integer tab = req.getTab();
        String category = req.getCategory();

        if (!StringUtils.hasText(q)) {
            return Collections.emptyList();
        }

        if (Integer.valueOf(1).equals(tab)) {
            return repo.searchHistory(q, Optional.ofNullable(category));
        }

        return Stream.of(
                    repo.searchIngredients(q),
                    repo.searchBrands(q),
                    repo.searchRecipes(q)
                )
                .filter(Objects::nonNull)
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
}