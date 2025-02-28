import { env } from "@/lib/env";
import { createClient } from "@supabase/supabase-js";

// Server側
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
