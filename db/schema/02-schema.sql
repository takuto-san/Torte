BEGIN;

ALTER TABLE public.brand
  ADD COLUMN calories NUMERIC(10,2),
  ADD COLUMN protein  NUMERIC(10,2),
  ADD COLUMN carbs    NUMERIC(10,2),
  ADD COLUMN fat      NUMERIC(10,2),
  ADD COLUMN salt     NUMERIC(10,2);

CREATE INDEX IF NOT EXISTS idx_brand_name_lower ON public.brand ((lower(name)));

COMMIT;