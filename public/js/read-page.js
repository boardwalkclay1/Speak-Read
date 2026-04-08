// js/read-page.js
import { LEVEL_LABELS, getPassageForLevel } from "./passages.js";
import { SpeakReadRecorder } from "./recorder.js";
import { addSession } from "./storage.js";
import { getQueryParam, formatDuration, nowIso, setYearFooter } from "./utils.js";

let recorder = null;
let timerInterval = null;
let elapsedSeconds = 0;

document.addEventListener("DOMContentLoaded", async () => {
  setYearFooter();

  const level = getQueryParam("level") || "1";
  const mode = getQueryParam("mode") || "video";

  const passage = getPassageForLevel(level);
  const levelLabel = LEVEL_LABELS[level] || `Level ${level}`;

  const titleEl = document.getElementById("sr-reading-title");
  const metaEl = document.getElementById("sr-reading-meta");
  const passageTitleEl = document.getElementById("sr-passage-title");
  const passageBodyEl = document.getElementById("sr-passage-body");
  const statusEl = document.getElementById("sr-recording-status");
  const timerEl = document.getElementById("sr-timer");
  const btnStart = document.getElementById("sr-btn-start");
  const btnStop = document.getElementById("sr-btn-stop");
  const videoEl = document.getElementById("sr-video-preview");
  const audioEl = document.getElementById("sr-audio-preview");

  titleEl.textContent = `Reading – ${levelLabel}`;
  metaEl.textContent = `Mode: ${mode === "video" ? "Video + Audio" : "Audio Only"}`;
  passageTitleEl.textContent = passage.title;
  passageBodyEl.textContent = passage.text;

  function setStatus(state) {
    if (!statusEl) return;
    if (state === "recording") {
      statusEl.textContent = "Recording";
      statusEl.classList.add("sr-badge-live");
    } else if (state === "ready") {
      statusEl.textContent = "Ready";
      statusEl.classList.remove("sr-badge-live");
    } else if (state === "stopped") {
      statusEl.textContent = "Stopped";
      statusEl.classList.remove("sr-badge-live");
    } else {
      statusEl.textContent = "Idle";
      statusEl.classList.remove("sr-badge-live");
    }
  }

  async function initRecorder() {
    try {
      recorder = new SpeakReadRecorder({
        mode,
        videoEl,
        audioEl,
        onStatusChange: setStatus,
      });
      await recorder.init();
    } catch (err) {
      alert("Unable to access camera/microphone. Check permissions.");
      console.error(err);
    }
  }

  function startTimer() {
    elapsedSeconds = 0;
    timerEl.textContent = "00:00";
    timerInterval = setInterval(() => {
      elapsedSeconds += 1;
      timerEl.textContent = formatDuration(elapsedSeconds);
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  btnStart.addEventListener("click", async () => {
    if (!recorder) {
      await initRecorder();
    }
    if (!recorder) return;

    recorder.start();
    startTimer();
    btnStart.disabled = true;
    btnStop.disabled = false;
  });

  btnStop.addEventListener("click", async () => {
    if (!recorder) return;
    stopTimer();
    const blob = await recorder.stop();
    await recorder.destroy();

    const url = URL.createObjectURL(blob);

    const session = addSession({
      id: `${Date.now()}`,
      level,
      levelLabel,
      passageId: passage.id,
      passageTitle: passage.title,
      mode,
      durationSeconds: elapsedSeconds,
      createdAt: nowIso(),
      mediaUrl: url,
      mediaType: mode === "video" ? "video/webm" : "audio/webm",
    });

    const resultsUrl = new URL(window.location.origin + "/results.html");
    resultsUrl.searchParams.set("sessionId", session.id);
    window.location.href = resultsUrl.toString();
  });

  await initRecorder();
});
