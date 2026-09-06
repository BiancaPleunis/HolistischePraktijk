// ========================
// --- SUPABASE ---
// ========================

const SUPABASE_URL = "https://ylayjxueqejgpmkfoaqt.supabase.co/rest/v1/reviews";
const SUPABASE_ANON_KEY = "sb_publishable_VBhAT_cZRLDZoEIPyfGPEQ_0FdWVCEx";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ========================
// --- REVEAL EFFECT ---
// ========================

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.15
    }
);

reveals.forEach((el) => observer.observe(el));


// ========================
// --- SMOOTH SCROLL ---
// ========================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// ========================
// --- NAVIGATIE ---
// ========================

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
    });
});


// ========================
// --- FOOTER JAARTAL ---
// ========================

const footer = document.querySelector("footer");

if (footer) {
    const year = new Date().getFullYear();
    const yearElement = footer.querySelector(".year");

    if (yearElement) {
        yearElement.textContent = year;
    }
}


// ========================
// --- CONTACTFORMULIER ---
// ========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const naam = document.getElementById("naam");
        const email = document.getElementById("email");
        const bericht = document.getElementById("bericht");

        if (!naam || !email || !bericht) {
            return;
        }

        const templateParams = {
            naam: naam.value,
            email: email.value,
            bericht: bericht.value
        };

        emailjs
            .send(
                "service_holistischepraktijk",
                "template_contact",
                templateParams
            )
            .then(() => {
                alert("Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("EmailJS fout:", error);
                alert("Er ging iets mis bij het versturen. Probeer het later opnieuw.");
            });
    });
}


// ========================
// --- LEES MEER ---
// ========================

const leesMeerBtn = document.querySelector(".leesmeer");
const textBlokEl = document.querySelector(".full-text");

if (leesMeerBtn && textBlokEl) {
    leesMeerBtn.addEventListener("click", () => {
        textBlokEl.classList.toggle("open");

        if (textBlokEl.classList.contains("open")) {
            leesMeerBtn.textContent = "Lees minder";
        } else {
            leesMeerBtn.textContent = "Lees meer";
        }
    });
}


// ========================
// --- DAGELIJKSE QUOTE ---
// ========================

const dagen = [
    "zondag",
    "maandag",
    "dinsdag",
    "woensdag",
    "donderdag",
    "vrijdag",
    "zaterdag"
];

const quotes = {
    maandag: "Elke dag is een nieuwe kans om dichter bij jezelf te komen.",
    dinsdag: "Luister naar wat je lichaam je vertelt.",
    woensdag: "Rust is geen stilstand, maar een moment om opnieuw op te laden.",
    donderdag: "Je hoeft niet alles vandaag te doen.",
    vrijdag: "Geef jezelf de ruimte om te voelen wat er werkelijk speelt.",
    zaterdag: "Zorg goed voor jezelf, zodat je vanuit rust kunt leven.",
    zondag: "Neem vandaag bewust tijd voor jezelf en voor wat jou voedt."
};

function showDailyQuote() {
    const citaat = document.querySelector(".daily-quote");

    if (!citaat) {
        return;
    }

    const vandaag = dagen[new Date().getDay()];

    if (quotes[vandaag]) {
        citaat.textContent = quotes[vandaag];
    }
}

showDailyQuote();


// ========================
// --- QUOTE SCROLL EFFECT ---
// ========================

const quoteElementC = document.querySelector(".daily-quote");

if (quoteElementC) {
    window.addEventListener("scroll", () => {
        const rect = quoteElementC.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            quoteElementC.classList.add("visible");
        }
    });
}


// ========================
// --- PARALLAX ---
// ========================

const parallaxImgs = document.querySelectorAll(".parallax");

if (parallaxImgs.length > 0) {
    window.addEventListener("scroll", () => {
        parallaxImgs.forEach((img) => {
            const speed = 0.15;
            const yPos = window.scrollY * speed;

            img.style.transform = `translateY(${yPos}px)`;
        });
    });
}


// ========================
// --- HAMBURGER MENU ---
// ========================

const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector("nav");

if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileNav.classList.toggle("active");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileNav.classList.remove("active");
        });
    });
}


// ========================
// --- SCROLL LOOP ---
// ========================

function scrollLoop() {
    const scrollElements = document.querySelectorAll(".scroll-loop");

    if (scrollElements.length === 0) {
        return;
    }

    scrollElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add("scroll-visible");
        }
    });

    requestAnimationFrame(scrollLoop);
}


// ========================
// --- REVIEWS / STERREN ---
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

    // Verborgen input bijwerken
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
// --- REVIEWS LADEN ---
// ========================

async function loadReviews() {
    const reviewsList = document.getElementById("reviews-list");

    if (!reviewsList) {
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from("reviews")
            .select("*")
            .order("created_at", {
                ascending: false
            });

        if (error) {
            console.error("Fout bij ophalen reviews:", error);
            return;
        }

        reviewsList.innerHTML = "";

        if (!data || data.length === 0) {
            reviewsList.innerHTML = `
                <p class="geen-reviews">
                    Er zijn nog geen reviews geplaatst.
                </p>
            `;
            return;
        }

        data.forEach((review) => {
            const reviewCard = document.createElement("div");

            reviewCard.className = "review-card";

            const naam = review.name || review.naam || "Anoniem";
            const tekst = review.review || review.text || review.tekst || "";
            const rating = Number(review.rating) || 0;

            const sterren = "★".repeat(rating) + "☆".repeat(5 - rating);

            reviewCard.innerHTML = `
                <div class="review-stars">${sterren}</div>
                <p class="review-text">"${escapeHTML(tekst)}"</p>
                <p class="review-name">${escapeHTML(naam)}</p>
            `;

            reviewsList.appendChild(reviewCard);
        });

    } catch (error) {
        console.error("Onverwachte fout bij laden reviews:", error);
    }
}


// ========================
// --- HTML VEILIG MAKEN ---
// ========================

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}


// ========================
// --- REVIEW FORMULIER ---
// ========================

const reviewForm = document.getElementById("review-form");

if (reviewForm) {
    reviewForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nameInput = document.getElementById("review-name");
        const reviewInput = document.getElementById("review-text");

        if (!nameInput || !reviewInput) {
            return;
        }

        const name = nameInput.value.trim();
        const text = reviewInput.value.trim();

        if (!name || !text || selectedRating === 0) {
            alert("Vul je naam, review en aantal sterren in.");
            return;
        }

        try {
            const { error } = await supabaseClient
                .from("reviews")
                .insert([
                    {
                        name: name,
                        review: text,
                        rating: selectedRating
                    }
                ]);

            if (error) {
                console.error("Fout bij plaatsen review:", error);
                alert("Er ging iets mis bij het plaatsen van je review.");
                return;
            }

            alert("Bedankt voor je review!");

            reviewForm.reset();

            selectedRating = 0;
            updateStars(0);

            loadReviews();

        } catch (error) {
            console.error("Onverwachte fout:", error);
            alert("Er ging iets mis. Probeer het later opnieuw.");
        }
    });
}


// ========================
// --- INITIALEN REVIEW ---
// ========================

function createInitials(name) {
    if (!name) {
        return "";
    }

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
// --- REVIEWS BIJ LADEN PAGINA ---
// ========================

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();
});


// ========================
// --- START SCROLL LOOP ---
// ========================

window.addEventListener("load", () => {
    scrollLoop();
});
