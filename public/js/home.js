// js/home.js
// SPEAK READ — HOME PAGE CONTROLLER
// Handles: year footer, form validation, routing to read.html

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

    // Build URL → read.html?level=X&mode=Y
    const url = new URL(window.location.origin + "/read.html");
    url.searchParams.set("level", level);
    url.searchParams.set("mode", mode);

    window.location.href = url.toString();
  });
});
