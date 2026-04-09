// js/home.js
import { setYearFooter } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  setYearFooter();

  const form = document.getElementById("sr-level-form");
  if (!form) return;

  const levelSelect = form.querySelector("#gradeLevel");
  const modeSelect = form.querySelector("#mode");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const level = levelSelect.value;
    const mode = modeSelect.value;

    if (!level) {
      alert("Select a reading level.");
      return;
    }

    if (!mode) {
      alert("Select a recording mode.");
      return;
    }

    // RELATIVE PATH — WORKS EVERYWHERE
    const url = new URL("./read.html", window.location.href);
    url.searchParams.set("level", level);
    url.searchParams.set("mode", mode);

    window.location.href = url.toString();
  });
});
