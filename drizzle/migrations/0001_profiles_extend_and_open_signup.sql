ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name text NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name text NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS academic_year text NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD CONSTRAINT profiles_academic_year_chk CHECK (academic_year IN ('', '1ère année (Classe Préparatoire)', '2ème année (Classe Préparatoire)', '3ème année (Spécialité DIB ou DMS)', '4ème année (Spécialité DIB ou DMS)', '5ème année (Spécialité DIB ou DMS)'));
COMMENT ON COLUMN public.profiles.full_name IS 'DEPRECATED: replaced by first_name/last_name';
COMMENT ON COLUMN public.profiles.study_year IS 'DEPRECATED: replaced by academic_year';
DROP TRIGGER IF EXISTS enforce_school_email_trg ON auth.users;
CREATE OR REPLACE FUNCTION public.handle_new_student()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE yr text := coalesce(NEW.raw_user_meta_data->>'academic_year','');
BEGIN
  IF yr NOT IN ('1ère année (Classe Préparatoire)', '2ème année (Classe Préparatoire)', '3ème année (Spécialité DIB ou DMS)', '4ème année (Spécialité DIB ou DMS)', '5ème année (Spécialité DIB ou DMS)') THEN yr := ''; END IF;
  INSERT INTO public.profiles (id, first_name, last_name, email, academic_year, full_name, study_year)
  VALUES (NEW.id,
    left(coalesce(NEW.raw_user_meta_data->>'first_name',''),80),
    left(coalesce(NEW.raw_user_meta_data->>'last_name',''),80),
    lower(coalesce(NEW.email,'')), yr,
    left(trim(coalesce(NEW.raw_user_meta_data->>'first_name','') || ' ' || coalesce(NEW.raw_user_meta_data->>'last_name','')),120), yr)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;