ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS specialty text NOT NULL DEFAULT '';
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_academic_year_chk;
UPDATE public.profiles SET academic_year = split_part(academic_year, ' (', 1) WHERE academic_year LIKE '_ème année (Spécialité%';
ALTER TABLE public.profiles ADD CONSTRAINT profiles_academic_year_chk CHECK (academic_year IN ('', '1ère année (Classe Préparatoire)', '2ème année (Classe Préparatoire)', '3ème année', '4ème année', '5ème année'));
ALTER TABLE public.profiles ADD CONSTRAINT profiles_specialty_chk CHECK (specialty IN ('', 'DIB', 'DMS'));
CREATE OR REPLACE FUNCTION public.handle_new_student()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  yr text := coalesce(NEW.raw_user_meta_data->>'academic_year','');
  sp text := coalesce(NEW.raw_user_meta_data->>'specialty','');
BEGIN
  IF yr NOT IN ('1ère année (Classe Préparatoire)', '2ème année (Classe Préparatoire)', '3ème année', '4ème année', '5ème année') THEN yr := ''; END IF;
  IF yr NOT IN ('3ème année', '4ème année', '5ème année') OR sp NOT IN ('DIB','DMS') THEN sp := ''; END IF;
  INSERT INTO public.profiles (id, first_name, last_name, email, academic_year, specialty, full_name, study_year)
  VALUES (NEW.id,
    left(coalesce(NEW.raw_user_meta_data->>'first_name',''),80),
    left(coalesce(NEW.raw_user_meta_data->>'last_name',''),80),
    lower(coalesce(NEW.email,'')), yr, sp,
    left(trim(coalesce(NEW.raw_user_meta_data->>'first_name','') || ' ' || coalesce(NEW.raw_user_meta_data->>'last_name','')),120), yr)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;