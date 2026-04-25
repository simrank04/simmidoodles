/* ---------------------------
   Typed text animation
--------------------------- */
const phrases = [
  "an UI/UX Designer.",
  "an Front-End Developer.",
  "a Dog Lover.",
  "an Artist."
];

const typedTextSpan = document.querySelector(".typed-text");
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = "";
let isDeleting = false;

const SPEED_TYPE = 100;
const SPEED_PAUSE_END = 1000;
const SPEED_DELETE = 60;
const SPEED_PAUSE_BETWEEN = 600;

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
   Mobile Work Dropdown Toggle
--------------------------- */
function setupMobileWorkDropdown({ breakpoint = 700 } = {}) {
  const workDropdown = document.querySelector(".work-dropdown");
  const workLink = document.querySelector(".work-link");
  const dropdownMenu = workDropdown?.querySelector(".dropdown-menu");

  if (!workDropdown || !workLink || !dropdownMenu) return;

  workLink.addEventListener("click", (e) => {
    // Only toggle on mobile
    if (window.innerWidth < breakpoint) {
      e.preventDefault();
      workDropdown.classList.toggle("active");
    }
  });

  // Close dropdown when clicking a project link
  dropdownMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      workDropdown.classList.remove("active");
    });
  });

  // Reset on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth >= breakpoint) {
      workDropdown.classList.remove("active");
    }
  });
}

/* ---------------------------
   Logo Modal
--------------------------- */
function setupLogoModal() {
  const modal = document.getElementById('logoModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.close');
  const logoItems = document.querySelectorAll('.logo-item img');

  if (!modal || !modalImg || !closeBtn || !logoItems.length) return;

  logoItems.forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
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
  setupMobileWorkDropdown({ breakpoint: 700 });
  setupLogoModal();
});
