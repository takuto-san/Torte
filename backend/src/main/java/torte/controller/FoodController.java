package torte.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import torte.dto.FoodDto;
import torte.service.FoodService;

@RestController
@RequestMapping("/api/v1/foods")
public class FoodController {

    private final FoodService service;

    public FoodController(FoodService service) {
        this.service = service;
    }

    @Operation(
        summary = "食品を検索する",
        description = "q にマッチする食品・ブランド・レシピ・履歴を検索します。tab=1 のときは履歴検索。",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "検索結果一覧",
                content = @Content(array = @ArraySchema(schema = @Schema(implementation = FoodDto.class)))
            )
        }
    )
    public @GetMapping("/search")
    List<FoodDto> search(
            @Parameter(in = ParameterIn.QUERY, description = "検索クエリ", example = "apple")
            @RequestParam(value = "q", defaultValue = "") String q,

            @Parameter(in = ParameterIn.QUERY, description = "タブ (0=all, 1=history)", example = "0")
            @RequestParam(value = "tab") Integer tab,

            @Parameter(in = ParameterIn.QUERY, description = "カテゴリフィルタ (任意)", example = "lunch")
            @RequestParam(value = "category", required = false) String category
    ) {
        return service.search(q, tab, Optional.ofNullable(category));
    }
}