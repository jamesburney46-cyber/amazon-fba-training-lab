// Checkpoint persistence: saving a checkpoint answer both records the
// answer and marks that lesson/night complete in `lesson_progress`.
//
// Signed-in learners (Supabase configured + a live session) persist to the
// `lesson_progress` table, gated by RLS to their own `user_id`. Everyone
// else (Supabase not configured, or configured but signed out) falls back
// to this browser's local storage — the UI copy must say so honestly, it
// must never claim "Saved to your account" for a fallback save.
import { getCurrentSession, getSupabaseClient } from "@/lib/supabase";

type LessonStatus = "not_started" | "in_progress" | "complete";

function localKey(weekSlug: string, lessonSlug: string): string {
  return `fba_lab_checkpoint_${weekSlug}_${lessonSlug}_v1`;
}

function loadLocalAnswer(weekSlug: string, lessonSlug: string): { answer: string; status: LessonStatus } | null {
  try {
    const raw = localStorage.getItem(localKey(weekSlug, lessonSlug));
    return raw ? (JSON.parse(raw) as { answer: string; status: LessonStatus }) : null;
  } catch {
    return null;
  }
}

function saveLocalAnswer(weekSlug: string, lessonSlug: string, answer: string, status: LessonStatus) {
  localStorage.setItem(localKey(weekSlug, lessonSlug), JSON.stringify({ answer, status }));
}

/**
 * Wires up every `[data-checkpoint]` box on the page. A curriculum page can
 * render several checkpoints (one per lesson night), so this runs once per
 * page load and scans for all of them rather than being called per instance
 * — Astro dedupes identical inline component scripts to a single page-level
 * script, so a single global scan is the correct pattern here (matches the
 * pre-existing approach in this file's predecessor).
 */
export async function initCheckpoints() {
  const boxes = Array.from(document.querySelectorAll<HTMLElement>("[data-checkpoint]"));
  if (boxes.length === 0) return;

  const supabase = getSupabaseClient();
  const session = supabase ? await getCurrentSession() : null;
  const userId = session?.user?.id ?? null;
  const live = Boolean(supabase && userId);

  let remoteRows: Map<string, { checkpoint_answer: string | null; status: LessonStatus }> | null = null;
  if (live && supabase && userId) {
    const { data } = await supabase
      .from("lesson_progress")
      .select("week_slug, lesson_slug, checkpoint_answer, status")
      .eq("user_id", userId);
    remoteRows = new Map();
    for (const row of data ?? []) {
      remoteRows.set(`${row.week_slug}::${row.lesson_slug}`, {
        checkpoint_answer: row.checkpoint_answer,
        status: row.status as LessonStatus,
      });
    }
  }

  for (const box of boxes) {
    const weekSlug = box.dataset.weekSlug ?? "";
    const lessonSlug = box.dataset.lessonSlug ?? "";
    const textarea = box.querySelector<HTMLTextAreaElement>("textarea");
    const status = box.querySelector<HTMLElement>("[data-checkpoint-status]");
    const saveBtn = box.querySelector<HTMLButtonElement>("[data-checkpoint-save]");
    if (!textarea || !saveBtn || !weekSlug || !lessonSlug) continue;

    function setStatus(text: string, isError = false) {
      if (!status) return;
      status.textContent = text;
      status.style.color = isError ? "var(--status-investigate)" : "var(--status-go)";
    }

    if (live && remoteRows) {
      const row = remoteRows.get(`${weekSlug}::${lessonSlug}`);
      if (row?.checkpoint_answer) {
        textarea.value = row.checkpoint_answer;
        if (row.status === "complete") setStatus("Saved to your account — night marked complete.");
      }
    } else {
      const saved = loadLocalAnswer(weekSlug, lessonSlug);
      if (saved?.answer) {
        textarea.value = saved.answer;
        if (saved.status === "complete") setStatus("Saved locally — sign in to save to your account.");
      }
    }

    saveBtn.addEventListener("click", async () => {
      if (!textarea.value.trim()) {
        setStatus("Write an answer before saving.", true);
        return;
      }
      if (live && supabase && userId) {
        const { error } = await supabase.from("lesson_progress").upsert(
          {
            user_id: userId,
            week_slug: weekSlug,
            lesson_slug: lessonSlug,
            checkpoint_answer: textarea.value,
            status: "complete",
          },
          { onConflict: "user_id,week_slug,lesson_slug" }
        );
        if (error) {
          setStatus("Could not save to your account — try again.", true);
          return;
        }
        setStatus("Saved to your account — night marked complete.");
      } else {
        saveLocalAnswer(weekSlug, lessonSlug, textarea.value, "complete");
        setStatus("Saved locally — sign in to save to your account.");
      }
    });
  }
}
