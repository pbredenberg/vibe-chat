-- Function to update updated_at column for chats
CREATE OR REPLACE FUNCTION public.update_chats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Grant permissions for the function
GRANT EXECUTE ON FUNCTION public.update_chats_updated_at() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_chats_updated_at() TO anon;

-- Create trigger to update updated_at column
CREATE TRIGGER update_chats_updated_at
    BEFORE UPDATE ON public.chats
    FOR EACH ROW
    EXECUTE FUNCTION public.update_chats_updated_at();
