
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  provider text NOT NULL,
  issued_date text,
  credential_id text,
  category text NOT NULL,
  skills text[] NOT NULL DEFAULT '{}',
  certificate_link text,
  verification_link text,
  certificate_image text,
  provider_logo text,
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Admin write certificates" ON public.certificates FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER set_certificates_updated_at
BEFORE UPDATE ON public.certificates
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
