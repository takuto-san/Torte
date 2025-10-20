package torte.repository;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import torte.dto.FoodDto;

@Repository
public class FoodRepository {

    private final JdbcTemplate jdbc;

    private static final int DEFAULT_LIMIT = 50;
    private static final int DEFAULT_OFFSET = 0;

    public FoodRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // Food
    public List<FoodDto> searchHistory(String q, Optional<String> category) {
        if (q == null || q.isBlank()) return List.of();

        String pattern = "%" + q + "%";

        StringBuilder sql = new StringBuilder();
        sql.append("SELECT f.id, f.name, NULL::numeric AS calories, NULL::numeric AS protein, NULL::numeric AS carbs, NULL::numeric AS fat, NULL::numeric AS salt ")
           .append("FROM public.meal_food mf ")
           .append("JOIN public.meal m ON mf.meal_id = m.id ")
           .append("JOIN public.food f ON mf.food_id = f.id ")
           .append("WHERE lower(f.name) LIKE lower(?) ");

        List<Object> params = new ArrayList<>();
        params.add(pattern);

        if (category != null && category.isPresent()) {
            sql.append("AND m.category = ? ");
            params.add(category.get());
        }

        sql.append("GROUP BY f.id, f.name ")
           .append("ORDER BY f.name ASC ")
           .append("LIMIT ").append(DEFAULT_LIMIT).append(" OFFSET ").append(DEFAULT_OFFSET);

        // deprecated 回避: query(sql, rowMapper, args...)
        return jdbc.query(sql.toString(), foodRowMapper(), params.toArray());
    }

    // Ingredient
    public List<FoodDto> searchIngredients(String q) {
        if (q == null || q.isBlank()) return List.of();
        String pattern = "%" + q + "%";

        String sql = ""
            + "SELECT i.id, i.name, i.calories, i.protein, i.carbs, i.fat, i.salt "
            + "FROM public.ingredient i "
            + "WHERE lower(i.name) LIKE lower(?) "
            + "ORDER BY i.name ASC "
            + "LIMIT " + DEFAULT_LIMIT + " OFFSET " + DEFAULT_OFFSET;

        return jdbc.query(sql, foodRowMapper(), pattern);
    }

    // Brand
    public List<FoodDto> searchBrands(String q) {
        if (q == null || q.isBlank()) return List.of();
        String pattern = "%" + q + "%";

        String sql = ""
            + "SELECT b.id, b.name, NULL::numeric AS calories, NULL::numeric AS protein, NULL::numeric AS carbs, NULL::numeric AS fat, NULL::numeric AS salt "
            + "FROM public.brand b "
            + "WHERE lower(b.name) LIKE lower(?) "
            + "ORDER BY b.name ASC "
            + "LIMIT " + DEFAULT_LIMIT + " OFFSET " + DEFAULT_OFFSET;

        return jdbc.query(sql, foodRowMapper(), pattern);
    }

    // Recipe
    public List<FoodDto> searchRecipes(String q) {
        if (q == null || q.isBlank()) return List.of();
        String pattern = "%" + q + "%";

        String sql = ""
            + "SELECT r.id, r.name, NULL::numeric AS calories, NULL::numeric AS protein, NULL::numeric AS carbs, NULL::numeric AS fat, NULL::numeric AS salt "
            + "FROM public.recipe r "
            + "WHERE lower(r.name) LIKE lower(?) "
            + "ORDER BY r.name ASC "
            + "LIMIT " + DEFAULT_LIMIT + " OFFSET " + DEFAULT_OFFSET;

        return jdbc.query(sql, foodRowMapper(), pattern);
    }

    private RowMapper<FoodDto> foodRowMapper() {
        return (ResultSet rs, int rowNum) -> {
            FoodDto dto = new FoodDto();

            long id = rs.getLong("id");
            if (!rs.wasNull()) dto.setId(id);

            dto.setName(rs.getString("name"));

            Number n;

            n = (Number) rs.getObject("calories");
            dto.setCalories(n == null ? null : n.doubleValue());

            n = (Number) rs.getObject("protein");
            dto.setProtein(n == null ? null : n.doubleValue());

            n = (Number) rs.getObject("carbs");
            dto.setCarbs(n == null ? null : n.doubleValue());

            n = (Number) rs.getObject("fat");
            dto.setFat(n == null ? null : n.doubleValue());

            n = (Number) rs.getObject("salt");
            dto.setSalt(n == null ? null : n.doubleValue());

            return dto;
        };
    }
}