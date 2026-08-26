// Interactive Product Research Machine board.
//
// Signed-in learners (Supabase configured + a live session) read/write
// candidates to the `research_candidates` table, gated by RLS to their own
// `user_id` — including the current funnel stage and the terminal
// `rejected` state (see supabase/schema.sql). Everyone else (Supabase not
// configured, or configured but signed out) falls back to this browser's
// local storage — the UI copy must say so honestly.
import { getCurrentSession, getSupabaseClient } from "@/lib/supabase";

type Stage = "raw" | "fast-rejection" | "evidence" | "commercial-model" | "investment-case";
type Recommendation = "GO" | "INVESTIGATE" | "REJECT";

type Candidate = {
  id: string;
  name: string;
  stage: Stage;
  recommendation?: Recommendation;
};

const STAGE_ORDER: Stage[] = ["raw", "fast-rejection", "evidence", "commercial-model", "investment-case"];
const STAGE_CAPS: Record<Stage, number> = {
  raw: 30,
  "fast-rejection": 10,
  evidence: 5,
  "commercial-model": 3,
  "investment-case": 3,
};
const STORAGE_KEY = "fba_lab_research_board_v1";

// Illustrative, fictional example rendered as a static "sample" panel on the
// page (see src/pages/research-machine/index.astro) — its economics/notes
// live only in that markup. Copying it here only ever adds a plain Stage A
// idea by name, through the same addCandidate() path a manually typed idea
// uses, so it is never written to Supabase (or local storage) unless the
// learner explicitly clicks "Copy idea to Stage A".
const SAMPLE_CANDIDATE_NAME = "EcoFlex Bamboo Travel Cutlery Set";

function nextStage(stage: Stage): Stage | null {
  const idx = STAGE_ORDER.indexOf(stage);
  if (idx === -1 || idx === STAGE_ORDER.length - 1) return null;
  return STAGE_ORDER[idx + 1];
}

function localId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadLocal(): { candidates: Candidate[]; rejected: Candidate[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { candidates: [], rejected: [] };
    const parsed = JSON.parse(raw);
    return {
      candidates: Array.isArray(parsed.candidates) ? parsed.candidates : [],
      rejected: Array.isArray(parsed.rejected) ? parsed.rejected : [],
    };
  } catch {
    return { candidates: [], rejected: [] };
  }
}

