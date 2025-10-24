DROP TABLE IF EXISTS staging_json;
CREATE TEMP TABLE staging_json (data jsonb);

\copy staging_json (data) FROM '/tmp/data.ndjson';

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

SELECT setval('ingredient_id_seq', COALESCE((SELECT MAX(id) FROM public.ingredient), 1), true);

INSERT INTO public.brand (
  name, brand_name, calories, protein, carbs, fat, salt
) VALUES
  ('ほうれん草カレー', 'CoCo壱番屋', 725, 13.0, 128.4, 19.8, 3.4),
  ('ポークカレー', 'CoCo壱番屋', 714, 11.5, 126.7, 19.6, 3.2),
  ('ダブルチーズバーガー', 'マクドナルド', 459, 26.4, 31.8, 25.1, 2.9),
  ('てりやきマックバーガー', 'マクドナルド', 477, 14.5, 37.5, 30.2, 2.1),
  ('マックフライポテト (M)', 'マクドナルド', 409, 5.5, 52.4, 19.8, 0.7);


INSERT INTO public.recipe (
  name, calories, protein, carbs, fat, salt
) VALUES
  ('チキン南蛮', 680.00, 34.00, 45.00, 36.00, 2.20),
  ('麻婆豆腐', 420.00, 21.00, 12.00, 30.00, 2.50),
  ('鶏の唐揚げ', 360.00, 24.00, 12.00, 22.00, 1.50),
  ('グリーンサラダ (フレンチドレッシング)', 140.00, 3.00, 8.00, 11.00, 0.60),
  ('豚の生姜焼き', 520.00, 28.00, 18.00, 34.00, 2.10),
  ('ハンバーグ (デミグラス)', 580.00, 30.00, 12.00, 40.00, 2.00),
  ('みそ汁（豆腐、わかめ）', 40.00, 2.00, 3.00, 1.50, 1.00);

COMMIT;


VACUUM ANALYZE public.ingredient;