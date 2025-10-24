BEGIN;

CREATE EXTENSION citext;

CREATE TYPE public.meal_category AS ENUM ('breakfast','lunch','dinner','snack');
CREATE TYPE public.food_category AS ENUM ('ingredient','brand','recipe');

CREATE TABLE public.ingredient (
  id        BIGSERIAL PRIMARY KEY,
  name      CITEXT NOT NULL UNIQUE,
  group_id  INT NOT NULL,
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
  id               BIGSERIAL PRIMARY KEY,
  name             CITEXT NOT NULL,
  origin_category  public.food_category NOT NULL,
  origin_id        BIGINT NOT NULL,
  calories         NUMERIC(10,2) NOT NULL DEFAULT 0,
  protein          NUMERIC(10,2) NOT NULL DEFAULT 0,
  carbs            NUMERIC(10,2) NOT NULL DEFAULT 0,
  fat              NUMERIC(10,2) NOT NULL DEFAULT 0,
  salt             NUMERIC(10,2) NOT NULL DEFAULT 0,
  canonical        BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT uq_food_name UNIQUE (name),
  CONSTRAINT uq_food_origin UNIQUE (origin_category, origin_id),
  CONSTRAINT chk_origin_id_positive CHECK (origin_id > 0)
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
  quantity   NUMERIC(10,3) DEFAULT 1 CHECK (quantity > 0),
  calories   NUMERIC(10,2) NOT NULL DEFAULT 0,
  protein    NUMERIC(10,2) NOT NULL DEFAULT 0,
  carbs      NUMERIC(10,2) NOT NULL DEFAULT 0,
  fat        NUMERIC(10,2) NOT NULL DEFAULT 0,
  salt       NUMERIC(10,2) NOT NULL DEFAULT 0,
  CONSTRAINT uq_meal_food UNIQUE (meal_id, food_id)
);

CREATE INDEX idx_meal_food_food_id ON public.meal_food (food_id);
CREATE INDEX idx_food_origin ON public.food (origin_category, origin_id);
CREATE INDEX idx_meal_user_date ON public.meal (user_id, date);
CREATE INDEX idx_meal_category ON public.meal (category);

COMMIT;