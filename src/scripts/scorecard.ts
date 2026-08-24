// 100-point Candidate Scorecard — client-side calculator.
// Demo-mode: saved scorecards live in localStorage. When Supabase is
// connected, this is the natural place to upsert into the
// `research_candidates` table instead (see src/lib/supabase.ts).
import { scorecardFactors, hardStopGates, bandForScore, recommendationFor } from "@/data/scorecard";

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

function loadSaved(): SavedScorecard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedScorecard[]) : [];
  } catch {
    return [];
  }
}

function persistSaved(list: SavedScorecard[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
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

  function renderSaved() {
    if (!savedList) return;
    const list = loadSaved();
    savedList.innerHTML = "";
    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "saved-empty";
      empty.textContent = "No saved candidates yet.";
      savedList.appendChild(empty);
      return;
    }
    for (const item of list.slice().reverse()) {
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
      deleteBtn.addEventListener("click", () => {
        persistSaved(loadSaved().filter((s) => s.id !== item.id));
        renderSaved();
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

  saveBtn?.addEventListener("click", () => {
    const total = totalScore();
    const hardStops = currentHardStops();
    const record: SavedScorecard = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      candidateName: nameInput?.value.trim() || "Untitled candidate",
      scores: { ...scores },
      hardStops,
      totalScore: total,
      recommendation: recommendationFor(total, hardStops.length > 0),
      savedAt: new Date().toISOString(),
    };
    const list = loadSaved();
    list.push(record);
    persistSaved(list);
    renderSaved();
    if (saveStatus) {
      saveStatus.textContent = "Saved locally (demo mode).";
      setTimeout(() => {
        if (saveStatus) saveStatus.textContent = "";
      }, 3000);
    }
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

  recalc();
  renderSaved();
}
