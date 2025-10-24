package torte.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import torte.dto.request.FoodSearchRequestDto;
import torte.dto.response.FoodSearchResponseDto;
import torte.mapper.FoodMapper;

@Service
public class FoodService {

    private final FoodMapper mapper;

    public FoodService(FoodMapper mapper) {
        this.mapper = mapper;
    }

    public List<FoodSearchResponseDto> search(FoodSearchRequestDto req) {
        if (req == null) {
            return List.of();
        }

        String q = req.getQ();
        Integer tab = req.getTab();
        String category = req.getCategory();

        if (!StringUtils.hasText(q)) {
            return List.of();
        }

        if (Integer.valueOf(1).equals(tab)) {
            return mapper.searchHistory(q, category);
        }

        return Stream.of(
                    mapper.searchIngredients(q),
                    mapper.searchBrands(q),
                    mapper.searchRecipes(q)
                )
                .filter(Objects::nonNull)
                .flatMap(List::stream)
                .collect(Collectors.toList());
    }
}