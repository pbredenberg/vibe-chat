-- Create the chats table
CREATE TABLE IF NOT EXISTS public.chats (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (create a chat)
CREATE POLICY "Anyone can create chat" ON public.chats
    FOR INSERT
    WITH CHECK (auth.uid() = creator_id);

-- Policy: Only creator can update name/description
CREATE POLICY "Only creator can update chat details" ON public.chats
    FOR UPDATE
    USING (auth.uid() = creator_id);

-- Policy: Anyone can select (view chats)
CREATE POLICY "Anyone can view chats" ON public.chats
    FOR SELECT
    USING (true);
