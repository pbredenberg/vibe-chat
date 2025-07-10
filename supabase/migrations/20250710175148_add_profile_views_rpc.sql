-- Creating RPC function to count profile views
CREATE OR REPLACE FUNCTION public.get_profile_views(_profile_id UUID)
RETURNS TABLE(view_count INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT COUNT(*)::INTEGER as view_count
  FROM public.profile_views
  WHERE profile_id = _profile_id;
END;
$$;

-- Uprawnienia dla funkcji
GRANT EXECUTE ON FUNCTION public.get_profile_views(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_profile_views(UUID) TO anon;
