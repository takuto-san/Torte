DROP TABLE IF EXISTS staging_json;
CREATE TEMP TABLE staging_json (data jsonb);

\copy staging_json (data) FROM '/tmp/data.ndjson';

BEGIN;

INSERT INTO public.food (
  id,
  group_id,
  name,
  calories,
  protein,
  carbs,
  fat,
  salt
)
SELECT
  COALESCE(NULLIF(data->>'indexId','')::bigint,
           nextval(pg_get_serial_sequence('public.food','id')))                          AS id,
  COALESCE(NULLIF(data->>'groupId','')::int, -1)                                         AS group_id,
  COALESCE(NULLIF(data->>'foodName','')::text, '')                                       AS name,
  COALESCE(NULLIF(data->>'enercKcal','')::numeric, 0)                                    AS calories,
  COALESCE(NULLIF(data->>'prot','')::numeric, 0)                                         AS protein,
  COALESCE(NULLIF(data->>'chocdf','')::numeric, 0)                                       AS carbs,
  COALESCE(NULLIF(data->>'fat','')::numeric, 0)                                          AS fat,
  COALESCE(NULLIF(data->>'naclEq','')::numeric, 0)                                       AS salt
FROM staging_json
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('public.food','id'),
              COALESCE((SELECT MAX(id) FROM public.food), 1), true);

INSERT INTO public.food (group_id, name, calories, protein, carbs, fat, salt)
VALUES
  (101, 'ほうれん草カレー', 725, 13.0, 128.4, 19.8, 3.4),
  (101, 'ポークカレー', 714, 11.5, 126.7, 19.6, 3.2),
  (102, 'ダブルチーズバーガー', 459, 26.4, 31.8, 25.1, 2.9),
  (102, 'てりやきマックバーガー', 477, 14.5, 37.5, 30.2, 2.1),
  (102, 'マックフライポテト (M)', 409, 5.5, 52.4, 19.8, 0.7)
ON CONFLICT DO NOTHING;

INSERT INTO public.food (group_id, name, calories, protein, carbs, fat, salt)
VALUES
  (201, 'チキン南蛮', 680.00, 34.00, 45.00, 36.00, 2.20),
  (203, '麻婆豆腐', 420.00, 21.00, 12.00, 30.00, 2.50),
  (201, '鶏の唐揚げ', 360.00, 24.00, 12.00, 22.00, 1.50),
  (205, 'グリーンサラダ (フレンチドレッシング)', 140.00, 3.00, 8.00, 11.00, 0.60),
  (201, '豚の生姜焼き', 520.00, 28.00, 18.00, 34.00, 2.10),
  (202, 'ハンバーグ (デミグラス)', 580.00, 30.00, 12.00, 40.00, 2.00),
  (206, 'みそ汁（豆腐、わかめ）', 40.00, 2.00, 3.00, 1.50, 1.00)
ON CONFLICT DO NOTHING;

COMMIT;

VACUUM ANALYZE public.food;