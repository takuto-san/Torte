package torte.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodModel {
    private Long id;
    private String name;
    private java.math.BigDecimal calories;
    private java.math.BigDecimal protein;
    private java.math.BigDecimal carbs;
    private java.math.BigDecimal fat;
    private java.math.BigDecimal salt;
}