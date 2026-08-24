// Supabase integration shell.
//
// PHASE 1 SCOPE: this is a wiring shell, not a completed auth system.
// - No secrets live in this repo. `.env` is git-ignored; `.env.example`
//   documents the two PUBLIC_* values a real deployment needs.
// - When those values are absent (the default for anyone who clones this
//   repo without configuring Supabase), the app runs in DEMO MODE: forms
//   render and validate fully, but no real account/session is created and
//   the UI says so explicitly. This file must never silently pretend a
//   demo session is a real authenticated session.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient | null = null;

/**
 * Returns a Supabase client if PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY
 * are configured, otherwise null. Callers must check `isSupabaseConfigured`
 * (or a falsy return here) and fall back to demo-mode UI — never assume a
 * client exists.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return client;
}

export type DemoAuthResult = {
  ok: boolean;
  mode: "demo" | "live";
  message: string;
};

/**
 * Shared entry point used by the sign-in/sign-up/reset forms. In demo mode
 * it never contacts a network and never fabricates a logged-in session —
 * it returns a clearly labelled demo result so the UI can explain what
 * happened. In live mode it delegates to the real Supabase client.
 */
export async function demoAwareSignIn(
  email: string,
  password: string
): Promise<DemoAuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      mode: "demo",
      message:
        "Demo mode: no Supabase project is configured, so no real sign-in occurred. Connect Supabase (see README/SETUP) to enable live accounts.",
    };
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, mode: "live", message: error.message };
  }
  return { ok: true, mode: "live", message: "Signed in." };
}
