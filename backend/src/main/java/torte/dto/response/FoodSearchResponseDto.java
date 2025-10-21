package torte.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "食品情報")
public class FoodSearchResponseDto {
    @Schema(description = "ID", example = "123")
    private Long id;

    @Schema(description = "名称", example = "Apple")
    private String name;

    @Schema(description = "カロリー (kcal)", example = "52.0")
    private Double calories;

    @Schema(description = "たんぱく質 (g)", example = "0.3")
    private Double protein;

    @Schema(description = "炭水化物 (g)", example = "14.0")
    private Double carbs;

    @Schema(description = "脂質 (g)", example = "0.2")
    private Double fat;

    @Schema(description = "塩分 (g)", example = "0.0")
    private Double salt;
}