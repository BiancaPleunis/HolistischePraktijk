const SUPABASE_URL = "https://ylayjxueqejgpmkfoaqt.supabase.co";
const SUPABASE_KEY = "sb_publishable_VBhAT_cZRLDZoEIPyfGPEQ_0FdWVCEx";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

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


// ========================
// --- REVIEWS ---
// ========================

const starButtons =
  document.querySelectorAll(".star-rating button");

const ratingInput =
  document.getElementById("review-rating");

function updateStars(rating) {

  starButtons.forEach(star => {

    const starRating =
      Number(star.dataset.rating);

    star.classList.toggle(
      "selected",
      starRating <= rating
    );

  });

}

starButtons.forEach(star => {

  star.addEventListener("click", () => {

    const rating =
      Number(star.dataset.rating);

    ratingInput.value = rating;

    updateStars(rating);

  });

});

updateStars(5);

async function loadReviews() {

  const reviewsList = document.getElementById("reviews-list");

  if (!reviewsList) return;

  const { data, error } = await supabaseClient
    .from("reviews")
    .select("id, review, rating, display_name, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {

    console.error("Fout bij laden recensies:", error);

    reviewsList.innerHTML = `
      <p class="reviews-error">
        De recensies konden helaas niet worden geladen.
      </p>
    `;

    return;
  }

  if (!data || data.length === 0) {

    reviewsList.innerHTML = `
      <p class="reviews-empty">
        Er zijn nog geen recensies geplaatst.
      </p>
    `;

    return;
  }

  reviewsList.innerHTML = "";

  data.forEach(review => {

    const article = document.createElement("article");

    article.className = "review-card";

    const stars = "★".repeat(review.rating);

    article.innerHTML = `
      <div class="review-stars">
        ${stars}
      </div>

      <p class="review-text">
        “${escapeHTML(review.review)}”
      </p>

      <p class="review-author">
        ${escapeHTML(review.display_name)}
      </p>
    `;

    reviewsList.appendChild(article);

  });
}

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}

const reviewForm = document.getElementById("review-form");

if (reviewForm) {

  reviewForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const message = document.getElementById("review-message");
    const submitButton = reviewForm.querySelector("button[type='submit']");

    const reviewText =
      document.getElementById("review-text").value.trim();

    const name =
      document.getElementById("review-name").value.trim();

    const displayOption =
      document.getElementById("display-name").value;

    const rating =
      Number(document.getElementById("review-rating").value);

    if (reviewText.length < 10) {

      message.textContent =
        "Schrijf minimaal 10 tekens.";

      return;
    }

    if (rating < 1 || rating > 5) {

      message.textContent =
        "Kies een aantal sterren.";

      return;
    }

    let displayName;

    if (displayOption === "anonymous") {

      displayName = "Anoniem";

    } else if (displayOption === "initials") {

      displayName = createInitials(name);

    } else {

      displayName = name;

    }

    if (!displayName) {

      message.textContent =
        "Vul je naam in of kies 'Anoniem'.";

      return;
    }

    submitButton.disabled = true;

    submitButton.textContent =
      "Bezig met plaatsen...";

    const { error } = await supabaseClient
      .from("reviews")
      .insert({
        review: reviewText,
        rating: rating,
        name: name || null,
        display_name: displayName,
        approved: true
      });

    if (error) {

      console.error(error);

      message.textContent =
        "Er ging iets mis. Probeer het opnieuw.";

      submitButton.disabled = false;

      submitButton.textContent =
        "Recensie plaatsen";

      return;
    }

    message.textContent =
      "Dankjewel! Je recensie is geplaatst ❤️";

    reviewForm.reset();

    document.getElementById("review-rating").value = 5;

    updateStars(5);

    submitButton.disabled = false;

    submitButton.textContent =
      "Recensie plaatsen";

    await loadReviews();

  });

}

function createInitials(name) {

  if (!name) return "";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return parts
    .map(part => part.charAt(0).toUpperCase())
    .join(".") + ".";

}

// ========================
// --- REVIEWS LADEN ---
// ========================

document.addEventListener("DOMContentLoaded", () => {
  loadReviews();
});
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
