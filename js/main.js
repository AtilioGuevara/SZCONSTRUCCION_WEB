document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initHeroAnimation();
    initHeroVideo();
    initProjectSlider();
    initServiceSliders();
    initLightbox();
    initProjectFooters();
    initContactForm();
    initSiteLinks();
    initProjectFilters();
});

// Mantiene el menú compacto fuera del flujo principal en pantallas pequeñas.
function initNavigation() {
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".nav");

    if (!menuButton || !navigation) return;

    const setOpen = (isOpen) => {
        navigation.classList.toggle("nav--open", isOpen);
        menuButton.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    };

    menuButton.addEventListener("click", () => {
        setOpen(!navigation.classList.contains("nav--open"));
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !navigation.classList.contains("nav--open")) return;
        setOpen(false);
        menuButton.focus();
    });

    document.addEventListener("click", (event) => {
        if (!navigation.classList.contains("nav--open")) return;
        if (navigation.contains(event.target) || menuButton.contains(event.target)) return;
        setOpen(false);
    });
}

function initSiteLinks() {
    document.querySelectorAll('a[href*="servicio"]').forEach((link) => link.remove());

    document.querySelectorAll(".footer__socials").forEach((socials) => {
        const emailLink = socials.querySelector('a[href^="mailto:"]');
        emailLink?.remove();

        const links = [...socials.querySelectorAll(".footer__social")];
        links.slice(4).forEach((link) => link.remove());
        const normalizedLinks = socials.querySelectorAll(".footer__social");
        if (normalizedLinks.length < 4) return;

        const imagePath = window.location.pathname.includes("/proyectos/") ? "../images/social/" : "images/social/";
        const contacts = [
            ["https://www.facebook.com/szconstrucion", "Facebook", "Facebook", "LogoFace.png"],
            ["https://www.instagram.com/sz_construccion?stkn=ZDNlZDc0MzIxNw==", "Instagram", "Instagram", "LogoInsta.png"],
            ["https://www.tiktok.com/@sz_construccionsv?is_from_webapp=1&sender_device=pc", "TikTok", "TikTok", "LogoTikTok.png"],
            ["https://wa.me/50374683677", "WhatsApp", "WhatsApp", "LogoWha.png"]
        ];

        normalizedLinks.forEach((link, index) => {
            const [href, label, text, icon] = contacts[index];
            link.href = href;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.setAttribute("aria-label", label);
            link.innerHTML = icon ? `<img src="${imagePath}${icon}" alt="">${text}` : text;
        });
    });
}

