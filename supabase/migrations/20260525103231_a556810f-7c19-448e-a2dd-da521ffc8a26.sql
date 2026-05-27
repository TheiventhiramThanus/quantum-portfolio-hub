
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Restrict has_role execution to authenticated callers; RLS policies still call it via SECURITY DEFINER context
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;

-- Tighten public insert policies with basic length checks
DROP POLICY "Public submit messages" ON public.messages;
CREATE POLICY "Public submit messages" ON public.messages FOR INSERT
WITH CHECK (
  length(name) BETWEEN 1 AND 200 AND
  length(email) BETWEEN 3 AND 320 AND
  length(subject) BETWEEN 1 AND 300 AND
  length(message) BETWEEN 1 AND 5000
);

DROP POLICY "Public submit comments" ON public.comments;
CREATE POLICY "Public submit comments" ON public.comments FOR INSERT
WITH CHECK (
  status = 'pending' AND featured = false AND
  length(name) BETWEEN 1 AND 200 AND
  length(email) BETWEEN 3 AND 320 AND
  length(message) BETWEEN 1 AND 2000
);
