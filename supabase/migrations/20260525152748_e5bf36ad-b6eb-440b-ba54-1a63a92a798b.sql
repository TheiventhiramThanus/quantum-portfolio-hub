ALTER TABLE public.education
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS duration text,
  ADD COLUMN IF NOT EXISTS skills text[] NOT NULL DEFAULT '{}'::text[];