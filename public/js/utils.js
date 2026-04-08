// js/utils.js
export function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

export function formatDuration(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

export function setYearFooter() {
  const el = document.getElementById("sr-year");
  if (el) el.textContent = String(new Date().getFullYear());
}
