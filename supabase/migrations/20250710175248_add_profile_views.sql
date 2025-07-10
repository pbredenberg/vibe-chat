-- Create table for tracking profile views
CREATE TABLE IF NOT EXISTS public.profile_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) NOT NULL,
    viewer_id UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(profile_id, viewer_id),
    UNIQUE(viewer_id, profile_id)
);

-- Grant permissions
GRANT SELECT ON TABLE public.profile_views TO authenticated;
GRANT SELECT ON TABLE public.profile_views TO anon;

-- Create RPC function to count profile views
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

-- Grant permissions for RPC function
GRANT EXECUTE ON FUNCTION public.get_profile_views(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_profile_views(UUID) TO anon;

-- Grant permissions for RPC function
GRANT EXECUTE ON FUNCTION public.get_profile_views(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_profile_views(UUID) TO anon;
