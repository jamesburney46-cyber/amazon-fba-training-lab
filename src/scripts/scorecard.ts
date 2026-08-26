// 100-point Candidate Scorecard — client-side calculator.
//
// Signed-in learners (Supabase configured + a live session) save the score
// payload, hard stops, total score and recommendation to the same
// `research_candidates` table the Product Research Machine uses — a saved
// scorecard defaults to the `investment-case` funnel stage, since the
// 100-point scorecard is the Stage D/E full-economics tool (see
// src/data/researchMachine.ts). Everyone else falls back to this browser's
// local storage — the UI copy must say so honestly.
import { scorecardFactors, bandForScore, recommendationFor } from "@/data/scorecard";
import { getCurrentSession, getSupabaseClient } from "@/lib/supabase";

const STORAGE_KEY = "fba_lab_scorecards_v1";

type SavedScorecard = {
  id: string;
  candidateName: string;
  scores: Record<string, number>;
  hardStops: string[];
  totalScore: number;
  recommendation: "GO" | "INVESTIGATE" | "REJECT";
  savedAt: string;
};

function localId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadLocal(): SavedScorecard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedScorecard[]) : [];
  } catch {
    return [];
  }
}

function persistLocal(list: SavedScorecard[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

type ScorecardRow = {
  id: string;
  candidate_name: string;
  scorecard: { scores?: Record<string, number>; hardStops?: string[] } | null;
  total_score: number | null;
  recommendation: "GO" | "INVESTIGATE" | "REJECT" | null;
  updated_at: string;
};

function rowToSaved(row: ScorecardRow): SavedScorecard {
  return {
    id: row.id,
    candidateName: row.candidate_name,
    scores: row.scorecard?.scores ?? {},
    hardStops: row.scorecard?.hardStops ?? [],
    totalScore: row.total_score ?? 0,
    recommendation: row.recommendation ?? "REJECT",
    savedAt: row.updated_at,
  };
}

export function initScorecard(root: HTMLElement) {
  const nameInput = root.querySelector<HTMLInputElement>("[data-candidate-name]");
  const totalEl = root.querySelector<HTMLElement>("[data-total-score]");
  const recBanner = root.querySelector<HTMLElement>("[data-recommendation]");
  const recLabel = root.querySelector<HTMLElement>("[data-recommendation-label]");
  const recReason = root.querySelector<HTMLElement>("[data-recommendation-reason]");
  const saveBtn = root.querySelector<HTMLButtonElement>("[data-save]");
  const printBtn = root.querySelector<HTMLButtonElement>("[data-print]");
  const exportBtn = root.querySelector<HTMLButtonElement>("[data-export]");
  const resetBtn = root.querySelector<HTMLButtonElement>("[data-reset]");
  const savedList = root.querySelector<HTMLElement>("[data-saved-list]");
  const saveStatus = root.querySelector<HTMLElement>("[data-save-status]");

  const demoBanner = document.getElementById("demo-banner");
  const signedOutBanner = document.getElementById("signed-out-banner");
  const signedInBanner = document.getElementById("signed-in-banner");

  const supabase = getSupabaseClient();
  let userId: string | null = null;
  let live = false;

  const scores: Record<string, number> = {};
  for (const f of scorecardFactors) scores[f.key] = 0;

  function currentHardStops(): string[] {
    return Array.from(root.querySelectorAll<HTMLInputElement>("[data-hard-stop]:checked")).map(
      (el) => el.value
    );
  }

  function totalScore(): number {
    return Object.values(scores).reduce((sum, v) => sum + v, 0);
  }

  function recalc() {
    const total = totalScore();
    const hardStops = currentHardStops();
    const triggered = hardStops.length > 0;
    const recommendation = recommendationFor(total, triggered);
    const band = bandForScore(total);

    if (totalEl) totalEl.textContent = String(total);
    if (recBanner) {
      recBanner.className = `recommendation recommendation--${
        recommendation === "GO" ? "go" : recommendation === "INVESTIGATE" ? "investigate" : "reject"
      }`;
    }
    if (recLabel) recLabel.textContent = recommendation;
    if (recReason) {
      recReason.textContent = triggered
        ? "A hard-stop gate is triggered — this overrides the score. See checked gates below."
        : band.label;
    }
  }

  scorecardFactors.forEach((factor) => {
    const input = root.querySelector<HTMLInputElement>(`[data-factor="${factor.key}"]`);
    const valueLabel = root.querySelector<HTMLElement>(`[data-factor-value="${factor.key}"]`);
    input?.addEventListener("input", () => {
      const value = Math.max(0, Math.min(factor.weight, Number(input.value) || 0));
      scores[factor.key] = value;
      if (valueLabel) valueLabel.textContent = `${value} / ${factor.weight}`;
      recalc();
    });
  });

  root.querySelectorAll<HTMLInputElement>("[data-hard-stop]").forEach((el) => {
    el.addEventListener("change", recalc);
  });

  async function fetchSaved(): Promise<SavedScorecard[]> {
    if (live && supabase && userId) {
      const { data, error } = await supabase
        .from("research_candidates")
        .select("id, candidate_name, scorecard, total_score, recommendation, updated_at")
        .eq("user_id", userId)
        .not("total_score", "is", null)
        .order("updated_at", { ascending: false });
      if (error) return [];
      return (data ?? []).map((row) => rowToSaved(row as ScorecardRow));
    }
    return loadLocal();
  }

  async function renderSaved() {
    if (!savedList) return;
    const list = await fetchSaved();
    savedList.innerHTML = "";
    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "saved-empty";
      empty.textContent = "No saved candidates yet.";
      savedList.appendChild(empty);
      return;
    }
    for (const item of list) {
      const row = document.createElement("div");
      row.className = "saved-row";

      const info = document.createElement("div");
      info.innerHTML = `<p class="saved-row__name">${escapeHtml(item.candidateName || "Untitled candidate")}</p>
        <p class="saved-row__meta">${item.totalScore}/100 · ${item.recommendation} · ${new Date(item.savedAt).toLocaleDateString()}</p>`;
      row.appendChild(info);

      const actions = document.createElement("div");
      actions.className = "saved-row__actions";

      const loadBtn = document.createElement("button");
      loadBtn.type = "button";
      loadBtn.textContent = "Revisit";
      loadBtn.addEventListener("click", () => applySaved(item));
      actions.appendChild(loadBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", async () => {
        if (live && supabase && userId) {
          await supabase.from("research_candidates").delete().eq("id", item.id).eq("user_id", userId);
        } else {
          persistLocal(loadLocal().filter((s) => s.id !== item.id));
        }
        await renderSaved();
      });
      actions.appendChild(deleteBtn);

      row.appendChild(actions);
      savedList.appendChild(row);
    }
  }

  function applySaved(item: SavedScorecard) {
    if (nameInput) nameInput.value = item.candidateName;
    scorecardFactors.forEach((factor) => {
      const value = item.scores[factor.key] ?? 0;
      scores[factor.key] = value;
      const input = root.querySelector<HTMLInputElement>(`[data-factor="${factor.key}"]`);
      const valueLabel = root.querySelector<HTMLElement>(`[data-factor-value="${factor.key}"]`);
      if (input) input.value = String(value);
      if (valueLabel) valueLabel.textContent = `${value} / ${factor.weight}`;
    });
    root.querySelectorAll<HTMLInputElement>("[data-hard-stop]").forEach((el) => {
      el.checked = item.hardStops.includes(el.value);
    });
    recalc();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setSaveStatus(text: string, isError = false) {
    if (!saveStatus) return;
    saveStatus.textContent = text;
    saveStatus.style.color = isError ? "var(--status-reject)" : "var(--status-go)";
    setTimeout(() => {
      if (saveStatus) saveStatus.textContent = "";
    }, 4000);
  }

  saveBtn?.addEventListener("click", async () => {
    const total = totalScore();
    const hardStops = currentHardStops();
    const candidateName = nameInput?.value.trim() || "Untitled candidate";
    const recommendation = recommendationFor(total, hardStops.length > 0);

    if (live && supabase && userId) {
      const { error } = await supabase.from("research_candidates").insert({
        user_id: userId,
        candidate_name: candidateName,
        stage: "investment-case",
        scorecard: { scores: { ...scores }, hardStops },
        total_score: total,
        hard_stop_triggered: hardStops.length > 0,
        recommendation,
      });
      if (error) {
        setSaveStatus("Could not save to your account — try again.", true);
        return;
      }
      setSaveStatus("Saved to your account.");
    } else {
      const list = loadLocal();
      list.push({
        id: localId(),
        candidateName,
        scores: { ...scores },
        hardStops,
        totalScore: total,
        recommendation,
        savedAt: new Date().toISOString(),
      });
      persistLocal(list);
      setSaveStatus("Saved locally — sign in to save to your account.");
    }
    await renderSaved();
  });

  printBtn?.addEventListener("click", () => window.print());

  exportBtn?.addEventListener("click", () => {
    const total = totalScore();
    const hardStops = currentHardStops();
    const record = {
      candidateName: nameInput?.value.trim() || "Untitled candidate",
      scores: { ...scores },
      hardStops,
      totalScore: total,
      recommendation: recommendationFor(total, hardStops.length > 0),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${record.candidateName.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "candidate"}-scorecard.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  });

  resetBtn?.addEventListener("click", () => {
    if (nameInput) nameInput.value = "";
    scorecardFactors.forEach((factor) => {
      scores[factor.key] = 0;
      const input = root.querySelector<HTMLInputElement>(`[data-factor="${factor.key}"]`);
      const valueLabel = root.querySelector<HTMLElement>(`[data-factor-value="${factor.key}"]`);
      if (input) input.value = "0";
      if (valueLabel) valueLabel.textContent = `0 / ${factor.weight}`;
    });
    root.querySelectorAll<HTMLInputElement>("[data-hard-stop]").forEach((el) => {
      el.checked = false;
    });
    recalc();
  });

  function escapeHtml(input: string): string {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  async function init() {
    const session = supabase ? await getCurrentSession() : null;
    userId = session?.user?.id ?? null;
    live = Boolean(supabase && userId);

    if (!supabase) {
      if (demoBanner) demoBanner.hidden = false;
    } else if (!userId) {
      if (signedOutBanner) signedOutBanner.hidden = false;
    } else {
      if (signedInBanner) signedInBanner.hidden = false;
    }

    recalc();
    await renderSaved();
  }

  void init();
}
