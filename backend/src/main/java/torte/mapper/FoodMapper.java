package torte.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import torte.dto.response.FoodSearchResponseDto;

@Mapper
public interface FoodMapper {

    List<FoodSearchResponseDto> searchHistory(
        @Param("q") String q,
        @Param("category") String category
    );

    List<FoodSearchResponseDto> searchIngredients(@Param("q") String q);

    List<FoodSearchResponseDto> searchBrands(@Param("q") String q);

    List<FoodSearchResponseDto> searchRecipes(@Param("q") String q);
}