-- Enable replication for Supabase Realtime on the messages table
alter publication supabase_realtime add table public.messages;