function initProjectFooters() {
    if (!window.location.pathname.includes("/proyectos/")) return;

    let footer = document.querySelector(".footer");
    const imagePath = "../images/social/";
    const brandPath = "../images/brand/";
    const navigationMarkup = `
        <nav class="footer__nav" aria-label="Navegacion del pie de pagina">
            <a href="../index.html">Inicio</a>
            <a href="../nosotros.html">Nosotros</a>
            <a href="../proyectos.html">Proyectos</a>
            <a href="../index.html#contacto">Contacto</a>
        </nav>`;
    const socialMarkup = `
        <div class="footer__socials" aria-label="Redes sociales">
            <a href="https://www.facebook.com/szconstrucion" class="footer__social" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="${imagePath}LogoFace.png" alt="">Facebook</a>
            <a href="https://www.instagram.com/sz_construccion?stkn=ZDNlZDc0MzIxNw==" class="footer__social" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="${imagePath}LogoInsta.png" alt="">Instagram</a>
            <a href="https://www.tiktok.com/@sz_construccionsv?is_from_webapp=1&amp;sender_device=pc" class="footer__social" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><img src="${imagePath}LogoTikTok.png" alt="">TikTok</a>
            <a href="https://wa.me/50374683677" class="footer__social" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><img src="${imagePath}LogoWha.png" alt="">WhatsApp</a>
        </div>`;
    const contactMarkup = `
        <div class="footer__contact" id="contacto">
            <div class="footer__intro">
                <p class="footer__label">CONTACTO</p>
                <h2 class="footer__title">Hablemos de <span>tu proyecto.</span></h2>
                <p class="footer__description">Cuéntanos sobre tu proyecto y nos pondremos en contacto contigo.</p>
            </div>
            <form class="footer__form" id="contact-form">
                <div class="footer__field"><label for="contact-name">Nombre</label><input type="text" id="contact-name" name="name" placeholder="Nombre" required></div>
                <div class="footer__field"><label for="contact-email">Correo electrónico</label><input type="email" id="contact-email" name="email" placeholder="Correo electrónico" required></div>
                <div class="footer__field"><label for="contact-message">Mensaje</label><textarea id="contact-message" name="message" placeholder="Cuéntanos sobre tu proyecto" required></textarea></div>
                <button type="submit" class="footer__submit">Enviar consulta <span>→</span></button>
            </form>
        </div>`;

    if (!footer) {
        footer = document.createElement("footer");
        footer.className = "footer";
        footer.innerHTML = `
            <div class="container">
                <div class="footer__top">
                    <div class="footer__brand">
                        <a href="../index.html" class="footer__logo" aria-label="SZ Construcción, inicio"><img src="${brandPath}logo-mark-transparent.png" alt=""><span>SZ CONSTRUCCIÓN</span></a>
                        ${navigationMarkup}
                        <p class="footer__brand-text">Construimos espacios con precisión, experiencia y visión.</p>
                        ${socialMarkup}
                    </div>
                    ${contactMarkup}
                </div>
                <div class="footer__bottom"><p class="footer__copyright">© 2026 SZ Construcción. Todos los derechos reservados.</p></div>
            </div>`;
        document.body.append(footer);
    } else {
        if (!footer.querySelector(".footer__nav")) {
            footer.querySelector(".footer__brand")?.insertAdjacentHTML("beforeend", navigationMarkup);
        }

        if (!footer.querySelector(".footer__socials")) {
            footer.querySelector(".footer__brand")?.insertAdjacentHTML("beforeend", socialMarkup);
        }

        if (!footer.querySelector(".footer__contact")) {
            const container = footer.querySelector(".container");
            const brand = footer.querySelector(".footer__brand");
            const bottom = footer.querySelector(".footer__bottom");
            const top = document.createElement("div");
            top.className = "footer__top";
            if (brand) top.append(brand);
            top.insertAdjacentHTML("beforeend", contactMarkup);
            bottom ? container?.insertBefore(top, bottom) : container?.prepend(top);
        }
    }
}

// El movimiento inicial se omite cuando el sistema pide menos animación.
function initHeroAnimation() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heroElements = [
        document.querySelector(".hero__label"),
        document.querySelector(".hero__title"),
        document.querySelector(".hero__description"),
        document.querySelector(".hero__link")
    ];

    heroElements.forEach((element, index) => {
        if (!element) return;

        element.animate(
            [
                { opacity: 0, transform: "translateY(25px)" },
                { opacity: 1, transform: "translateY(0)" }
            ],
            {
                duration: 800,
                delay: index * 120,
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                fill: "forwards"
            }
        );
    });
}

// Respeta la preferencia de menos movimiento y evita reproducir el video si no se ve.
function initHeroVideo() {
    const video = document.querySelector(".hero__video-media");
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.removeAttribute("autoplay");
        video.pause();
        return;
    }

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, { threshold: 0.15 });

    observer.observe(video);
}

function initProjectSlider() {
    const slider = document.querySelector(".project-slider");
    if (slider) initSlider(slider, ".project-slide", ".project-slider__dot");
}

function initServiceSliders() {
    document.querySelectorAll(".service-slider").forEach((slider) => {
        initSlider(slider, ".service-slide", ".service-slider__dot");
    });
}

