package torte.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import torte.dto.response.FoodResponseDto;

@Mapper
public interface FoodMapper {

    List<FoodResponseDto> searchHistory(
        @Param("q") String q,
        @Param("category") String category
    );

    List<FoodResponseDto> searchIngredients(@Param("q") String q);

    List<FoodResponseDto> searchBrands(@Param("q") String q);

    List<FoodResponseDto> searchRecipes(@Param("q") String q);
}