// ───────────────────────────────────────────────────────────────
// Typed text animation
// ───────────────────────────────────────────────────────────────
const phrases = [
  "a Front-End Designer.",
  "an UI/UX Designer.",
  "a Dog Lover.",
  "an Artist."
];

const typedTextSpan = document.querySelector(".typed-text");

let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = "";
let isDeleting = false;
let typingSpeed = 100;

function type() {
  if (phraseIndex >= phrases.length) phraseIndex = 0;
  currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typedTextSpan.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;

    if (letterIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1100; // pause at end
    } else {
      typingSpeed = 100;
    }
  } else {
    typedTextSpan.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;

    if (letterIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      typingSpeed = 500;
    } else {
      typingSpeed = 50;
    }
  }
  setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});

/* ───────────────────────────────────────────────────────────────
   Back‑to‑Top button
   ─────────────────────────────────────────────────────────────── */

// create the button once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // 1) build the element
  const backBtn = document.createElement("button");
  backBtn.id = "backToTop";
  backBtn.title = "Go to top";
  backBtn.textContent = "↑"; // use any icon / text you like

  // 2) append to body
  document.body.appendChild(backBtn);

  // 3) show / hide on scroll
  window.addEventListener("scroll", () => {
    backBtn.classList.toggle("show", window.scrollY > 300);
  });

  // 4) smooth‑scroll to top on click
  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* ───────────────────────────────────────────────────────────────
   (Optional) jQuery namespace from your original code
   ───────────────────────────────────────────────────────────────
*/
(function ($) {
  $(function () {
    /* place any future jQuery code here */
  });
})(jQuery);
