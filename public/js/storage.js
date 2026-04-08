// js/storage.js
const STORAGE_KEY = "speak_read_sessions_v1";

export function loadSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function addSession(session) {
  const sessions = loadSessions();
  sessions.unshift(session);
  saveSessions(sessions);
  return session;
}

export function clearSessions() {
  localStorage.removeItem(STORAGE_KEY);
}
