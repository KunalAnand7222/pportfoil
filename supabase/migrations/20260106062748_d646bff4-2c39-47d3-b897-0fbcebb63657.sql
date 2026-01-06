-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create resume_roles table
CREATE TABLE public.resume_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role_id TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  focus TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resume_sections table
CREATE TABLE public.resume_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role_id TEXT NOT NULL REFERENCES public.resume_roles(role_id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resume_files table for PDF uploads
CREATE TABLE public.resume_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role_id TEXT NOT NULL UNIQUE REFERENCES public.resume_roles(role_id) ON DELETE CASCADE,
  file_url TEXT,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on resume tables
ALTER TABLE public.resume_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_files ENABLE ROW LEVEL SECURITY;

-- Public read policies for resume tables
CREATE POLICY "Anyone can view resume roles" ON public.resume_roles FOR SELECT USING (true);
CREATE POLICY "Anyone can view resume sections" ON public.resume_sections FOR SELECT USING (true);
CREATE POLICY "Anyone can view resume files" ON public.resume_files FOR SELECT USING (true);

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true);

-- Storage policies
CREATE POLICY "Anyone can view resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes');
CREATE POLICY "Authenticated users can upload resumes" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update resumes" ON storage.objects FOR UPDATE USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete resumes" ON storage.objects FOR DELETE USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Insert default resume roles
INSERT INTO public.resume_roles (role_id, label, icon, focus, display_order) VALUES
  ('frontend', 'Frontend Developer', 'layout', 'UI engineering, animations, performance, UX', 1),
  ('data_analyst', 'Data Analyst', 'bar-chart', 'Insights, dashboards, data storytelling', 2),
  ('sde', 'Software Development Engineer', 'code', 'Problem solving, DSA, scalable systems', 3),
  ('aiml', 'AI / ML Engineer', 'brain', 'Machine learning, models, experimentation', 4);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resume_roles_updated_at BEFORE UPDATE ON public.resume_roles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resume_sections_updated_at BEFORE UPDATE ON public.resume_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resume_files_updated_at BEFORE UPDATE ON public.resume_files FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();