BEGIN;

DROP TABLE IF EXISTS public.meal_food     CASCADE;
DROP TABLE IF EXISTS public.food          CASCADE;
DROP TABLE IF EXISTS public.brand         CASCADE;
DROP TABLE IF EXISTS public.recipe_item   CASCADE;
DROP TABLE IF EXISTS public.recipe        CASCADE;
DROP TABLE IF EXISTS public.ingredient    CASCADE;
DROP TABLE IF EXISTS public.meal          CASCADE;

DROP TYPE IF EXISTS public.unit;
DROP TYPE IF EXISTS public.meal_category;

CREATE TYPE public.unit AS ENUM ('g','ml','piece','serving');
CREATE TYPE public.meal_category AS ENUM ('breakfast','lunch','dinner','snack');

CREATE TABLE public.meal (
  id       BIGSERIAL PRIMARY KEY,
  date     DATE NOT NULL,
  category public.meal_category NOT NULL,
  CONSTRAINT uq_meal_date_category UNIQUE (date, category)
);

CREATE TABLE public.ingredient (
  id        BIGSERIAL PRIMARY KEY,
  name      TEXT NOT NULL UNIQUE,
  group_id  INT  NOT NULL,
  calories  NUMERIC(10,2) NOT NULL CHECK (calories >= 0),
  protein   NUMERIC(10,2) NOT NULL CHECK (protein  >= 0),
  carbs     NUMERIC(10,2) NOT NULL CHECK (carbs    >= 0),
  fat       NUMERIC(10,2) NOT NULL CHECK (fat      >= 0),
  salt      NUMERIC(10,2) NOT NULL CHECK (salt     >= 0)
);

CREATE TABLE public.brand (
  id   BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE public.recipe (
  id              BIGSERIAL PRIMARY KEY,
  name            TEXT NOT NULL UNIQUE,
  portion_unit    public.unit   NOT NULL DEFAULT 'serving',
  serving_weight_g NUMERIC(10,2),
  CONSTRAINT ck_recipe_serving_weight_nonneg CHECK (serving_weight_g IS NULL OR serving_weight_g >= 0)
);

CREATE TABLE public.recipe_item (
  id            BIGSERIAL PRIMARY KEY,
  recipe_id     BIGINT NOT NULL REFERENCES public.recipe(id)     ON DELETE CASCADE,
  ingredient_id BIGINT NOT NULL REFERENCES public.ingredient(id) ON DELETE RESTRICT,
  quantity_g    NUMERIC(10,2) NOT NULL CHECK (quantity_g >= 0),
  CONSTRAINT uq_recipe_item UNIQUE (recipe_id, ingredient_id)
);

CREATE TABLE public.food (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  ingredient_id BIGINT REFERENCES public.ingredient(id) ON DELETE RESTRICT,
  brand_id      BIGINT REFERENCES public.brand(id)       ON DELETE RESTRICT,
  recipe_id     BIGINT REFERENCES public.recipe(id)      ON DELETE RESTRICT,
  CONSTRAINT ck_food_single_target CHECK (num_nonnulls(ingredient_id, brand_id, recipe_id) = 1),
  CONSTRAINT ux_food_ingredient UNIQUE (ingredient_id),
  CONSTRAINT ux_food_brand      UNIQUE (brand_id),
  CONSTRAINT ux_food_recipe     UNIQUE (recipe_id)
);

CREATE TABLE public.meal_food (
  id        BIGSERIAL PRIMARY KEY,
  meal_id   BIGINT NOT NULL REFERENCES public.meal(id) ON DELETE CASCADE,
  food_id   BIGINT NOT NULL REFERENCES public.food(id) ON DELETE RESTRICT,
  quantity  NUMERIC(10,2) NOT NULL CHECK (quantity >= 0),
  unit      public.unit NOT NULL,
  CONSTRAINT uq_meal_food UNIQUE (meal_id, food_id)
);

CREATE INDEX idx_food_name_lower           ON public.food ((lower(name)));
CREATE INDEX idx_recipe_item_recipe_id     ON public.recipe_item(recipe_id);
CREATE INDEX idx_recipe_item_ingredient_id ON public.recipe_item(ingredient_id);
CREATE INDEX idx_meal_food_meal_id         ON public.meal_food(meal_id);
CREATE INDEX idx_meal_food_food_id         ON public.meal_food(food_id);

COMMIT;