function saveLocal(state: { candidates: Candidate[]; rejected: Candidate[] }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

type CandidateRow = {
  id: string;
  candidate_name: string;
  stage: Stage | "rejected";
  recommendation: Recommendation | null;
};

function rowToCandidate(row: CandidateRow): Candidate {
  return {
    id: row.id,
    name: row.candidate_name,
    stage: (row.stage === "rejected" ? "raw" : row.stage) as Stage,
    recommendation: row.recommendation ?? undefined,
  };
}

export function initResearchMachine(root: HTMLElement) {
  const addForm = root.querySelector<HTMLFormElement>("[data-add-form]");
  const addInput = root.querySelector<HTMLInputElement>("[data-add-input]");
  const addError = root.querySelector<HTMLElement>("[data-add-error]");
  const rejectedCount = root.querySelector<HTMLElement>("[data-rejected-count]");
  const resetBtn = root.querySelector<HTMLButtonElement>("[data-reset-board]");
  const boardStatus = root.querySelector<HTMLElement>("[data-board-status]");

  const demoBanner = document.getElementById("demo-banner");
  const signedOutBanner = document.getElementById("signed-out-banner");
  const signedInBanner = document.getElementById("signed-in-banner");
  const copySampleBtn = document.querySelector<HTMLButtonElement>("[data-copy-sample]");
  const copySampleStatus = document.querySelector<HTMLElement>("[data-copy-sample-status]");

  const state: { candidates: Candidate[]; rejected: Candidate[] } = { candidates: [], rejected: [] };
  const supabase = getSupabaseClient();
  let userId: string | null = null;
  let live = false;

  function setBoardStatus(text: string, isError = false) {
    if (!boardStatus) return;
    boardStatus.textContent = text;
    boardStatus.style.color = isError ? "var(--status-reject)" : "var(--status-go)";
  }

  function savedMessage() {
    return live ? "Saved to your account." : "Saved locally — sign in to save to your account.";
  }

  function countInStage(stage: Stage) {
    return state.candidates.filter((c) => c.stage === stage).length;
  }

  function render() {
    for (const stage of STAGE_ORDER) {
      const list = root.querySelector<HTMLElement>(`[data-stage-list="${stage}"]`);
      const countEl = root.querySelector<HTMLElement>(`[data-stage-count="${stage}"]`);
      if (countEl) countEl.textContent = `${countInStage(stage)} / ${STAGE_CAPS[stage]}`;
      if (!list) continue;
      list.innerHTML = "";
      const items = state.candidates.filter((c) => c.stage === stage);
      if (items.length === 0) {
        const empty = document.createElement("li");
        empty.className = "board-empty";
        empty.textContent = "No candidates yet.";
        list.appendChild(empty);
        continue;
      }
      for (const candidate of items) {
        list.appendChild(renderCard(candidate, stage));
      }
    }
    if (rejectedCount) rejectedCount.textContent = String(state.rejected.length);
    if (!live) saveLocal(state);
  }

  function renderCard(candidate: Candidate, stage: Stage): HTMLElement {
    const li = document.createElement("li");
    li.className = "board-card";
    li.dataset.candidateId = candidate.id;

    const name = document.createElement("p");
    name.className = "board-card__name";
    name.textContent = candidate.name;
    li.appendChild(name);

    const actions = document.createElement("div");
    actions.className = "board-card__actions";

    const upcoming = nextStage(stage);
    if (upcoming) {
      const advanceBtn = document.createElement("button");
      advanceBtn.type = "button";
      advanceBtn.className = "board-card__btn board-card__btn--advance";
      const full = countInStage(upcoming) >= STAGE_CAPS[upcoming];
      advanceBtn.textContent = full ? `${STAGE_CAPS[upcoming]} already there` : "Advance →";
      advanceBtn.disabled = full;
      advanceBtn.addEventListener("click", () => advanceCandidate(candidate, upcoming));
      actions.appendChild(advanceBtn);
    }

    if (stage !== "investment-case") {
      const rejectBtn = document.createElement("button");
      rejectBtn.type = "button";
      rejectBtn.className = "board-card__btn board-card__btn--reject";
      rejectBtn.textContent = "Reject";
      rejectBtn.addEventListener("click", () => rejectCandidate(candidate));
      actions.appendChild(rejectBtn);
    }

    li.appendChild(actions);

    if (stage === "investment-case") {
      const recWrap = document.createElement("div");
      recWrap.className = "board-card__rec";
      const label = document.createElement("label");
      label.textContent = "Recommendation";
      label.setAttribute("for", `rec-${candidate.id}`);
      const select = document.createElement("select");
      select.id = `rec-${candidate.id}`;
      ["", "GO", "INVESTIGATE", "REJECT"].forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt === "" ? "Select…" : opt;
        select.appendChild(o);
      });
      select.value = candidate.recommendation ?? "";
      select.addEventListener("change", () => {
        setRecommendation(candidate, (select.value || undefined) as Recommendation | undefined);
      });
      recWrap.appendChild(label);
      recWrap.appendChild(select);
      li.appendChild(recWrap);

      const scoreLink = document.createElement("a");
      scoreLink.className = "board-card__score-link";
      scoreLink.href = "../scorecard/";
      scoreLink.textContent = "Build full scorecard →";
      li.appendChild(scoreLink);
    }

    return li;
  }

  function focusCandidate(candidateId: string, stage: Stage) {
    requestAnimationFrame(() => {
      const list = root.querySelector<HTMLElement>(`[data-stage-list="${stage}"]`);
      const card = list?.querySelector<HTMLElement>(`[data-candidate-id="${candidateId}"]`);
      const board = root.closest<HTMLElement>("#research-board") ?? root;

      board.scrollIntoView({ behavior: "smooth", block: "start" });

      if (card) {
        card.classList.add("board-card--highlight");
        card.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        window.setTimeout(() => card.classList.remove("board-card--highlight"), 1800);
      }
    });
  }

  async function addCandidate(name: string): Promise<Candidate | null> {
    if (live && supabase && userId) {
      const { data, error } = await supabase
        .from("research_candidates")
        .insert({ user_id: userId, candidate_name: name, stage: "raw" })
        .select("id, candidate_name, stage, recommendation")
        .single();
      if (error || !data) {
        const detail = error
          ? [error.message, error.details, error.hint].filter(Boolean).join(" — ")
          : "No row was returned by Supabase.";
        setBoardStatus(`Could not save to your account: ${detail}`, true);
        return null;
      }
      state.candidates.push(rowToCandidate(data as CandidateRow));
    } else {
      state.candidates.push({ id: localId(), name, stage: "raw" });
    }
    setBoardStatus(savedMessage());
    render();
    const added = state.candidates[state.candidates.length - 1];
    focusCandidate(added.id, "raw");
    return added;
  }

  async function advanceCandidate(candidate: Candidate, upcoming: Stage) {
    candidate.stage = upcoming;
    if (live && supabase && userId) {
      const { error } = await supabase
        .from("research_candidates")
        .update({ stage: upcoming })
        .eq("id", candidate.id)
        .eq("user_id", userId);
      if (error) {
        setBoardStatus("Could not update your account — try again.", true);
        return;
      }
    }
    setBoardStatus(savedMessage());
    render();
    focusCandidate(candidate.id, upcoming);
  }

  async function rejectCandidate(candidate: Candidate) {
    if (live && supabase && userId) {
      const { error } = await supabase
        .from("research_candidates")
        .update({ stage: "rejected" })
        .eq("id", candidate.id)
        .eq("user_id", userId);
      if (error) {
        setBoardStatus("Could not update your account — try again.", true);
        return;
      }
    }
    state.candidates = state.candidates.filter((c) => c.id !== candidate.id);
    state.rejected.push({ ...candidate });
    setBoardStatus(savedMessage());
    render();
  }

  async function setRecommendation(candidate: Candidate, recommendation: Recommendation | undefined) {
    candidate.recommendation = recommendation;
    if (live && supabase && userId) {
      const { error } = await supabase
        .from("research_candidates")
        .update({ recommendation: recommendation ?? null })
        .eq("id", candidate.id)
        .eq("user_id", userId);
      if (error) {
        setBoardStatus("Could not update your account — try again.", true);
        return;
      }
    }
    setBoardStatus(savedMessage());
    render();
  }

  async function clearBoard() {
    if (live && supabase && userId) {
      const { error } = await supabase.from("research_candidates").delete().eq("user_id", userId);
      if (error) {
        setBoardStatus("Could not clear your account board — try again.", true);
        return;
      }
    }
    state.candidates = [];
    state.rejected = [];
    if (!live) localStorage.removeItem(STORAGE_KEY);
    setBoardStatus(savedMessage());
    render();
  }

  addForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (addError) addError.textContent = "";
    const name = addInput?.value.trim();
    if (!name) return;
    if (countInStage("raw") >= STAGE_CAPS.raw) {
      if (addError) addError.textContent = "Stage A is full at 30 raw ideas — reject or advance some before adding more.";
      return;
    }
    if (addInput) addInput.value = "";
    void addCandidate(name);
  });

  resetBtn?.addEventListener("click", () => {
    if (!confirm("Clear the whole board? This cannot be undone.")) return;
    void clearBoard();
  });

  copySampleBtn?.addEventListener("click", async () => {
    if (!copySampleStatus) return;
    if (countInStage("raw") >= STAGE_CAPS.raw) {
      copySampleStatus.textContent =
        "Stage A is full at 30 raw ideas — reject or advance some before copying the sample.";
      copySampleStatus.style.color = "var(--status-reject)";
      return;
    }
    const added = await addCandidate(SAMPLE_CANDIDATE_NAME);
    if (!added) {
      copySampleStatus.textContent =
        "Copy failed — see the board error message below for the database response.";
      copySampleStatus.style.color = "var(--status-reject)";
      return;
    }

    copySampleStatus.textContent = live
      ? "Copied to Stage A on your account board below."
      : "Copied to Stage A on this browser's board below (local storage).";
    copySampleStatus.style.color = "var(--status-go)";
  });

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

    if (live && supabase && userId) {
      const { data, error } = await supabase
        .from("research_candidates")
        .select("id, candidate_name, stage, recommendation")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (error) {
        setBoardStatus("Could not load your saved candidates — try refreshing.", true);
      } else {
        const rows = (data ?? []) as CandidateRow[];
        state.candidates = rows.filter((r) => r.stage !== "rejected").map(rowToCandidate);
        state.rejected = rows.filter((r) => r.stage === "rejected").map(rowToCandidate);
      }
    } else {
      const loaded = loadLocal();
      state.candidates = loaded.candidates;
      state.rejected = loaded.rejected;
    }

    render();
  }

  void init();
}
