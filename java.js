// --- REVEAL EFFECT ---
const reveals = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const elementTop = section.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      section.classList.add('active');
    }
  });
});



// --- SCROLL NAAR CONTACT ---
const planButton = document.querySelector('.hero button');
const contactSection = document.getElementById('contact');

planButton.addEventListener('click', (e) => {
  e.preventDefault();
  contactSection.scrollIntoView({ behavior: 'smooth' });
});



// --- SMOOTH SCROLL VOOR NAVIGATIE MET EXTRA OFFSET ---
const menuLinks = document.querySelectorAll('nav ul li a');

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const elementPosition = targetSection.offsetTop;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      targetSection.scrollIntoView({
  behavior: 'smooth',
  block: 'start'
});

    }
  });
});



// --- LOGO SCROLL NAAR BOVEN ---
const logo = document.getElementById('home-logo');
logo.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// --- FOOTER ANIMATIE ---
const footer = document.querySelector('footer');
window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const footerTop = footer.getBoundingClientRect().top;

  if (footerTop < windowHeight - 100) {
    footer.classList.add('active');
  }
});


// --- CONTACT FORM EMAILJS ---
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  emailjs.sendForm("service_hqpmmr9", "template_bwi0ss9", this)
    .then(() => {
      alert("Bericht succesvol verzonden! Dankjewel ♥");
      this.reset();
    }, () => {
      alert("Er ging iets mis. Probeer het later opnieuw.");
    });
});


// --- AUTOMATISCHE REVIEW SLIDER ---

// --- REVIEWS SCRIPT ---
const reviews = document.querySelectorAll('.review');
const recensieBoxes = document.querySelectorAll('.recensie-box'); // hele box klikbaar
let currentReview = 0;

// Functie om recensie te tonen
function showReview(index) {
  reviews.forEach((r, i) => {
    r.classList.toggle('active', i === index);
  });
  currentReview = index;
}

// Klik event toevoegen aan elke recensie-box
recensieBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    let nextReview = (currentReview + 1) % reviews.length; // wrap around
    showReview(nextReview);
  });
});

// Optioneel: automatische slider blijft hetzelfde
setInterval(() => {
  let nextReview = (currentReview + 1) % reviews.length;
  showReview(nextReview);
}, 3500); // elke 3.5 seconden


// (optioneel) automatisch laten overspringen
// setInterval(() => {
//   let nextReview = (currentReview + 1) % reviews.length;
//   showReview(nextReview);
// }, 5000); // elke 5 seconden


// --- SMOOTH SCROLL VOOR FOOTER NAVIGATIE ---
const footerLinks = document.querySelectorAll('.footer-nav li');

footerLinks.forEach(link => {
  link.addEventListener('click', () => {
    const sectionId = link.textContent.toLowerCase().replace(' ', ''); // "over mij" -> "overmij"
    const section = document.getElementById(sectionId) || document.getElementById('home');
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Sluit menu als er op een link wordt geklikt
document.querySelectorAll('.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    if(navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
});

const leesMeer = document.querySelector('.leesmeer');
const textBlok = document.querySelector('.textblok');

leesMeer.addEventListener('click', () => {
  textBlok.classList.toggle('expanded');
});

// Array met dagen
const dagen = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];

// Functie om dag en quote te tonen
function showDailyQuote() {
  const today = new Date();
  const dayIndex = today.getDay(); // 0 = zondag, 1 = maandag ...
  
  const quoteElement = document.getElementById('quote');
  const dayElement = document.getElementById('quote-day');

  // Quotes array
  const quotes = [
    "hoihoi",
    "Quote voor maandag",
    "Quote voor dinsdag",
    "Quote voor woensdag",
    "Quote voor donderdag",
    "Quote voor vrijdag",
    "Want als je voelt, dan heel je."
  ];

  quoteElement.textContent = quotes[dayIndex];
  dayElement.textContent = dagen[dayIndex]; // toont de dag
}

// Bij pagina load
showDailyQuote();

// Update automatisch om middernacht
const now = new Date();
const msUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1,0,0,0) - now;

setTimeout(() => {
  showDailyQuote();
  setInterval(showDailyQuote, 24*60*60*1000);
}, msUntilMidnight);

