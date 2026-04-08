// js/results-page.js
import { loadSessions, clearSessions } from "./storage.js";
import { formatDateTime, formatDuration, setYearFooter } from "./utils.js";
import { LEVEL_LABELS } from "./passages.js";

document.addEventListener("DOMContentLoaded", () => {
  setYearFooter();
  renderSessions();

  const btnClear = document.getElementById("sr-clear-sessions");
  if (btnClear) {
    btnClear.addEventListener("click", () => {
      if (!confirm("Clear all saved sessions?")) return;
      clearSessions();
      renderSessions();
    });
  }
});

function renderSessions() {
  const listEl = document.getElementById("sr-results-list");
  const emptyEl = document.getElementById("sr-results-empty");
  if (!listEl || !emptyEl) return;

  listEl.innerHTML = "";
  const sessions = loadSessions();

  if (!sessions.length) {
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "none";

  sessions.forEach((s) => {
    const item = document.createElement("div");
    item.className = "sr-result-item";

    const meta = document.createElement("div");
    meta.className = "sr-result-meta";

    const title = document.createElement("h3");
    title.textContent = s.passageTitle || "Reading Session";

    const p = document.createElement("p");
    const levelLabel = s.levelLabel || LEVEL_LABELS[s.level] || s.level;
    p.textContent = `${levelLabel} • ${formatDuration(
      s.durationSeconds || 0
    )} • ${formatDateTime(s.createdAt)}`;

    const tags = document.createElement("div");
    tags.className = "sr-result-tags";

    const tagLevel = document.createElement("span");
    tagLevel.className = "sr-tag sr-tag-level";
    tagLevel.textContent = levelLabel;
    tags.appendChild(tagLevel);

    const tagMode = document.createElement("span");
    tagMode.className = "sr-tag";
    tagMode.textContent =
      s.mode === "video" ? "Video + Audio" : "Audio Only";
    tags.appendChild(tagMode);

    meta.appendChild(title);
    meta.appendChild(p);
    meta.appendChild(tags);

    const media = document.createElement("div");
    media.className = "sr-result-media";

    if (s.mediaType && s.mediaType.startsWith("video")) {
      const video = document.createElement("video");
      video.controls = true;
      video.src = s.mediaUrl;
      media.appendChild(video);
    } else {
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = s.mediaUrl;
      media.appendChild(audio);
    }

    item.appendChild(meta);
    item.appendChild(media);
    listEl.appendChild(item);
  });
}