function initProjectFilters() {
    const filters = document.querySelectorAll(".project-filter");
    const projects = document.querySelectorAll(".project-card");
    const emptyMessage = document.querySelector(".projects-empty");

    if (!filters.length || !projects.length) return;

    const applyFilter = (selectedFilter) => {
        filters.forEach((item) => {
            const isActive = item.dataset.filter === selectedFilter;
            item.classList.toggle("is-active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        let visible = 0;

        projects.forEach((project) => {
            const matches = selectedFilter === "todos"
                || project.dataset.category === selectedFilter
                || project.dataset.status === selectedFilter;

            project.classList.toggle("is-hidden", !matches);
            if (matches) visible += 1;
        });

        if (emptyMessage) emptyMessage.hidden = visible > 0;
    };

    filters.forEach((filter) => {
        filter.addEventListener("click", () => {
            applyFilter(filter.dataset.filter);
            const url = new URL(window.location.href);
            if (filter.dataset.filter === "todos") {
                url.searchParams.delete("filtro");
            } else {
                url.searchParams.set("filtro", filter.dataset.filter);
            }
            window.history.replaceState(null, "", url);
        });
    });

    // Permite compartir el catálogo ya filtrado, por ejemplo proyectos.html?filtro=comercial
    const initialFilter = new URLSearchParams(window.location.search).get("filtro");
    if (initialFilter && [...filters].some((filter) => filter.dataset.filter === initialFilter)) {
        applyFilter(initialFilter);
    }
}

function initLightbox() {
    const galleryImages = document.querySelectorAll(".project-slider .project-slide img");
    if (!galleryImages.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Galería ampliada");
    lightbox.innerHTML = `
        <button class="lightbox__close" type="button" aria-label="Cerrar galería">×</button>
        <button class="lightbox__arrow lightbox__arrow--prev" type="button" aria-label="Imagen anterior">←</button>
        <figure class="lightbox__figure">
            <img class="lightbox__image" alt="">
            <figcaption class="lightbox__caption"></figcaption>
        </figure>
        <button class="lightbox__arrow lightbox__arrow--next" type="button" aria-label="Imagen siguiente">→</button>
    `;
    document.body.append(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox__image");
    const caption = lightbox.querySelector(".lightbox__caption");
    const closeButton = lightbox.querySelector(".lightbox__close");
    const previousButton = lightbox.querySelector(".lightbox__arrow--prev");
    const nextButton = lightbox.querySelector(".lightbox__arrow--next");
    let currentImage = 0;
    let lastFocus = null;

    const showImage = (index) => {
        currentImage = (index + galleryImages.length) % galleryImages.length;
        const source = galleryImages[currentImage];
        lightboxImage.src = source.currentSrc || source.src;
        lightboxImage.alt = source.alt;
        caption.textContent = `${source.alt} · ${currentImage + 1} / ${galleryImages.length}`;
    };

    const openLightbox = (index) => {
        lastFocus = document.activeElement;
        showImage(index);
        lightbox.classList.add("is-open");
        document.body.classList.add("lightbox-open");
        closeButton.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
        lastFocus?.focus();
    };

    galleryImages.forEach((image, index) => {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", `Ampliar: ${image.alt}`);
        image.addEventListener("click", () => {
            if (image.closest(".project-slider")?.dataset.dragged === "true") return;
            openLightbox(index);
        });
        image.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(index);
            }
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", () => showImage(currentImage - 1));
    nextButton.addEventListener("click", () => showImage(currentImage + 1));
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    addSwipe(lightbox, () => showImage(currentImage + 1), () => showImage(currentImage - 1));

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("is-open")) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showImage(currentImage - 1);
        if (event.key === "ArrowRight") showImage(currentImage + 1);
        // Mantiene el foco dentro del diálogo.
        if (event.key === "Tab") {
            const focusable = [closeButton, previousButton, nextButton];
            const position = focusable.indexOf(document.activeElement);
            event.preventDefault();
            const next = event.shiftKey ? position - 1 : position + 1;
            focusable[(next + focusable.length) % focusable.length].focus();
        }
    });
}

// Deslizar con el dedo en pantallas táctiles.
function addSwipe(element, onNext, onPrevious) {
    let startX = 0;
    let startY = 0;

    element.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }, { passive: true });

    element.addEventListener("touchend", (event) => {
        const deltaX = event.changedTouches[0].clientX - startX;
        const deltaY = event.changedTouches[0].clientY - startY;
        if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;
        element.dataset.dragged = "true";
        setTimeout(() => { element.dataset.dragged = "false"; }, 350);
        if (deltaX < 0) onNext(); else onPrevious();
    }, { passive: true });
}

function initSlider(slider, slideSelector, dotSelector) {
    const slides = slider.querySelectorAll(slideSelector);
    let dots = slider.querySelectorAll(dotSelector);
    const dotsContainer = slider.querySelector(".project-slider__dots");
    const previousButton = slider.querySelector("[class*='arrow--prev']");
    const nextButton = slider.querySelector("[class*='arrow--next']");

    if (!slides.length) return;

    if (dotsContainer && dots.length < slides.length) {
        for (let index = dots.length; index < slides.length; index += 1) {
            const dot = document.createElement("button");
            dot.className = dotSelector.replace(".", "");
            dot.type = "button";
            dot.setAttribute("aria-label", `Ver fotografía ${index + 1}`);
            dotsContainer.append(dot);
        }

        dots = slider.querySelectorAll(dotSelector);
    }

    if (slides.length < 2) {
        previousButton?.setAttribute("hidden", "");
        nextButton?.setAttribute("hidden", "");
    }

    const counter = slider.closest(".project-gallery")?.querySelector(".project-gallery__counter");

    let currentSlide = 0;

    const showSlide = (index) => {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === currentSlide;
            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
            slide.querySelector("img")?.setAttribute("tabindex", isActive ? "0" : "-1");
        });

        // Precarga la siguiente fotografía para que el cambio sea inmediato.
        const upcoming = slides[(currentSlide + 1) % slides.length]?.querySelector("img");
        if (upcoming) upcoming.loading = "eager";

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentSlide;
            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", isActive ? "true" : "false");
        });

        if (counter) {
            counter.textContent = `${String(currentSlide + 1).padStart(2, "0")} — ${String(slides.length).padStart(2, "0")}`;
        }
    };

    nextButton?.addEventListener("click", () => showSlide(currentSlide + 1));
    previousButton?.addEventListener("click", () => showSlide(currentSlide - 1));

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => showSlide(index));
    });

    slider.addEventListener("keydown", (event) => {
        if (document.body.classList.contains("lightbox-open")) return;
        if (event.key === "ArrowRight") showSlide(currentSlide + 1);
        if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
    });

    addSwipe(slider, () => showSlide(currentSlide + 1), () => showSlide(currentSlide - 1));

    showSlide(0);
}

