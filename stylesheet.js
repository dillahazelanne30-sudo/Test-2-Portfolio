document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       MOBILE MENU
    ========================= */

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (navbar && navLinks) {
        const menuButton = document.createElement("button");

        menuButton.classList.add("menu-button");
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");

        navbar.insertBefore(menuButton, navLinks);

        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("show");

            if (navLinks.classList.contains("show")) {
                menuButton.innerHTML = "✕";
            } else {
                menuButton.innerHTML = "☰";
            }
        });

        // Close the menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                menuButton.innerHTML = "☰";
            });
        });
    }


    /* =========================
       ACTIVE NAVIGATION LINK
    ========================= */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });


    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */

    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Show elements normally if IntersectionObserver is unsupported
        animatedElements.forEach(element => {
            element.classList.add("show");
        });
    }


    /* =========================
       PROJECT FILTERS
    ========================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length && projectCards.length) {
        function filterProjects(selectedFilter) {
            projectCards.forEach(card => {
                const category = card.dataset.category;

                // "all" shows every project.
                // Each person filter shows only that person's projects.
                // "shared" shows only shared projects.
                const shouldShow =
                    selectedFilter === "all" ||
                    category === selectedFilter;

                card.classList.toggle("hidden", !shouldShow);
            });
        }

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const selectedFilter = button.dataset.filter;

                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                filterProjects(selectedFilter);
            });
        });

        // Show all projects when the Projects page first opens.
        filterProjects("all");
    }


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            const name = document.querySelector("#name")?.value.trim();
            const email = document.querySelector("#email")?.value.trim();
            const message = document.querySelector("#message")?.value.trim();

            if (!name || !email || !message) {
                alert("Please complete all fields before submitting.");
                return;
            }

            alert(
                `Thank you, ${name}! Your message form is ready, ` +
                `but it is not connected to an email service yet.`
            );

            contactForm.reset();
        });
    }


    /* =========================
       FOOTER YEAR
    ========================= */

    const footerYear = document.querySelector("footer p");

    if (footerYear) {
        footerYear.innerHTML = `© ${new Date().getFullYear()} Two Minds Portfolio. All rights reserved.`;
    }
});