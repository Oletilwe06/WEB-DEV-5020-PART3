!

/* OLE Foundation - JavaScript
   Adds interactivity, search, gallery lightbox and form validation.
*/

document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile navigation toggle
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            const isExpanded =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute("aria-expanded", String(!isExpanded));
            navigation.classList.toggle("nav-open");
        });
    }

    // 2. Accordion functionality
    document.querySelectorAll(".accordion-button").forEach(function (button) {
        button.addEventListener("click", function () {
            const panel = button.nextElementSibling;
            const isOpen = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isOpen));

            if (panel) {
                panel.hidden = isOpen;
            }
        });
    });

    // 3. Search and filter services or other cards
    const searchInput = document.querySelector("#siteSearch");
    const searchableItems = document.querySelectorAll("[data-searchable]");
    const noResults = document.querySelector("#noResults");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.trim().toLowerCase();
            let visibleCount = 0;

            searchableItems.forEach(function (item) {
                const text = item.textContent.toLowerCase();
                const matches = text.includes(searchTerm);

                item.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }
            });

            if (noResults) {
                noResults.hidden = visibleCount !== 0;
            }
        });
    }

    // 4. Gallery lightbox
    const lightbox = document.querySelector("#galleryLightbox");
    const lightboxImage = document.querySelector("#lightboxImage");
    const closeLightbox = document.querySelector("#closeLightbox");

    document.querySelectorAll(".gallery-image").forEach(function (image) {
        image.addEventListener("click", function () {
            if (!lightbox || !lightboxImage) return;

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt || "Enlarged gallery photograph";
            lightbox.hidden = false;

            if (closeLightbox) {
                closeLightbox.focus();
            }
        });
    });

    function hideLightbox() {
        if (lightbox) {
            lightbox.hidden = true;
        }
    }

    if (closeLightbox) {
        closeLightbox.addEventListener("click", hideLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                hideLightbox();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            hideLightbox();
        }
    });

    // 5. Validate enquiry and contact forms
    document.querySelectorAll(".js-validated-form").forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const status = form.querySelector(".form-status");
            const email = form.querySelector('input[type="email"]');
            const requiredFields = form.querySelectorAll("[required]");
            let valid = true;
            let firstInvalidField = null;

            requiredFields.forEach(function (field) {
                field.setCustomValidity("");

                if (!field.value.trim()) {
                    field.setCustomValidity("Please complete this field.");
                } else if (
                    field.type === "email" &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())
                ) {
                    field.setCustomValidity("Please enter a valid email address.");
                }

                if (!field.checkValidity()) {
                    valid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                }
            });

            if (!valid) {
                if (status) {
                    status.textContent =
                        "Please correct the highlighted fields before submitting.";
                }

                form.reportValidity();

                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                return;
            }

            if (status) {
                status.textContent =
                    "Your form has passed validation. This demonstration does not send your details to a server.";
            }

            // A backend or form service is needed to receive submissions.
        });
    });

    // 6. Dynamic current year in the footer
    document.querySelectorAll(".current-year").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // 7. Simple back-to-top button
    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
