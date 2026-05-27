
-- =========================================================
-- ROLES (separate table per security best practices)
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- updated_at trigger helper
-- =========================================================
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- =========================================================
-- PROJECTS
-- =========================================================
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  technologies text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  image_url text,
  github_url text, linkedin_url text, live_url text, behance_url text, drive_url text, portfolio_url text,
  featured boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER projects_updated BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin write projects" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- SERVICES
-- =========================================================
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text,
  category text,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin write services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- EDUCATION
-- =========================================================
CREATE TABLE public.education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  degree text NOT NULL,
  institution text NOT NULL,
  period text NOT NULL,
  grade text,
  description text,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER education_updated BEFORE UPDATE ON public.education FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Admin write education" ON public.education FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- EXPERIENCE
-- =========================================================
CREATE TABLE public.experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  period text NOT NULL,
  description text,
  skills text[] NOT NULL DEFAULT '{}',
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER experience_updated BEFORE UPDATE ON public.experience FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Admin write experience" ON public.experience FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- ACHIEVEMENTS
-- =========================================================
CREATE TABLE public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text,
  period text,
  description text,
  contributions text[] NOT NULL DEFAULT '{}',
  skills text[] NOT NULL DEFAULT '{}',
  events text[] NOT NULL DEFAULT '{}',
  highlight text,
  icon text,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER achievements_updated BEFORE UPDATE ON public.achievements FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Admin write achievements" ON public.achievements FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- TECHNOLOGIES
-- =========================================================
CREATE TABLE public.technologies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  icon text,
  level int,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.technologies ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER technologies_updated BEFORE UPDATE ON public.technologies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read technologies" ON public.technologies FOR SELECT USING (true);
CREATE POLICY "Admin write technologies" ON public.technologies FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- COMMENTS (testimonials with moderation)
-- =========================================================
CREATE TYPE public.comment_status AS ENUM ('pending','approved','rejected');

CREATE TABLE public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  email text NOT NULL,
  message text NOT NULL,
  rating int CHECK (rating BETWEEN 1 AND 5),
  status comment_status NOT NULL DEFAULT 'pending',
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER comments_updated BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
-- Public can read only approved (and email/created internal cols are columns; we filter via server fn to hide email)
CREATE POLICY "Public read approved comments" ON public.comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Public submit comments" ON public.comments FOR INSERT WITH CHECK (status = 'pending' AND featured = false);
CREATE POLICY "Admin read all comments" ON public.comments FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin update comments" ON public.comments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin delete comments" ON public.comments FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- CONTACT MESSAGES
-- =========================================================
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public submit messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read messages" ON public.messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin update messages" ON public.messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin delete messages" ON public.messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- CONTACT DETAILS (single-row settings)
-- =========================================================
CREATE TABLE public.contact_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  linkedin_url text, github_url text, twitter_url text, instagram_url text,
  whatsapp_url text, portfolio_url text, main_portfolio_url text, drive_url text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_details ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER contact_details_updated BEFORE UPDATE ON public.contact_details FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read contact" ON public.contact_details FOR SELECT USING (true);
CREATE POLICY "Admin write contact" ON public.contact_details FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- =========================================================
-- ABOUT (single-row)
-- =========================================================
CREATE TABLE public.about (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  career_goal text,
  intro text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER about_updated BEFORE UPDATE ON public.about FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public read about" ON public.about FOR SELECT USING (true);
CREATE POLICY "Admin write about" ON public.about FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
