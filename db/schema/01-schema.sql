BEGIN;

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TYPE public.meal_category AS ENUM ('breakfast','lunch','dinner','snack');

CREATE TABLE public.record (
  id         BIGSERIAL PRIMARY KEY,
  date       DATE NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.meal (
  id         BIGSERIAL PRIMARY KEY,
  record_id  BIGINT NOT NULL REFERENCES public.record(id) ON DELETE CASCADE,
  category   public.meal_category NOT NULL,
  CONSTRAINT uq_meal_record_category UNIQUE (record_id, category)
);

CREATE TABLE public.ingredient (
  id        BIGSERIAL PRIMARY KEY,
  name      CITEXT NOT NULL UNIQUE,
  group_id  INT  NOT NULL,
  calories  NUMERIC(10,2) NOT NULL CHECK (calories >= 0),
  protein   NUMERIC(10,2) NOT NULL CHECK (protein  >= 0),
  carbs     NUMERIC(10,2) NOT NULL CHECK (carbs    >= 0),
  fat       NUMERIC(10,2) NOT NULL CHECK (fat      >= 0),
  salt      NUMERIC(10,2) NOT NULL CHECK (salt     >= 0)
);

CREATE TABLE public.brand (
  id          BIGSERIAL PRIMARY KEY,
  name        CITEXT NOT NULL UNIQUE,
  brand_name  TEXT NOT NULL,
  calories    NUMERIC(10,2) NOT NULL CHECK (calories >= 0),
  protein     NUMERIC(10,2) NOT NULL CHECK (protein  >= 0),
  carbs       NUMERIC(10,2) NOT NULL CHECK (carbs    >= 0),
  fat         NUMERIC(10,2) NOT NULL CHECK (fat      >= 0),
  salt        NUMERIC(10,2) NOT NULL CHECK (salt     >= 0)
);

CREATE TABLE public.recipe (
  id               BIGSERIAL PRIMARY KEY,
  name             CITEXT NOT NULL UNIQUE,
  calories         NUMERIC(10,2) NOT NULL CHECK (calories >= 0),
  protein          NUMERIC(10,2) NOT NULL CHECK (protein  >= 0),
  carbs            NUMERIC(10,2) NOT NULL CHECK (carbs    >= 0),
  fat              NUMERIC(10,2) NOT NULL CHECK (fat      >= 0),
  salt             NUMERIC(10,2) NOT NULL CHECK (salt     >= 0)
);

CREATE TABLE public.food (
  id            BIGSERIAL PRIMARY KEY,
  name          CITEXT NOT NULL UNIQUE,
  ingredient_id BIGINT REFERENCES public.ingredient(id) ON DELETE RESTRICT,
  brand_id      BIGINT REFERENCES public.brand(id)       ON DELETE RESTRICT,
  recipe_id     BIGINT REFERENCES public.recipe(id)      ON DELETE RESTRICT,
  CONSTRAINT ck_food_single_target CHECK (num_nonnulls(ingredient_id, brand_id, recipe_id) = 1)
);

CREATE TABLE public.meal_food (
  id        BIGSERIAL PRIMARY KEY,
  meal_id   BIGINT NOT NULL REFERENCES public.meal(id) ON DELETE CASCADE,
  food_id   BIGINT NOT NULL REFERENCES public.food(id) ON DELETE RESTRICT,
  CONSTRAINT uq_meal_food UNIQUE (meal_id, food_id)
);

CREATE INDEX idx_record_created_at ON public.record (created_at);
CREATE INDEX idx_record_updated_at ON public.record (updated_at);
CREATE INDEX idx_meal_food_food_id ON public.meal_food (food_id);
CREATE INDEX idx_food_ingredient_id ON public.food (ingredient_id);
CREATE INDEX idx_food_brand_id      ON public.food (brand_id);
CREATE INDEX idx_food_recipe_id     ON public.food (recipe_id);
CREATE INDEX idx_meal_category      ON public.meal (category);

COMMIT;