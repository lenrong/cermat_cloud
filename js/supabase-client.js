// js/supabase-client.js
const SUPABASE_URL = 'https://dacurshwofmzaogeutnm.supabase.co'; // 🔁 GANTI dengan Project URL Anda
const SUPABASE_ANON_KEY = 'sb_publishable_yQnHA8sybmzfMNwsJrpZ6g_I11EObKR'; // 🔁 GANTI dengan Publishable Key Anda

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
