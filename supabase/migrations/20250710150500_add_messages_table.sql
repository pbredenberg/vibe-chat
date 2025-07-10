CREATE TABLE IF NOT EXISTS public.messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id uuid NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
    sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Anyone can view messages
CREATE POLICY "Anyone can view messages" ON public.messages
    FOR SELECT
    USING (true);

-- Only authenticated users can send messages
CREATE POLICY "Authenticated can send messages" ON public.messages
    FOR INSERT
    WITH CHECK (auth.uid() = sender_id);

-- Only the sender can update/delete their own messages
CREATE POLICY "Sender can update message" ON public.messages
    FOR UPDATE
    USING (auth.uid() = sender_id);

CREATE POLICY "Sender can delete message" ON public.messages
    FOR DELETE
    USING (auth.uid() = sender_id);
