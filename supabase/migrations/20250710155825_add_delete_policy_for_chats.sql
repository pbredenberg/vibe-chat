-- Create policy to allow users to delete only their own chats
CREATE POLICY "Users can delete their own chats"
ON public.chats
FOR DELETE
TO authenticated
USING (auth.uid() = creator_id);

-- Optional: Add a comment for documentation
COMMENT ON POLICY "Users can delete their own chats" ON public.chats IS 
'Allows authenticated users to delete only the chats they created';
