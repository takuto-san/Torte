package torte.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI torteOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Torte API")
                .version("v1")
                .description("Torte backend API documentation")
            );
    }
}