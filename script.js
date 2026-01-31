/* ---------------------------
   Typed text animation
--------------------------- */
const phrases = [
  "an UI/UX Designer.",
  "a Dog Lover.",
  "an Artist."
];

const typedTextSpan = document.querySelector(".typed-text");
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = "";
let isDeleting = false;

const SPEED_TYPE = 100;
const SPEED_PAUSE_END = 1100;
const SPEED_DELETE = 50;
const SPEED_PAUSE_BETWEEN = 500;

function type() {
  if (!typedTextSpan) return;

  if (phraseIndex >= phrases.length) phraseIndex = 0;
  currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    letterIndex++;
    typedTextSpan.textContent = currentPhrase.substring(0, letterIndex);

    if (letterIndex === currentPhrase.length) {
      isDeleting = true;
      return setTimeout(type, SPEED_PAUSE_END);
    }
    setTimeout(type, SPEED_TYPE);
  } else {
    letterIndex--;
    typedTextSpan.textContent = currentPhrase.substring(0, letterIndex);

    if (letterIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      return setTimeout(type, SPEED_PAUSE_BETWEEN);
    }
    setTimeout(type, SPEED_DELETE);
  }
}

/* ---------------------------
   Utilities
--------------------------- */
function onDOM(fn) {
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn)
    : fn();
}

/* ---------------------------
   Back-to-Top button
--------------------------- */
function ensureBackToTop() {
  let backBtn = document.getElementById("backToTop");
  if (!backBtn) return;

  const onScroll = () => {
    backBtn.classList.toggle("show", window.scrollY > 300);
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------
   Scroll arrow fade
--------------------------- */
function setupScrollArrowFade() {
  const scrollArrow = document.querySelector(".scroll-down");
  if (!scrollArrow) return;

  const onScroll = () => {
    scrollArrow.classList.toggle("hidden", window.scrollY > 50);
  };

  window.addEventListener("scroll", onScroll);
  onScroll();
}

/* ---------------------------
   Mobile Nav / Hamburger + X Close
--------------------------- */
function setupMobileNav({ breakpoint = 700 } = {}) {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navClose = navLinks?.querySelector(".nav-close");

  if (!navToggle || !navLinks) return;

  navToggle.setAttribute("aria-expanded", "false");

  function openNav() {
    navLinks.classList.add("open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    navLinks.classList.remove("open"); // ← smooth CSS transition
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  // ☰ toggle
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.contains("open") ? closeNav() : openNav();
  });

  // ✕ close button
  if (navClose) {
    navClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeNav();
    });
  }

  // close when clicking a link (mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a") && window.innerWidth < breakpoint) {
      closeNav();
    }
  });

  // click outside to close
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth < breakpoint &&
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  // reset on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= breakpoint) {
      closeNav();
    }
  });
}

/* ---------------------------
   Boot
--------------------------- */
onDOM(() => {
  type();
  ensureBackToTop();
  setupScrollArrowFade();
  setupMobileNav({ breakpoint: 700 });
});
