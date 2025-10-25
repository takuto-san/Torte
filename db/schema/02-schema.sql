BEGIN;

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS public.ingredient (
  id        BIGSERIAL PRIMARY KEY,
  name      CITEXT NOT NULL UNIQUE,
  group_id  INT NOT NULL,
  calories  NUMERIC(10,2) NOT NULL CHECK (calories >= 0),
  protein   NUMERIC(10,2) NOT NULL CHECK (protein  >= 0),
  carbs     NUMERIC(10,2) NOT NULL CHECK (carbs    >= 0),
  fat       NUMERIC(10,2) NOT NULL CHECK (fat      >= 0),
  salt      NUMERIC(10,2) NOT NULL CHECK (salt     >= 0)
);

CREATE TABLE IF NOT EXISTS public.brand (
  id         BIGSERIAL PRIMARY KEY,
  name       CITEXT NOT NULL UNIQUE,
  brand_name TEXT,
  group_id   INT NOT NULL,
  calories   NUMERIC(10,2) NOT NULL CHECK (calories >= 0),
  protein    NUMERIC(10,2) NOT NULL CHECK (protein  >= 0),
  carbs      NUMERIC(10,2) NOT NULL CHECK (carbs    >= 0),
  fat        NUMERIC(10,2) NOT NULL CHECK (fat      >= 0),
  salt       NUMERIC(10,2) NOT NULL CHECK (salt     >= 0)
);

CREATE TABLE IF NOT EXISTS public.recipe (
  id        BIGSERIAL PRIMARY KEY,
  name      CITEXT NOT NULL UNIQUE,
  group_id  INT NOT NULL,
  calories  NUMERIC(10,2) NOT NULL CHECK (calories >= 0),
  protein   NUMERIC(10,2) NOT NULL CHECK (protein  >= 0),
  carbs     NUMERIC(10,2) NOT NULL CHECK (carbs    >= 0),
  fat       NUMERIC(10,2) NOT NULL CHECK (fat      >= 0),
  salt      NUMERIC(10,2) NOT NULL CHECK (salt     >= 0)
);

INSERT INTO public.ingredient (name, group_id, calories, protein, carbs, fat, salt)
SELECT DISTINCT f.name, f.group_id, f.calories, f.protein, f.carbs, f.fat, f.salt
FROM public.food f
WHERE f.group_id BETWEEN 1 AND 100
ON CONFLICT (name) DO UPDATE
  SET group_id = COALESCE(NULLIF(ingredient.group_id, -1), EXCLUDED.group_id),
      calories = CASE WHEN ingredient.calories = 0 THEN EXCLUDED.calories ELSE ingredient.calories END,
      protein  = CASE WHEN ingredient.protein  = 0 THEN EXCLUDED.protein  ELSE ingredient.protein  END,
      carbs    = CASE WHEN ingredient.carbs    = 0 THEN EXCLUDED.carbs    ELSE ingredient.carbs    END,
      fat      = CASE WHEN ingredient.fat      = 0 THEN EXCLUDED.fat      ELSE ingredient.fat      END,
      salt     = CASE WHEN ingredient.salt     = 0 THEN EXCLUDED.salt     ELSE ingredient.salt     END;

INSERT INTO public.brand (name, group_id, calories, protein, carbs, fat, salt)
SELECT DISTINCT f.name, f.group_id, f.calories, f.protein, f.carbs, f.fat, f.salt
FROM public.food f
WHERE f.group_id BETWEEN 101 AND 200
ON CONFLICT (name) DO UPDATE
  SET group_id = COALESCE(NULLIF(brand.group_id, -1), EXCLUDED.group_id),
      calories = CASE WHEN brand.calories = 0 THEN EXCLUDED.calories ELSE brand.calories END,
      protein  = CASE WHEN brand.protein  = 0 THEN EXCLUDED.protein  ELSE brand.protein  END,
      carbs    = CASE WHEN brand.carbs    = 0 THEN EXCLUDED.carbs    ELSE brand.carbs    END,
      fat      = CASE WHEN brand.fat      = 0 THEN EXCLUDED.fat      ELSE brand.fat      END,
      salt     = CASE WHEN brand.salt     = 0 THEN EXCLUDED.salt     ELSE brand.salt     END;

