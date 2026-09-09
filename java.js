// ========================
// --- REVEAL EFFECT ---
// ========================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 150) {
            el.classList.add("active");
        }
    });
}


// ========================
// --- SMOOTH SCROLL ---
// ========================

function smoothScrollTo(element) {
    if (!element) return;

    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;
    const elementY = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: elementY - headerHeight,
        behavior: "smooth"
    });
}

document.querySelectorAll('nav ul li a').forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href").substring(1);
        smoothScrollTo(document.getElementById(targetId));

        // Sluit mobiel menu na klikken
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

        if (navLinks) navLinks.classList.remove("open");
        if (hamburger) hamburger.classList.remove("active");
    });
});


// ========================
// --- FOOTER NAVIGATIE ---
// ========================

document.querySelectorAll(".footer-nav li").forEach((link) => {
    link.addEventListener("click", () => {
        const id = link.textContent.toLowerCase().replace(/\s/g, "");

        smoothScrollTo(
            document.getElementById(id) ||
            document.getElementById("home")
        );
    });
});


// ========================
// --- LOGO NAAR BOVEN ---
// ========================

const homeLogo = document.getElementById("home-logo");

if (homeLogo) {
    homeLogo.addEventListener("click", (e) => {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ========================
// --- PLAN EEN SESSIE ---
// ========================

const planButton = document.querySelector(".hero button");
const contactSection = document.getElementById("contact");

if (planButton && contactSection) {
    planButton.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScrollTo(contactSection);
    });
}


// ========================
// --- FOOTER ANIMATIE ---
// ========================

const footer = document.querySelector("footer");

function updateFooter() {
    if (!footer) return;

    if (footer.getBoundingClientRect().top < window.innerHeight - 100) {
        footer.classList.add("active");
    }
}


// ========================
// --- CONTACTFORMULIER / EMAILJS ---
// ========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_hqpmmr9",
                "template_bwi0ss9",
                contactForm
            )
            .then(() => {
                alert("Bericht succesvol verzonden! Dankjewel ♥");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("EmailJS fout:", error);
                alert("Er ging iets mis. Probeer het later opnieuw.");
            });
    });
}


// ========================
// --- LEES MEER ---
// ========================

const leesMeerBtn = document.querySelector(".leesmeer");
const textBlokEl = document.querySelector(".textblok");

if (leesMeerBtn && textBlokEl) {
    leesMeerBtn.addEventListener("click", () => {
        textBlokEl.classList.toggle("expanded");
        leesMeerBtn.classList.toggle("expanded");

        if (leesMeerBtn.classList.contains("expanded")) {
            leesMeerBtn.textContent = "Korter";
        } else {
            leesMeerBtn.textContent = "Lees meer";
        }
    });
}

// ========================
// --- DAGELIJKSE QUOTE ---
// ========================

const dagen = [
    "Zondag",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Zaterdag"
];

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
    const quote = document.getElementById("quote");
    const dayEl = document.getElementById("quote-day");

    if (quote && dayEl) {
        quote.textContent = quotes[day];
        dayEl.textContent = dagen[day];
    }
}

showDailyQuote();


// ========================
// --- CITAAT SCROLL EFFECT ---
// ========================

const citaat = document.querySelector(".citaat");
const quoteElementC = document.getElementById("quote");

let glowDiv = null;

if (quoteElementC && quoteElementC.parentElement) {
    glowDiv = document.createElement("div");

    glowDiv.style.position = "absolute";
    glowDiv.style.top = "0";
    glowDiv.style.left = "-100%";
    glowDiv.style.width = "50%";
    glowDiv.style.height = "100%";
    glowDiv.style.background =
        "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)";
    glowDiv.style.transform = "skewX(-25deg)";
    glowDiv.style.pointerEvents = "none";
    glowDiv.style.zIndex = "3";

    quoteElementC.parentElement.style.position = "relative";
    quoteElementC.parentElement.appendChild(glowDiv);
}

function updateCitaat() {
    if (!citaat || !quoteElementC) return;

    const rect = citaat.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const progress = Math.min(
        Math.max(1 - rect.top / windowHeight, 0),
        1
    );

    const movement = (progress - 0.5) * 20;
    const scale = 0.95 + progress * 0.05;
    const opacity = 0.5 + progress * 0.5;

    quoteElementC.style.transform =
        `translateY(${movement}px) scale(${scale})`;

    quoteElementC.style.opacity = opacity;

    if (glowDiv) {
        glowDiv.style.left = `${-100 + progress * 200}%`;
    }
}


// ========================
// --- PARALLAX ---
// ========================

const parallaxImgs = document.querySelectorAll(".parallax-img");

