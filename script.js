/* ================================
   PORTFOLIO FILTER
================================ */

const filterButtons =
    document.querySelectorAll(".filter-button");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active class */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        /* Add active class */

        button.classList.add("active");


        /* Get selected category */

        const filter =
            button.getAttribute("data-filter");


        /* Filter projects */

        portfolioItems.forEach(item => {

            const category =
                item.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});



/* ================================
   STATISTICS COUNTER
================================ */

const statNumbers =
    document.querySelectorAll(".stat-number");

let statsStarted = false;


function startCounters() {

    if (statsStarted) return;

    statsStarted = true;


    statNumbers.forEach(stat => {

        const target =
            Number(stat.dataset.target);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 80));


        const updateCounter = () => {

            current += increment;


            if (current >= target) {

                current = target;

            }


            stat.textContent =
                current.toLocaleString();


            if (current < target) {

                requestAnimationFrame(
                    updateCounter
                );

            }

        };


        updateCounter();

    });

}


/* Start counters when section enters screen */

const statsSection =
    document.querySelector(".stats");


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            entries => {

                if (entries[0].isIntersecting) {

                    startCounters();

                    statsObserver.disconnect();

                }

            },
            {
                threshold: 0.3
            }
        );


    statsObserver.observe(statsSection);

}




/* ================================
   WHATSAPP BOOKING
================================ */

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* Get form values */

        const name =
            document.getElementById("customerName").value.trim();

        const phone =
            document.getElementById("customerPhone").value.trim();

        const service =
            document.getElementById("bookingService").value;

        const date =
            document.getElementById("bookingDate").value;

        const time =
            document.getElementById("bookingTime").value;

        const message =
            document.getElementById("bookingMessage").value.trim();


        /* YoungCut WhatsApp number */

        const whatsappNumber =
            "2348000000000";


        /* Create WhatsApp message */

        let whatsappMessage =
`Hello YoungCut 👋

I would like to book an appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${date}
Preferred Time: ${time}`;


        if (message) {

            whatsappMessage +=
                `

Additional Message:
${message}`;

        }


        whatsappMessage +=
            `

Thank you.`;


        /* Encode message */

        const encodedMessage =
            encodeURIComponent(whatsappMessage);


        /* WhatsApp URL */

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


        /* Open WhatsApp */

        window.open(
            whatsappURL,
            "_blank"
        );

    });

}




/* ================================
   CUSTOMER TESTIMONIALS
================================ */


/* Get elements */

const reviewForm =
    document.getElementById("reviewForm");

const testimonialsGrid =
    document.getElementById("testimonialsGrid");


/* Default demo testimonials */

const defaultTestimonials = [

    {
        name: "Alex",
        service: "Barbering",
        rating: 5,
        text:
            "The fade was clean and exactly what I asked for. Great attention to detail."
    },

    {
        name: "Daniel",
        service: "Dreadlocks",
        rating: 5,
        text:
            "Really happy with my locs. The whole experience was professional."
    },

    {
        name: "Michael",
        service: "Tattoo",
        rating: 5,
        text:
            "The design came out exactly how I imagined it. Very clean work."
    }

];


/* Get saved reviews */

let testimonials =
    JSON.parse(
        localStorage.getItem("youngcutTestimonials")
    );


/* If there are no saved reviews */

if (!testimonials) {

    testimonials =
        defaultTestimonials;

}


/* ================================
   DISPLAY TESTIMONIALS
================================ */

function displayTestimonials() {

    if (!testimonialsGrid) return;


    testimonialsGrid.innerHTML = "";


    if (testimonials.length === 0) {

        testimonialsGrid.innerHTML = `
            <div class="empty-reviews">
                No reviews yet. Be the first to share your experience.
            </div>
        `;

        return;

    }


    testimonials.forEach(testimonial => {

        const card =
            document.createElement("article");

        card.className =
            "testimonial-card";


        /* Stars */

        const stars =
            "★".repeat(testimonial.rating) +
            "☆".repeat(5 - testimonial.rating);


        /* First letter */

        const firstLetter =
            testimonial.name
                .charAt(0)
                .toUpperCase();


        card.innerHTML = `

            <span class="testimonial-quote">
                “
            </span>

            <div class="testimonial-stars">
                ${stars}
            </div>

            <p class="testimonial-text">
                ${escapeHTML(testimonial.text)}
            </p>

            <div class="testimonial-author">

                <div class="testimonial-avatar">
                    ${escapeHTML(firstLetter)}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(testimonial.name)}
                    </strong>

                    <span>
                        ${escapeHTML(testimonial.service)}
                    </span>

                </div>

            </div>

        `;


        testimonialsGrid.appendChild(card);

    });

}


