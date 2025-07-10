-- Table to track profile views
CREATE TABLE public.profile_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) NOT NULL,
  viewer_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(profile_id, viewer_id)
);

-- Uprawnienia dla tabeli
GRANT SELECT ON TABLE public.profile_views TO authenticated;
GRANT SELECT ON TABLE public.profile_views TO anon;

-- Trigger for automatically recording views
CREATE OR REPLACE FUNCTION public.handle_profile_view()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profile_views (profile_id, viewer_id)
  VALUES (
    NEW.profile_id,
    auth.uid()
  )
  ON CONFLICT (profile_id, viewer_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when viewing a profile
CREATE TRIGGER on_profile_view
  AFTER INSERT ON public.profile_views
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_profile_view();
