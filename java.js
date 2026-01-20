// ========================
// --- REVEAL EFFECT ---
// ========================
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 150) {
      el.classList.add('active');
    }
  });
}

// ========================
// --- SMOOTH SCROLL ---
// ========================
function smoothScrollTo(element) {
  if (!element) return;
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  const elementY = element.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: elementY - headerHeight,
    behavior: 'smooth'
  });
}

// ========================
// --- NAVIGATIE EVENTS ---
// ========================
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    smoothScrollTo(document.getElementById(targetId));
  });
});

document.querySelectorAll('.footer-nav li').forEach(link => {
  link.addEventListener('click', () => {
    const id = link.textContent.toLowerCase().replace(/\s/g, '');
    smoothScrollTo(document.getElementById(id) || document.getElementById('home'));
  });
});

const homeLogo = document.getElementById('home-logo');
if (homeLogo) {
  homeLogo.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const planButton = document.querySelector('.hero button');
const contactSection = document.getElementById('contact');
if (planButton && contactSection) {
  planButton.addEventListener('click', e => {
    e.preventDefault();
    smoothScrollTo(contactSection);
  });
}

// ========================
// --- FOOTER ---
// ========================
const footer = document.querySelector('footer');
function updateFooter() {
  if (!footer) return;
  if (footer.getBoundingClientRect().top < window.innerHeight - 100) {
    footer.classList.add('active');
  }
}

// ========================
// --- CONTACT FORM ---
// ========================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    emailjs.sendForm('service_hqpmmr9', 'template_bwi0ss9', contactForm)
      .then(() => {
        alert('Bericht succesvol verzonden! Dankjewel ♥');
        contactForm.reset();
      })
      .catch(() => alert('Er ging iets mis. Probeer het later opnieuw.'));
  });
}

// ========================
// --- REVIEWS SLIDER ---
// ========================
let currentReview = 0;
const reviews = document.querySelectorAll('.review');
const reviewIntervalTime = 10000; // 10 seconden
let reviewInterval;

function showReview(index) {
  reviews.forEach((r, i) => r.classList.toggle('active', i === index));
  currentReview = index;
}

// Automatisch starten
function startReviewInterval() {
  reviewInterval = setInterval(() => {
    showReview((currentReview + 1) % reviews.length);
  }, reviewIntervalTime);
}

// Stoppen interval (voor eventueel herstart bij klik)
function resetReviewInterval() {
  clearInterval(reviewInterval);
  startReviewInterval();
}

// Start de loop bij load
startReviewInterval();
const reviewBox = document.querySelector('.recensie-box');

if (reviewBox) {
  reviewBox.addEventListener('click', () => {
    showReview((currentReview + 1) % reviews.length);
    resetReviewInterval(); // herstart de automatische loop
  });
}

// ========================
// --- LEES MEER ---
// ========================
const leesMeerBtn = document.querySelector('.leesmeer');
const textBlokEl = document.querySelector('.textblok');

if (leesMeerBtn && textBlokEl) {
  leesMeerBtn.addEventListener('click', () => {
    textBlokEl.classList.toggle('expanded');
    leesMeerBtn.classList.toggle('expanded');

    // Knoptekst wisselen
    if (leesMeerBtn.classList.contains('expanded')) {
      leesMeerBtn.textContent = "Korter";
    } else {
      leesMeerBtn.textContent = "Lees meer";
    }
  });
}


// ========================
// --- DAG & QUOTE ---
// ========================
const dagen = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
const quotes = [
  "Waar liggen de wortels van jouw verhaal?",
  "Keer terug naar je innerlijke thuis, waar het vuur altijd blijft gloeien.",
  "Want als je voelt, dan heel je.",
  "Kies ik het pad van angst, of stap ik in het veld van liefde?",
  "Waar liggen de wortels van jouw verhaal?",
  "Keer terug naar je innerlijke thuis, waar het vuur altijd blijft gloeien.",
  "Want als je voelt, dan heel je."
];

function showDailyQuote() {
  const day = new Date().getDay();
  const quote = document.getElementById('quote');
  const dayEl = document.getElementById('quote-day');
  if (quote && dayEl) {
    quote.textContent = quotes[day];
    dayEl.textContent = dagen[day];
  }
}
showDailyQuote();

// ========================
// --- CITAAT SCROLL EFFECT ---
// ========================
const citaat = document.querySelector('.citaat');
const quoteElementC = document.getElementById('quote');
let glowDiv = null;

if (quoteElementC && quoteElementC.parentElement) {
  glowDiv = document.createElement('div');
  glowDiv.style.position = 'absolute';
  glowDiv.style.top = '0';
  glowDiv.style.left = '-100%';
  glowDiv.style.width = '50%';
  glowDiv.style.height = '100%';
  glowDiv.style.background =
    'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)';
  glowDiv.style.transform = 'skewX(-25deg)';
  glowDiv.style.pointerEvents = 'none';
  glowDiv.style.zIndex = '3';
  quoteElementC.parentElement.style.position = 'relative';
  quoteElementC.parentElement.appendChild(glowDiv);
}

function updateCitaat() {
  if (!citaat || !quoteElementC) return;
  const rect = citaat.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const progress = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);

  const movement = (progress - 0.5) * 20;
  const scale = 0.95 + progress * 0.05;
  const opacity = 0.5 + progress * 0.5;

  quoteElementC.style.transform = `translateY(${movement}px) scale(${scale})`;
  quoteElementC.style.opacity = opacity;

  if (glowDiv) glowDiv.style.left = `${-100 + progress * 200}%`;
}

// ========================
// --- PARALLAX ---
// ========================
const parallaxImgs = document.querySelectorAll('.parallax-img');

function updateParallax() {
  const windowHeight = window.innerHeight;
  parallaxImgs.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < windowHeight) {
      const progress = 1 - rect.top / windowHeight;
      img.style.transform = `translateY(${progress * 15}px)`;
    }
  });
}

// ========================
// --- HAMBURGER MENU ---
// ========================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ========================
// --- SCROLL LOOP ---
// ========================
function scrollLoop() {
  revealOnScroll();
  updateFooter();
  updateCitaat();
  updateParallax();
  window.requestAnimationFrame(scrollLoop);
}

// Start scroll loop direct na load
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
  scrollLoop(); // ✅ geen dubbele listener
});
