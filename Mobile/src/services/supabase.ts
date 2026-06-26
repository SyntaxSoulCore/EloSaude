import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://example.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? supabaseUrl,
  timeout: 10000,
});
