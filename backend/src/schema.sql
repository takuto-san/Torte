BEGIN;

-- ENUM types ---------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'unit') THEN
    CREATE TYPE unit AS ENUM ('g', 'ml', 'piece');
    -- 必要に応じて: ALTER TYPE unit ADD VALUE 'tsp'; などで追加できます
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'meal_category') THEN
    CREATE TYPE meal_category AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');
  END IF;
END
$$;

-- Master tables ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS food (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  image       TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS ingredient (
  id       BIGSERIAL PRIMARY KEY,
  name     TEXT NOT NULL UNIQUE,
  calories NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (calories >= 0),
  protein  NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (protein  >= 0),
  carbs    NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (carbs    >= 0),
  fat      NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (fat      >= 0),
  salt     NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (salt     >= 0)
);

-- Meals --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS meal (
  id       BIGSERIAL PRIMARY KEY,
  date     DATE NOT NULL,
  category meal_category NOT NULL,
  UNIQUE (date, category) -- 同日の同カテゴリを一意に
);

-- Composition --------------------------------------------------------------

CREATE TABLE IF NOT EXISTS recipe (
  id            BIGSERIAL PRIMARY KEY,
  food_id       BIGINT NOT NULL REFERENCES food(id) ON DELETE CASCADE,
  ingredient_id BIGINT NOT NULL REFERENCES ingredient(id) ON DELETE RESTRICT,
  quantity      NUMERIC(10,2) NOT NULL CHECK (quantity >= 0),
  unit          unit NOT NULL,
  UNIQUE (food_id, ingredient_id)
);

CREATE TABLE IF NOT EXISTS meal_detail (
  id            BIGSERIAL PRIMARY KEY,
  meal_id       BIGINT NOT NULL REFERENCES meal(id) ON DELETE CASCADE,
  food_id       BIGINT REFERENCES food(id) ON DELETE RESTRICT,
  ingredient_id BIGINT REFERENCES ingredient(id) ON DELETE RESTRICT,
  quantity      NUMERIC(10,2) NOT NULL CHECK (quantity >= 0),
  unit          unit NOT NULL,
  -- food_id と ingredient_id のどちらか一方のみ必須 (XOR)
  CONSTRAINT meal_detail_food_xor_ingredient
    CHECK ( (food_id IS NULL) <> (ingredient_id IS NULL) )
);

-- Indexes for FKs ----------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_recipe_food_id            ON recipe(food_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredient_id      ON recipe(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_meal_detail_meal_id       ON meal_detail(meal_id);
CREATE INDEX IF NOT EXISTS idx_meal_detail_food_id       ON meal_detail(food_id);
CREATE INDEX IF NOT EXISTS idx_meal_detail_ingredient_id ON meal_detail(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_meal_date_category        ON meal(date, category);

COMMIT;

-- 参考:
-- 栄養値は 100g/100ml 基準など、プロジェクトの基準に合わせて運用してください。