import type { Database } from "./supabase";

export type User = Database["public"]["Tables"]["profiles"]["Row"];

export type Chat = Database["public"]["Tables"]["chats"]["Row"];
