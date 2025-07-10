-- Add display_name and avatar_url to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;

-- Optionally, set default display_name to email if you want, or leave as null for user to fill
-- No default avatar_url (user can set/upload later)
