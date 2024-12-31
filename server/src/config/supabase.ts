import { createClient } from '@supabase/supabase-js';
import { config } from './environment';

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);