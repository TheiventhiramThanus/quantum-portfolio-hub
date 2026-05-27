ALTER TABLE public.about
  ADD COLUMN IF NOT EXISTS goals JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS background_details JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS background_description TEXT;

UPDATE public.about
SET
  goals = '[
    {"id":"g1","icon":"bot","title":"Follow","value":"Software / AI Engineering"},
    {"id":"g2","icon":"laptop","title":"Practice","value":"Software Development"},
    {"id":"g3","icon":"flag","title":"Support","value":"Tech Communities"},
    {"id":"g4","icon":"graduation-cap","title":"Complete","value":"Master''s Degree"}
  ]'::jsonb,
  background_details = '[
    {"id":"b1","icon":"badge","label":"Name","value":"Theiventhiram Thanus"},
    {"id":"b2","icon":"cake","label":"Birthday","value":"December 16"},
    {"id":"b3","icon":"user","label":"Gender","value":"Male (He/Him/His)"},
    {"id":"b4","icon":"globe","label":"Location","value":"Sri Lanka (GMT+5:30)"},
    {"id":"b5","icon":"languages","label":"Communicate","value":"Tamil & English"}
  ]'::jsonb,
  background_description = COALESCE(background_description, 'I am based in Sri Lanka and communicate in Tamil and English. My background combines software engineering studies, creative digital work, leadership experience, and a strong interest in AI, web development, and technology communities.')
WHERE (goals = '[]'::jsonb OR goals IS NULL);