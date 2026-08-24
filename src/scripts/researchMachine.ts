// Interactive Product Research Machine board.
// Client-side only (demo-mode by default): state lives in localStorage.
// When a Supabase project is connected, this is the natural place to sync
// to the `research_candidates` table instead — see src/lib/supabase.ts.

type Stage = "raw" | "fast-rejection" | "evidence" | "commercial-model" | "investment-case";

type Candidate = {
  id: string;
  name: string;
  stage: Stage;
  recommendation?: "GO" | "INVESTIGATE" | "REJECT";
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

function loadState(): { candidates: Candidate[]; rejected: Candidate[] } {
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

function saveState(state: { candidates: Candidate[]; rejected: Candidate[] }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function nextStage(stage: Stage): Stage | null {
  const idx = STAGE_ORDER.indexOf(stage);
  if (idx === -1 || idx === STAGE_ORDER.length - 1) return null;
  return STAGE_ORDER[idx + 1];
}

export function initResearchMachine(root: HTMLElement) {
  const state = loadState();

  const addForm = root.querySelector<HTMLFormElement>("[data-add-form]");
  const addInput = root.querySelector<HTMLInputElement>("[data-add-input]");
  const addError = root.querySelector<HTMLElement>("[data-add-error]");
  const rejectedCount = root.querySelector<HTMLElement>("[data-rejected-count]");
  const resetBtn = root.querySelector<HTMLButtonElement>("[data-reset-board]");

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
    saveState(state);
  }

  function renderCard(candidate: Candidate, stage: Stage): HTMLElement {
    const li = document.createElement("li");
    li.className = "board-card";

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
      advanceBtn.addEventListener("click", () => {
        candidate.stage = upcoming;
        render();
      });
      actions.appendChild(advanceBtn);
    }

    if (stage !== "investment-case") {
      const rejectBtn = document.createElement("button");
      rejectBtn.type = "button";
      rejectBtn.className = "board-card__btn board-card__btn--reject";
      rejectBtn.textContent = "Reject";
      rejectBtn.addEventListener("click", () => {
        state.candidates = state.candidates.filter((c) => c.id !== candidate.id);
        state.rejected.push({ ...candidate });
        render();
      });
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
        candidate.recommendation = (select.value || undefined) as Candidate["recommendation"];
        render();
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

  addForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (addError) addError.textContent = "";
    const name = addInput?.value.trim();
    if (!name) return;
    if (countInStage("raw") >= STAGE_CAPS.raw) {
      if (addError) addError.textContent = "Stage A is full at 30 raw ideas — reject or advance some before adding more.";
      return;
    }
    state.candidates.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      stage: "raw",
    });
    if (addInput) addInput.value = "";
    render();
  });

  resetBtn?.addEventListener("click", () => {
    if (!confirm("Clear the whole board? This cannot be undone.")) return;
    state.candidates = [];
    state.rejected = [];
    render();
  });

  render();
}
