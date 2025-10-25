BEGIN;

CREATE EXTENSION  citext;

CREATE TYPE  public.meal_category AS ENUM ('breakfast','lunch','dinner','snack');
CREATE TYPE  public.food_category AS ENUM ('ingredient','brand','recipe');

CREATE TABLE public.food (
  id               BIGSERIAL PRIMARY KEY,
  group_id         INT NOT NULL,
  name             CITEXT NOT NULL,
  calories         NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (calories >= 0),
  protein          NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (protein  >= 0),
  carbs            NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (carbs    >= 0),
  fat              NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (fat      >= 0),
  salt             NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (salt     >= 0)
);

CREATE TABLE public.meal (
  id         BIGSERIAL PRIMARY KEY,
  user_id    BIGINT,
  date       DATE NOT NULL,
  category   public.meal_category NOT NULL,
  CONSTRAINT uq_meal_user_date_category UNIQUE (user_id, date, category)
);

CREATE TABLE public.meal_food (
  id         BIGSERIAL PRIMARY KEY,
  meal_id    BIGINT NOT NULL REFERENCES public.meal(id) ON DELETE CASCADE,
  food_id    BIGINT NOT NULL REFERENCES public.food(id) ON DELETE RESTRICT,
  quantity   NUMERIC(10,3) NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit       CITEXT,
  calories   NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (calories >= 0),
  protein    NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (protein >= 0),
  carbs      NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (carbs >= 0),
  fat        NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (fat >= 0),
  salt       NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (salt >= 0),
  CONSTRAINT uq_meal_food UNIQUE (meal_id, food_id)
);

CREATE INDEX  idx_meal_user_date_category ON public.meal (user_id, date, category);
CREATE INDEX  idx_meal_food_food_id ON public.meal_food (food_id);
CREATE INDEX  idx_food_name_lower ON public.food (lower(name));

COMMIT;