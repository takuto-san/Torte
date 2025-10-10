BEGIN;

-- ENUM types
DROP TYPE IF EXISTS public.unit;
CREATE TYPE public.unit AS ENUM ('g','ml','piece');
DROP TYPE IF EXISTS public.meal_category;
CREATE TYPE public.meal_category AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');

-- Master tables
CREATE TABLE IF NOT EXISTS public.food (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  image       TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS public.ingredient (
  id       BIGSERIAL PRIMARY KEY,
  name     TEXT NOT NULL UNIQUE,
  -- 栄養値は「固形=100gあたり、液体=100mlあたり」をプロジェクトの前提とします（DBでは強制せず運用ルール）
  calories NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (calories >= 0),
  protein  NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (protein  >= 0),
  carbs    NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (carbs    >= 0),
  fat      NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (fat      >= 0),
  salt     NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (salt     >= 0)
);

COMMENT ON TABLE  public.ingredient IS '栄養値は「固形=100gあたり、液体=100mlあたり」を前提に保存（換算と合計はAPI側で実施）';
COMMENT ON COLUMN public.ingredient.calories IS '100g/100ml あたりの kcal';
COMMENT ON COLUMN public.ingredient.protein  IS '100g/100ml あたりの g';
COMMENT ON COLUMN public.ingredient.carbs    IS '100g/100ml あたりの g';
COMMENT ON COLUMN public.ingredient.fat      IS '100g/100ml あたりの g';
COMMENT ON COLUMN public.ingredient.salt     IS '100g/100ml あたりの g';

-- Meals
CREATE TABLE IF NOT EXISTS public.meal (
  id       BIGSERIAL PRIMARY KEY,
  date     DATE NOT NULL,
  category public.meal_category NOT NULL,
  UNIQUE (date, category)  -- 同日の同カテゴリを一意に
);

-- Composition
CREATE TABLE IF NOT EXISTS public.recipe (
  id            BIGSERIAL PRIMARY KEY,
  food_id       BIGINT NOT NULL REFERENCES public.food(id) ON DELETE CASCADE,
  ingredient_id BIGINT NOT NULL REFERENCES public.ingredient(id) ON DELETE RESTRICT,
  quantity      NUMERIC(10,2) NOT NULL CHECK (quantity >= 0),
  unit          public.unit NOT NULL,
  UNIQUE (food_id, ingredient_id)
);

CREATE TABLE IF NOT EXISTS public.meal_detail (
  id            BIGSERIAL PRIMARY KEY,
  meal_id       BIGINT NOT NULL REFERENCES public.meal(id) ON DELETE CASCADE,
  food_id       BIGINT REFERENCES public.food(id) ON DELETE RESTRICT,
  ingredient_id BIGINT REFERENCES public.ingredient(id) ON DELETE RESTRICT,
  quantity      NUMERIC(10,2) NOT NULL CHECK (quantity >= 0),
  unit          public.unit NOT NULL,
  -- food_id と ingredient_id のどちらか一方のみ必須 (XOR)
  CONSTRAINT meal_detail_food_xor_ingredient
    CHECK ( (food_id IS NULL) <> (ingredient_id IS NULL) )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_recipe_food_id            ON public.recipe(food_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredient_id      ON public.recipe(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_meal_detail_meal_id       ON public.meal_detail(meal_id);
CREATE INDEX IF NOT EXISTS idx_meal_detail_food_id       ON public.meal_detail(food_id);
CREATE INDEX IF NOT EXISTS idx_meal_detail_ingredient_id ON public.meal_detail(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_meal_date_category        ON public.meal(date, category);

COMMIT;