INSERT INTO public.recipe (name, group_id, calories, protein, carbs, fat, salt)
SELECT DISTINCT f.name, f.group_id, f.calories, f.protein, f.carbs, f.fat, f.salt
FROM public.food f
WHERE f.group_id >= 201
ON CONFLICT (name) DO UPDATE
  SET group_id = COALESCE(NULLIF(recipe.group_id, -1), EXCLUDED.group_id),
      calories = CASE WHEN recipe.calories = 0 THEN EXCLUDED.calories ELSE recipe.calories END,
      protein  = CASE WHEN recipe.protein  = 0 THEN EXCLUDED.protein  ELSE recipe.protein  END,
      carbs    = CASE WHEN recipe.carbs    = 0 THEN EXCLUDED.carbs    ELSE recipe.carbs    END,
      fat      = CASE WHEN recipe.fat      = 0 THEN EXCLUDED.fat      ELSE recipe.fat      END,
      salt     = CASE WHEN recipe.salt     = 0 THEN EXCLUDED.salt     ELSE recipe.salt     END;

SELECT setval(pg_get_serial_sequence('public.ingredient','id'),
              COALESCE((SELECT MAX(id) FROM public.ingredient), 0), true);
SELECT setval(pg_get_serial_sequence('public.brand','id'),
              COALESCE((SELECT MAX(id) FROM public.brand), 0), true);
SELECT setval(pg_get_serial_sequence('public.recipe','id'),
              COALESCE((SELECT MAX(id) FROM public.recipe), 0), true);

ALTER TABLE public.food 
  DROP COLUMN IF EXISTS calories, 
  DROP COLUMN IF EXISTS protein, 
  DROP COLUMN IF EXISTS carbs, 
  DROP COLUMN IF EXISTS fat, 
  DROP COLUMN IF EXISTS salt;

ALTER TABLE public.food
  ADD COLUMN IF NOT EXISTS ingredient_id BIGINT,
  ADD COLUMN IF NOT EXISTS brand_id BIGINT,
  ADD COLUMN IF NOT EXISTS recipe_id BIGINT;

UPDATE public.food f
SET ingredient_id = i.id
FROM public.ingredient i
WHERE f.name = i.name
  AND f.group_id BETWEEN 1 AND 100
  AND f.ingredient_id IS NULL;

UPDATE public.food f
SET brand_id = b.id
FROM public.brand b
WHERE f.name = b.name
  AND f.group_id BETWEEN 101 AND 200
  AND f.brand_id IS NULL;

UPDATE public.food f
SET recipe_id = r.id
FROM public.recipe r
WHERE f.name = r.name
  AND f.group_id >= 201
  AND f.recipe_id IS NULL;

ALTER TABLE public.food DROP CONSTRAINT IF EXISTS ck_food_one_origin;
ALTER TABLE public.food
  ADD CONSTRAINT ck_food_one_origin CHECK (
    (CASE WHEN ingredient_id IS NOT NULL THEN 1 ELSE 0 END) +
    (CASE WHEN brand_id IS NOT NULL THEN 1 ELSE 0 END) +
    (CASE WHEN recipe_id IS NOT NULL THEN 1 ELSE 0 END) = 1
  ) NOT VALID;

ALTER TABLE public.food DROP CONSTRAINT IF EXISTS fk_food_ingredient;
ALTER TABLE public.food ADD CONSTRAINT fk_food_ingredient FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id) ON DELETE RESTRICT NOT VALID;

ALTER TABLE public.food DROP CONSTRAINT IF EXISTS fk_food_brand;
ALTER TABLE public.food ADD CONSTRAINT fk_food_brand FOREIGN KEY (brand_id) REFERENCES public.brand(id) ON DELETE RESTRICT NOT VALID;

ALTER TABLE public.food DROP CONSTRAINT IF EXISTS fk_food_recipe;
ALTER TABLE public.food ADD CONSTRAINT fk_food_recipe FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON DELETE RESTRICT NOT VALID;

CREATE UNIQUE INDEX IF NOT EXISTS uq_food_by_ingredient ON public.food (ingredient_id) WHERE ingredient_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS uq_food_by_brand      ON public.food (brand_id)      WHERE brand_id      IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS uq_food_by_recipe     ON public.food (recipe_id)     WHERE recipe_id     IS NOT NULL;

COMMIT;

VACUUM ANALYZE public.food;
VACUUM ANALYZE public.ingredient;
VACUUM ANALYZE public.brand;
VACUUM ANALYZE public.recipe;