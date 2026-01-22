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

// speeds in ms (tweakable)
const SPEED_TYPE = 100;
const SPEED_PAUSE_END = 1100;
const SPEED_DELETE = 50;
const SPEED_PAUSE_BETWEEN = 500;

function type() {
  if (!typedTextSpan) return; // defensive

  if (phraseIndex >= phrases.length) phraseIndex = 0;
  currentPhrase = phrases[phraseIndex] || "";

  if (!isDeleting) {
    // clamp to valid range
    letterIndex = Math.min(letterIndex + 1, currentPhrase.length);
    typedTextSpan.textContent = currentPhrase.substring(0, letterIndex);

    if (letterIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, SPEED_PAUSE_END);
      return;
    }
    setTimeout(type, SPEED_TYPE);
  } else {
    // deleting
    letterIndex = Math.max(letterIndex - 1, 0);
    typedTextSpan.textContent = currentPhrase.substring(0, letterIndex);

    if (letterIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      setTimeout(type, SPEED_PAUSE_BETWEEN);
      return;
    }
    setTimeout(type, SPEED_DELETE);
  }
}

/* ---------------------------
   Utilities
   --------------------------- */
function onDOM(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

/* ---------------------------
   Back-to-Top button (single source of truth)
   - Uses existing #backToTop if present, otherwise creates it.
   --------------------------- */
function ensureBackToTop() {
  let backBtn = document.getElementById("backToTop");
  if (!backBtn) {
    backBtn = document.createElement("button");
    backBtn.id = "backToTop";
    backBtn.title = "Go to top";
    backBtn.setAttribute("aria-label", "Back to top");
    backBtn.textContent = "↑";
    // basic styles can be provided in CSS; this keeps it visible by default on desktop
    document.body.appendChild(backBtn);
  }

  // show/hide class instead of inline styles for easier CSS control
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
   Mobile Nav / Hamburger Toggle
   - Supports .nav-toggle button and .nav-links (or #primary-navigation)
   - Gracefully degrades if elements are missing
   --------------------------- */
function setupMobileNav(options = {}) {
  const breakpoint = options.breakpoint || 700;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links") || document.getElementById("primary-navigation");

  if (!navToggle || !navLinks) return;

  // initialize aria
  navToggle.setAttribute("aria-expanded", "false");

  function openNav() {
    navLinks.classList.add("open");
    document.body.classList.add("nav-open");
    navToggle.setAttribute("aria-expanded", "true");
    // allow CSS to style; set flex direction for older browsers
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = window.innerWidth < breakpoint ? "column" : "row";
  }

  function closeNav() {
    navLinks.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.style.display = "";
    navLinks.style.transform = "";
  }

  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (navLinks.classList.contains("open")) {
      closeNav();
    } else {
      openNav();
    }
  });

  // close when clicking any link on mobile for better UX
  navLinks.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (anchor && window.innerWidth < breakpoint) {
      closeNav();
    }
  });

  // close when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    if (window.innerWidth < breakpoint && navLinks.classList.contains("open")) {
      const isInside = navLinks.contains(e.target) || navToggle.contains(e.target);
      if (!isInside) closeNav();
    }
  });

  // reset on resize to desktop
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= breakpoint) {
        closeNav();
      }
    }, 120);
  });
}

/* ---------------------------
   Boot
   --------------------------- */
onDOM(() => {
  // start typed animation
  type();

  // back-to-top (create or use existing)
  ensureBackToTop();

  // scroll arrow fade
  setupScrollArrowFade();

  // mobile nav
  setupMobileNav({ breakpoint: 700 });
});

(function ($) {
  $(function () {

  });
})(window.jQuery);
