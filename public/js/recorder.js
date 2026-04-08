// js/recorder.js
export class SpeakReadRecorder {
  constructor({ mode = "video", videoEl, audioEl, onStatusChange }) {
    this.mode = mode; // "video" or "audio"
    this.videoEl = videoEl;
    this.audioEl = audioEl;
    this.onStatusChange = onStatusChange || (() => {});
    this.stream = null;
    this.mediaRecorder = null;
    this.chunks = [];
  }

  async init() {
    const constraints =
      this.mode === "video"
        ? { video: true, audio: true }
        : { video: false, audio: true };

    this.stream = await navigator.mediaDevices.getUserMedia(constraints);

    if (this.mode === "video" && this.videoEl) {
      this.videoEl.srcObject = this.stream;
      this.videoEl.style.display = "block";
      if (this.audioEl) this.audioEl.style.display = "none";
    } else if (this.mode === "audio" && this.audioEl) {
      this.audioEl.style.display = "none"; // will show only for playback
      if (this.videoEl) this.videoEl.style.display = "none";
    }

    this.onStatusChange("ready");
  }

  start() {
    if (!this.stream) {
      throw new Error("Recorder not initialized");
    }

    const mimeType =
      this.mode === "video" && MediaRecorder.isTypeSupported("video/webm")
        ? "video/webm"
        : "audio/webm";

    this.chunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };

    this.mediaRecorder.onstart = () => {
      this.onStatusChange("recording");
    };

    this.mediaRecorder.onstop = () => {
      this.onStatusChange("stopped");
    };

    this.mediaRecorder.start();
  }

  async stop() {
    if (!this.mediaRecorder) return null;

    return new Promise((resolve) => {
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, {
          type:
            this.mode === "video" ? "video/webm;codecs=vp9" : "audio/webm",
        });
        this.onStatusChange("stopped");
        resolve(blob);
      };
      this.mediaRecorder.stop();
    });
  }

  async destroy() {
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      this.mediaRecorder.stop();
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
    }
    this.stream = null;
    this.mediaRecorder = null;
    this.chunks = [];
    this.onStatusChange("destroyed");
  }
}
