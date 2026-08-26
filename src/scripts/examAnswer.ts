// Week exam persistence: a large free-text response per learner per week,
// with an explicit draft/submitted lifecycle, stored in `exam_answers`
// (separate from the per-night `lesson_progress` checkpoints — see
// supabase/schema.sql).
//
// Signed-in learners persist to Supabase, gated by RLS to their own
// `user_id`. Everyone else falls back to this browser's local storage —
// UI copy must say so honestly.
import { getCurrentSession, getSupabaseClient } from "@/lib/supabase";

type ExamStatus = "draft" | "submitted";

function localKey(weekSlug: string): string {
  return `fba_lab_exam_${weekSlug}_v1`;
}

function loadLocalAnswer(weekSlug: string): { answer: string; status: ExamStatus; submittedAt?: string } | null {
  try {
    const raw = localStorage.getItem(localKey(weekSlug));
    return raw ? (JSON.parse(raw) as { answer: string; status: ExamStatus; submittedAt?: string }) : null;
  } catch {
    return null;
  }
}

function saveLocalAnswer(weekSlug: string, answer: string, status: ExamStatus, submittedAt?: string) {
  localStorage.setItem(localKey(weekSlug), JSON.stringify({ answer, status, submittedAt }));
}

export async function initExamBox(root: HTMLElement) {
  const weekSlug = root.dataset.weekSlug ?? "";
  const textarea = root.querySelector<HTMLTextAreaElement>("[data-exam-input]");
  const saveDraftBtn = root.querySelector<HTMLButtonElement>("[data-exam-save-draft]");
  const submitBtn = root.querySelector<HTMLButtonElement>("[data-exam-submit]");
  const status = root.querySelector<HTMLElement>("[data-exam-status]");
  const meta = root.querySelector<HTMLElement>("[data-exam-meta]");
  if (!weekSlug || !textarea || !saveDraftBtn || !submitBtn) return;

  const supabase = getSupabaseClient();
  const session = supabase ? await getCurrentSession() : null;
  const userId = session?.user?.id ?? null;
  const live = Boolean(supabase && userId);

  function setStatus(text: string, isError = false) {
    if (!status) return;
    status.textContent = text;
    status.style.color = isError ? "var(--status-reject)" : "var(--status-go)";
  }

  function setMeta(text: string) {
    if (meta) meta.textContent = text;
  }

  if (live && supabase && userId) {
    const { data } = await supabase
      .from("exam_answers")
      .select("answer, status, submitted_at")
      .eq("user_id", userId)
      .eq("week_slug", weekSlug)
      .maybeSingle();
    if (data?.answer) {
      textarea.value = data.answer;
      setMeta(
        data.status === "submitted"
          ? `Submitted to your account${data.submitted_at ? ` on ${new Date(data.submitted_at).toLocaleString()}` : ""}.`
          : "Draft saved to your account."
      );
    }
  } else {
    const saved = loadLocalAnswer(weekSlug);
    if (saved?.answer) {
      textarea.value = saved.answer;
      setMeta(
        saved.status === "submitted"
          ? "Submitted — saved locally only (sign in to save to your account)."
          : "Draft saved locally only (sign in to save to your account)."
      );
    }
  }

  async function persist(nextStatus: ExamStatus) {
    const answer = textarea!.value;
    if (!answer.trim()) {
      setStatus("Write an answer before saving.", true);
      return;
    }
    const submittedAt = nextStatus === "submitted" ? new Date().toISOString() : undefined;
    if (live && supabase && userId) {
      const { error } = await supabase.from("exam_answers").upsert(
        {
          user_id: userId,
          week_slug: weekSlug,
          answer,
          status: nextStatus,
          submitted_at: submittedAt ?? null,
        },
        { onConflict: "user_id,week_slug" }
      );
      if (error) {
        setStatus("Could not save to your account — try again.", true);
        return;
      }
      setStatus(nextStatus === "submitted" ? "Submitted and saved to your account." : "Draft saved to your account.");
      setMeta(
        nextStatus === "submitted"
          ? `Submitted to your account on ${new Date(submittedAt!).toLocaleString()}.`
          : "Draft saved to your account."
      );
    } else {
      saveLocalAnswer(weekSlug, answer, nextStatus, submittedAt);
      setStatus(
        nextStatus === "submitted"
          ? "Submitted — saved locally. Sign in to save to your account."
          : "Draft saved locally. Sign in to save to your account."
      );
      setMeta(
        nextStatus === "submitted"
          ? "Submitted — saved locally only (sign in to save to your account)."
          : "Draft saved locally only (sign in to save to your account)."
      );
    }
  }

  saveDraftBtn.addEventListener("click", () => persist("draft"));
  submitBtn.addEventListener("click", () => persist("submitted"));
}
