package torte.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import torte.dto.request.FoodSearchRequestDto; 
import torte.dto.response.FoodSearchResponseDto;
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
        description = "検索クエリと一致する食品を取得するAPI。tab=1 のときは履歴検索。",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "検索結果一覧",
                content = @Content(array = @ArraySchema(schema = @Schema(implementation = FoodSearchResponseDto.class)))
            )
        }
    )
    @GetMapping("/search")
    public List<FoodSearchResponseDto> search(
            @Valid @ModelAttribute FoodSearchRequestDto req,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            String msg = bindingResult.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.joining("; "));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, msg);
        }

        return service.search(req);
    }
}