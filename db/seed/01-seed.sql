-- DROP TABLE IF EXISTS staging_json;
-- CREATE TEMP TABLE staging_json (data jsonb);

-- \copy staging_json (data) FROM '/tmp/data.ndjson';

BEGIN;

INSERT INTO public.ingredient (
  id,
  name,
  group_id,
  calories,
  protein,
  carbs,
  fat,
  salt
)
SELECT
  COALESCE(NULLIF(data->>'indexId','')::bigint, nextval('ingredient_id_seq')) AS id,
  COALESCE(data->>'foodName','')                                               AS name,
  COALESCE(NULLIF(data->>'groupId','')::int,    -1)                           AS group_id,
  COALESCE(NULLIF(data->>'enercKcal','')::numeric, 0)                          AS calories,
  COALESCE(NULLIF(data->>'prot','')::numeric,      0)                          AS protein,
  COALESCE(NULLIF(data->>'chocdf','')::numeric,    0)                          AS carbs,
  COALESCE(NULLIF(data->>'fat','')::numeric,       0)                          AS fat,
  COALESCE(NULLIF(data->>'naclEq','')::numeric,    0)                          AS salt
FROM staging_json
ON CONFLICT (id) DO NOTHING;

COMMIT;

SELECT setval('ingredient_id_seq', COALESCE((SELECT MAX(id) FROM public.ingredient), 1), true);

VACUUM ANALYZE public.ingredient;