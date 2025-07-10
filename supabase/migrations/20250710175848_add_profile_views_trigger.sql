-- Adding trigger for recording profile views
CREATE OR REPLACE FUNCTION public.handle_profile_view()
RETURNS TRIGGER AS $$
BEGIN
  -- Record view only for authenticated users
  IF auth.uid() IS NOT NULL THEN
    INSERT INTO public.profile_views (profile_id, viewer_id)
    VALUES (
      NEW.profile_id,
      auth.uid()
    )
    ON CONFLICT (profile_id, viewer_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions for trigger function
GRANT EXECUTE ON FUNCTION public.handle_profile_view() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_profile_view() TO anon;

-- Grant permissions for trigger function
GRANT EXECUTE ON FUNCTION public.handle_profile_view() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_profile_view() TO anon;

-- Trigger to call the function before inserting a new view
CREATE TRIGGER on_profile_view
    BEFORE INSERT ON public.profile_views
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_profile_view();
