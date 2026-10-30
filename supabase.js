
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zfqyvwlxfbjdrvwverah.supabase.co/rest/v1/";
const SUPABASE_ANON_KEY = "sb_publishable_qi17_W5GCysrfCl4Jc4nPQ_X18gfCO1";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
