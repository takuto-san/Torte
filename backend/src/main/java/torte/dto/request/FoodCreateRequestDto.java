package torte.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "食事記録作成用リクエスト")
public class FoodCreateRequestDto {

    @Builder.Default
    @Schema(description = "検索クエリ", example = "apple")
    private String q = "";

    @Builder.Default
    @Schema(description = "検索タブ (0=all, 1=history)", example = "0")
    @NotNull(message = "tab is required")
    @Min(value = 0, message = "tab must be 0 or greater")
    private Integer tab = 0;

    @Schema(description = "カテゴリフィルタ (任意)", example = "lunch")
    private String category;
}