// Envía el formulario mediante FormSubmit y muestra mensajes claros en cada campo.
function initContactForm() {
    const contactForm = document.querySelector("#contact-form");
    if (!contactForm) return;

    const submitButton = contactForm.querySelector(".footer__submit");
    const submitLabel = submitButton?.innerHTML;
    const status = document.createElement("p");
    status.className = "footer__form-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    contactForm.append(status);

    const messages = {
        name: "Escribe tu nombre.",
        email: "Escribe un correo válido, por ejemplo nombre@correo.com.",
        message: "Cuéntanos brevemente sobre tu proyecto (mínimo 10 caracteres)."
    };

    const fields = [...contactForm.querySelectorAll("input[required], textarea[required]")];

    const validateField = (field) => {
        const value = field.value.trim();
        let valid = field.checkValidity() && value.length > 0;
        if (field.name === "message" && value.length < 10) valid = false;

        const wrapper = field.closest(".footer__field");
        let error = wrapper.querySelector(".footer__error");

        if (!valid) {
            if (!error) {
                error = document.createElement("p");
                error.className = "footer__error";
                error.id = `${field.id}-error`;
                wrapper.append(error);
            }
            error.textContent = messages[field.name] || "Revisa este campo.";
            field.setAttribute("aria-invalid", "true");
            field.setAttribute("aria-describedby", error.id);
        } else {
            error?.remove();
            field.removeAttribute("aria-invalid");
            field.removeAttribute("aria-describedby");
        }

        return valid;
    };

    fields.forEach((field) => {
        field.addEventListener("blur", () => {
            if (field.value.trim()) validateField(field);
        });
        field.addEventListener("input", () => {
            if (field.getAttribute("aria-invalid") === "true") validateField(field);
        });
    });

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const results = fields.map(validateField);
        if (results.includes(false)) {
            fields[results.indexOf(false)].focus();
            status.textContent = "Revisa los campos marcados.";
            status.classList.add("is-error");
            return;
        }

        const formData = new FormData(contactForm);

        // Campo trampa: los robots lo llenan, las personas no lo ven.
        if (formData.get("_honey")) return;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = "Enviando… <span>→</span>";
        }
        status.textContent = "Enviando mensaje...";
        status.classList.remove("is-error", "is-success");

        try {
            const response = await fetch("https://formsubmit.co/ajax/szconstruccion20@gmail.com", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.get("name").trim(),
                    email: formData.get("email").trim(),
                    message: formData.get("message").trim(),
                    pagina: document.title,
                    _subject: "Consulta desde el sitio web",
                    _replyto: formData.get("email").trim(),
                    _captcha: "false"
                })
            });

            if (!response.ok) throw new Error("No se pudo enviar el mensaje");

            contactForm.reset();
            status.textContent = "Mensaje enviado. Te responderemos pronto.";
            status.classList.add("is-success");
        } catch (error) {
            status.innerHTML = 'No se pudo enviar. Intenta de nuevo o escríbenos por <a href="https://wa.me/50374683677" target="_blank" rel="noopener noreferrer">WhatsApp</a>.';
            status.classList.add("is-error");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = submitLabel;
            }
        }
    });
}
