// Supabase auth integration.
//
// - No secrets live in this repo. `.env` is git-ignored; `.env.example`
//   documents the two PUBLIC_* values a real deployment needs. The GitHub
//   Pages build workflow injects them from repository/environment
//   variables/secrets at build time — see `.github/workflows/deploy.yml`.
// - When those values are absent (the default for anyone who clones this
//   repo without configuring Supabase), the app runs in DEMO MODE: forms
//   render and validate fully, but no real account/session is created and
//   the UI says so explicitly. This file must never silently pretend a
//   demo session is a real authenticated session.
import { createClient, type Session, type SupabaseClient, type User } from "@supabase/supabase-js";
import { url } from "@/lib/paths";

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
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}

/**
 * Absolute, base-path-aware URL for a page this deployment serves — for use
 * as a Supabase `emailRedirectTo` / `redirectTo` target. Browser-only (reads
 * `window.location.origin`); Supabase confirmation/recovery links are only
 * ever opened in a browser, so this is never called during SSR/build.
 */
export function authRedirectUrl(path: string): string {
  return `${window.location.origin}${url(path)}`;
}

export type AuthResult = {
  ok: boolean;
  mode: "demo" | "live";
  message: string;
  /** true when a live sign-up succeeded but requires email confirmation before a session exists. */
  needsConfirmation?: boolean;
};

const DEMO_MESSAGE =
  "Demo mode: no Supabase project is configured, so no real account/session was created. Connect Supabase (see SETUP.md) to enable this.";

/**
 * Real Supabase email/password sign-in. In demo mode it never contacts a
 * network and never fabricates a logged-in session — it returns a clearly
 * labelled demo result so the UI can explain what happened.
 */
export async function signInWithPassword(email: string, password: string): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, mode: "demo", message: DEMO_MESSAGE };
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, mode: "live", message: error.message };
  }
  return { ok: true, mode: "live", message: "Signed in." };
}

/**
 * Real Supabase sign-up. Captures the learner's name into Supabase user
 * metadata (`full_name`) so a profile can be created from it, and routes the
 * confirmation email at the base-path-aware `/auth/callback/` page rather
 * than Supabase's default redirect. Handles both outcomes Supabase can
 * return: a project with "Confirm email" on (no session yet, confirmation
 * required) and one with it off (session created immediately).
 */
export async function signUpWithPassword(
  name: string,
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, mode: "demo", message: DEMO_MESSAGE };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: authRedirectUrl("/auth/callback/"),
    },
  });
  if (error) {
    return { ok: false, mode: "live", message: error.message };
  }
  if (data.session) {
    return { ok: true, mode: "live", message: "Account created and signed in." };
  }
  return {
    ok: true,
    mode: "live",
    needsConfirmation: true,
    message: "Account created. Check your email to confirm, then sign in.",
  };
}

/** Resends the sign-up confirmation email — surfaced after a "not confirmed" sign-in error. */
export async function resendConfirmationEmail(email: string): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, mode: "demo", message: DEMO_MESSAGE };
  }
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: authRedirectUrl("/auth/callback/") },
  });
  if (error) {
    return { ok: false, mode: "live", message: error.message };
  }
  return { ok: true, mode: "live", message: "Confirmation email resent — check your inbox." };
}

/**
 * Sends a password-reset email that lands on the base-path-aware
 * `/auth/update-password/` page (rather than Supabase's default redirect),
 * where the learner sets a new password.
 */
export async function sendPasswordReset(email: string): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, mode: "demo", message: DEMO_MESSAGE };
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: authRedirectUrl("/auth/update-password/"),
  });
  if (error) {
    return { ok: false, mode: "live", message: error.message };
  }
  return {
    ok: true,
    mode: "live",
    message: "If that email has an account, a reset link is on its way.",
  };
}

/**
 * Completes a password reset from the recovery-session established by the
 * `/auth/update-password/` page after the learner follows their email link.
 */
export async function updatePassword(password: string): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, mode: "demo", message: DEMO_MESSAGE };
  }
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { ok: false, mode: "live", message: error.message };
  }
  return { ok: true, mode: "live", message: "Password updated. You're signed in." };
}

export async function signOut(): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Current session, or null in demo mode / when signed out. */
export async function getCurrentSession(): Promise<Session | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export type { Session, User };