function updateParallax() {
    const windowHeight = window.innerHeight;

    parallaxImgs.forEach((img) => {
        const rect = img.getBoundingClientRect();

        if (rect.bottom > 0 && rect.top < windowHeight) {
            const progress = 1 - rect.top / windowHeight;

            img.style.transform =
                `translateY(${progress * 15}px)`;
        }
    });
}


// ========================
// --- HAMBURGER MENU ---
// ========================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            hamburger.classList.remove("active");
        });
    });
}

// ========================
// --- REVIEWS / FORMSPREE ---
// ========================

const FORMSPREE_ENDPOINT = "https://formspree.io/f/moeqnlnq";

const approvedReviews = [
    {
        name: "M.",
        rating: 5,
        text: "Ik weet niet hoe het werkt en hoe snel; maar voel me een stuk beter dan straks 😊"
    },
    {
        name: "P.",
        rating: 5,
        text: "Met mijn hoofd gaat t een stuk beter, geen idee hoe t werkt, maar t werkt!"
    },
    {
        name: "C.",
        rating: 5,
        text: "Dankjewel Bianca de pijn in mijn onderrug is vanaf half vier al een stuk minder."
    },
    {
        name: "P.",
        rating: 5,
        text: "Hoi Bianca, ik voel me weer wat meer mens na de reiki van jou👍"
    },
    {
        name: "P.",
        rating: 5,
        text: "Ik voel mij al een stuk beter, dank je wel."
    }
];


// ========================
// --- HTML VEILIG MAKEN ---
// ========================

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


// ========================
// --- REVIEWS LADEN ---
// ========================

function loadReviews() {
    const reviewsList = document.getElementById("reviews-list");

    if (!reviewsList) return;

    reviewsList.innerHTML = "";

    if (!approvedReviews || approvedReviews.length === 0) {
        reviewsList.innerHTML = `
            <p class="reviews-empty">
                Er zijn nog geen reviews geplaatst.
            </p>
        `;
        return;
    }

    approvedReviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "review-card";

        const naam = review.name || "Anoniem";
        const tekst = review.text || "";
        const rating = Math.min(
            5,
            Math.max(0, Number(review.rating) || 0)
        );

        const sterren =
            "★".repeat(rating) +
            "☆".repeat(5 - rating);

        reviewCard.innerHTML = `
            <div class="review-stars">${sterren}</div>
            <p class="review-text">"${escapeHTML(tekst)}"</p>
            <p class="review-author">${escapeHTML(naam)}</p>
        `;

        reviewsList.appendChild(reviewCard);
    });
}


// ========================
// --- STERREN SELECTEREN ---
// ========================

const starButtons = document.querySelectorAll(".star-rating button");
const ratingInput = document.getElementById("review-rating");

let selectedRating = 0;

function updateStars(rating) {
    starButtons.forEach((star, index) => {
        if (index < rating) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });

    if (ratingInput) {
        ratingInput.value = rating;
    }
}

starButtons.forEach((star) => {
    star.addEventListener("click", () => {
        selectedRating = Number(star.dataset.rating);
        updateStars(selectedRating);
    });
});


// ========================
// --- INITIALEN REVIEW ---
// ========================

function createInitials(name) {
    if (!name) return "";

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }

    return (
        parts[0].charAt(0) +
        parts[parts.length - 1].charAt(0)
    ).toUpperCase();
}


// ========================
// --- REVIEW FORMULIER ---
// ========================

const reviewForm = document.getElementById("review-form");

if (reviewForm) {
    reviewForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("review-name");
        const reviewInput = document.getElementById("review-text");
        const displayNameInput = document.getElementById("display-name");

        if (!nameInput || !reviewInput) return;

        const name = nameInput.value.trim();
        const text = reviewInput.value.trim();

        if (!name || !text || selectedRating === 0) {
            alert("Vul je naam, review en aantal sterren in.");
            return;
        }

        let displayName = name;

        if (displayNameInput) {
            const displayChoice = displayNameInput.value;

            if (displayChoice === "initials") {
                displayName = createInitials(name);
            }

            if (displayChoice === "anonymous") {
                displayName = "Anoniem";
            }
        }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("display_name", displayName);
        formData.append("rating", selectedRating);
        formData.append("review", text);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                alert(
                    "Bedankt voor je review! Je review wordt eerst gecontroleerd."
                );

                reviewForm.reset();
                selectedRating = 0;
                updateStars(0);
            } else {
                const data = await response.json().catch(() => null);
                console.error("Formspree fout:", data);

                alert(
                    "Er ging iets mis bij het versturen van je review. Probeer het later opnieuw."
                );
            }
        } catch (error) {
            console.error("Onverwachte fout bij review:", error);

            alert(
                "Er ging iets mis bij het versturen van je review. Controleer je internetverbinding en probeer het opnieuw."
            );
        }
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


// ========================
// --- START ---
// ========================

window.addEventListener("load", () => {
    document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("active"));

    loadReviews();
    scrollLoop();
});