/* ================================
   ESCAPE HTML
================================ */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* Display existing reviews */

displayTestimonials();


/* ================================
   SUBMIT REVIEW
================================ */

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Get values */

            const name =
                document
                    .getElementById("reviewName")
                    .value
                    .trim();

            const service =
                document
                    .getElementById("reviewService")
                    .value;

            const rating =
                Number(
                    document.querySelector(
                        'input[name="rating"]:checked'
                    ).value
                );

            const text =
                document
                    .getElementById("reviewText")
                    .value
                    .trim();


            /* Create review */

            const newReview = {

                name: name,

                service: service,

                rating: rating,

                text: text

            };


            /* Add to beginning */

            testimonials.unshift(newReview);


            /* Save */

            localStorage.setItem(
                "youngcutTestimonials",
                JSON.stringify(testimonials)
            );


            /* Refresh testimonials */

            displayTestimonials();


            /* Reset form */

            reviewForm.reset();


            /* Scroll to testimonials */

            document
                .getElementById("reviews")
                .scrollIntoView({
                    behavior: "smooth"
                });


            /* Success message */

            alert(
                "Thank you! Your review has been added."
            );

        }
    );

}




/* =========================
   FOOTER YEAR
========================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}



/* =========================
   MOBILE SIDE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");


// Open menu
if (menuButton && mobileMenu && mobileMenuOverlay) {

    menuButton.addEventListener("click", function () {

        mobileMenu.classList.add("active");
        mobileMenuOverlay.classList.add("active");
        menuButton.classList.add("active");

        document.body.classList.add("menu-open");

    });

}


// Close menu
function closeMobileMenu() {

    if (mobileMenu) {
        mobileMenu.classList.remove("active");
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove("active");
    }

    if (menuButton) {
        menuButton.classList.remove("active");
    }

    document.body.classList.remove("menu-open");
}


// Close button
if (mobileMenuClose) {

    mobileMenuClose.addEventListener("click", function () {
        closeMobileMenu();
    });

}


// Click outside menu
if (mobileMenuOverlay) {

    mobileMenuOverlay.addEventListener("click", function () {
        closeMobileMenu();
    });

}


// Close after clicking a link
mobileNavLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        closeMobileMenu();
    });

});





/* =========================
   PORTFOLIO LIGHTBOX
========================= */

const portfolioItemsForLightbox =
    document.querySelectorAll(".portfolio-item");

const portfolioLightbox =
    document.getElementById("portfolioLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const lightboxClose =
    document.getElementById("lightboxClose");


/* Open Lightbox */

portfolioItemsForLightbox.forEach(item => {

    const image = item.querySelector("img");
    const title = item.querySelector("h3");
    const category = item.querySelector(
        ".portfolio-overlay span"
    );

    const viewButton = item.querySelector(".view-work");


    function openLightbox(event) {

        event.stopPropagation();

        if (!portfolioLightbox || !lightboxImage) {
            return;
        }

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        if (lightboxTitle) {
            lightboxTitle.textContent =
                title ? title.textContent : "YoungCut Work";
        }

        if (lightboxCategory) {
            lightboxCategory.textContent =
                category
                    ? category.textContent
                    : "PORTFOLIO";
        }

        portfolioLightbox.classList.add("active");

        document.body.classList.add("menu-open");
    }


    if (viewButton) {
        viewButton.addEventListener(
            "click",
            openLightbox
        );
    }

});


/* Close Lightbox */

function closeLightbox() {

    if (portfolioLightbox) {
        portfolioLightbox.classList.remove("active");
    }

    document.body.classList.remove("menu-open");
}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/* Close by clicking outside image */

if (portfolioLightbox) {

    portfolioLightbox.addEventListener(
        "click",
        function (event) {

            if (event.target === portfolioLightbox) {
                closeLightbox();
            }

        }
    );

}


/* Close with Escape key */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeLightbox();
        }

    }
);











/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".service-card, " +
    ".portfolio-item, " +
    ".price-card, " +
    ".about-image, " +
    ".about-content, " +
    ".stat-item, " +
    ".booking-info, " +
    ".booking-form-wrapper, " +
    ".testimonial-card, " +
    ".review-container, " +
    ".contact-card, " +
    ".hours-card"
);


revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});







/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const desktopNavLinks = document.querySelectorAll(
    ".navbar a"
);


const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const currentSection =
                entry.target.getAttribute("id");


            desktopNavLinks.forEach(link => {

                link.classList.remove("active");

                const linkTarget =
                    link.getAttribute("href");

                if (linkTarget === `#${currentSection}`) {
                    link.classList.add("active");
                }

            });

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach(section => {

    sectionObserver.observe(section);

});