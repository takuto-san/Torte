package torte.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;

import torte.model.TestModel.TestStudentDetail;
import torte.model.TestModel.TestErrorResponse;
import torte.service.TestService;

@RestController
@Validated
@RequestMapping("/api/v1")
public class TestController {

    private final TestService service;

    public TestController(TestService service) {
        this.service = service;
    }

    @Operation(
        summary = "受講生検索",
        description = "パスで指定されたIDに該当する受講生を検索します。IDに紐づく受講生が存在しない場合404を返します。",
        responses = {
            @ApiResponse(responseCode = "200", description = "ok",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = TestStudentDetail.class))
            ),
            @ApiResponse(responseCode = "404", description = "指定されたIDの受講生が存在しない場合のエラー",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = TestErrorResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "UUIDの形式が誤っていた際のバリデーションエラー",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = TestErrorResponse.class))
            )
        }
    )
    @GetMapping("/student/{id}")
    public ResponseEntity<?> getStudent(
        @PathVariable
        @Pattern(regexp = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$")
        String id) {

        TestStudentDetail s = service.getStudentDetailById(id);
        if (s == null) {
            TestErrorResponse err = new TestErrorResponse(404, "student not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
        }
        return ResponseEntity.ok(s);
    }

    @Operation(
        summary = "受講生登録",
        description = "受講生を登録します",
        responses = {
            @ApiResponse(responseCode = "200", description = "ok",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = TestStudentDetail.class))
            ),
            @ApiResponse(responseCode = "400", description = "リクエストボディのバリデーションエラー",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = TestErrorResponse.class))
            )
        }
    )
    @PostMapping("/registerStudent")
    public ResponseEntity<TestStudentDetail> registerStudent(
        @RequestBody @Valid TestStudentDetail studentDetail) {

        TestStudentDetail registered = service.registerStudent(studentDetail);
        return ResponseEntity.ok(registered);
    }
}