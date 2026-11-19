/* ==========================================================================
   Brew & Bean — main.js
   Vanilla JavaScript, no dependencies.
   1. Config
   2. Sticky header
   3. Mobile navigation
   4. Smooth scrolling + active link
   5. WhatsApp buttons
   6. Gallery lightbox
   7. Contact form validation (demo mode / Formspree ready)
   8. Scroll reveal + footer year
   ========================================================================== */

(function () {
  "use strict";

  /* 1. Config — the only place you edit the WhatsApp number ---------------- */
  const CONFIG = {
    // Digits only, with country code, no "+", spaces or dashes.
    whatsappNumber: "91000000000",
    whatsappMessage:
      "Hello Brew & Bean! I found your website and would like to know more about the café.",
  };

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  /* 2. Sticky header shadow ------------------------------------------------ */
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  };

  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* 3. Mobile navigation --------------------------------------------------- */
  function setNav(open) {
    body.classList.toggle("nav-open", open);
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }

  function closeNav() {
    if (body.classList.contains("nav-open")) setNav(false);
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      setNav(!body.classList.contains("nav-open"));
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  // Close the mobile menu after a breakpoint change or an outside click.
  const desktopQuery = window.matchMedia("(min-width: 900px)");
  const onBreakpointChange = () => {
    if (desktopQuery.matches) closeNav();
  };
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener("change", onBreakpointChange);
  }

  document.addEventListener("click", (event) => {
    if (!body.classList.contains("nav-open")) return;
    const clickedInsidePanel = event.target.closest("[data-nav-panel]");
    const clickedToggle = event.target.closest("[data-nav-toggle]");
    if (!clickedInsidePanel && !clickedToggle) closeNav();
  });

  /* 4. Smooth scrolling + active navigation link --------------------------- */
  function scrollToHash(hash) {
    if (!hash || hash === "#") return false;
    const target = document.querySelector(hash);
    if (!target) return false;
    target.scrollIntoView({
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });
    return true;
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    if (link.hasAttribute("data-placeholder")) {
      // Social profile placeholder: no real profile is linked yet.
      event.preventDefault();
      return;
    }

    const hash = link.getAttribute("href");
    if (hash === "#") {
      event.preventDefault();
      return;
    }

    if (scrollToHash(hash)) {
      event.preventDefault();
      closeNav();
      if (history.replaceState) history.replaceState(null, "", hash);
    }
  });

  const navSections = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      const section = id && id.startsWith("#") ? document.querySelector(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  function updateActiveLink() {
    if (!navSections.length) return;
    const offset = window.scrollY + 140;
    let current = navSections[0];

    navSections.forEach((entry) => {
      if (entry.section.offsetTop <= offset) current = entry;
    });

    // At the very bottom of the page, highlight the last section.
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4
    ) {
      current = navSections[navSections.length - 1];
    }

    navSections.forEach(({ link }) =>
      link.classList.toggle("is-active", link === current.link)
    );
  }

  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        updateActiveLink();
        scrollTicking = false;
      });
    },
    { passive: true }
  );
  updateActiveLink();

  /* 5. WhatsApp buttons ---------------------------------------------------- */
  const whatsappNumber = String(CONFIG.whatsappNumber).replace(/\D/g, "");
  const whatsappHref =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(CONFIG.whatsappMessage);

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.setAttribute("href", whatsappHref);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  /* 6. Gallery lightbox ---------------------------------------------------- */
  const galleryButtons = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.querySelector("#lightbox");

  if (lightbox && galleryButtons.length) {
    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector("[data-lightbox-close]");
    const prevButton = lightbox.querySelector("[data-lightbox-prev]");
    const nextButton = lightbox.querySelector("[data-lightbox-next]");
    let currentIndex = 0;
    let lastFocused = null;

    function renderSlide(index) {
      const button = galleryButtons[index];
      const image = button.querySelector("img");
      const caption =
        button.getAttribute("data-caption") ||
        (image ? image.getAttribute("alt") : "");

      lightboxImage.src = button.getAttribute("data-full") || image.src;
      lightboxImage.alt = image ? image.getAttribute("alt") : caption;
      lightboxCaption.textContent = caption;
      currentIndex = index;
    }

    function openLightbox(index) {
      lastFocused = document.activeElement;
      renderSlide(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";
      if (closeButton) closeButton.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      body.style.overflow = "";
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    function showSlide(step) {
      const total = galleryButtons.length;
      renderSlide((currentIndex + step + total) % total);
    }

    galleryButtons.forEach((button, index) => {
      button.addEventListener("click", () => openLightbox(index));
    });

    if (closeButton) closeButton.addEventListener("click", closeLightbox);
    if (prevButton) prevButton.addEventListener("click", () => showSlide(-1));
    if (nextButton) nextButton.addEventListener("click", () => showSlide(1));

    // Click on the dark backdrop (but not on the image or buttons) closes it.
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        showSlide(1);
      } else if (event.key === "ArrowLeft") {
        showSlide(-1);
      } else if (event.key === "Tab") {
        // Keep keyboard focus inside the dialog while it is open.
        const focusables = [closeButton, prevButton, nextButton].filter(Boolean);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* 7. Contact form validation -------------------------------------------- */
  const form = document.querySelector("#contactForm");

  if (form) {
    const statusBox = form.querySelector("[data-form-status]");
    const submitButton = form.querySelector('button[type="submit"]');
    const submitLabel = submitButton ? submitButton.innerHTML : "";
    let hasSubmitted = false;

    const rules = {
      name: (value) =>
        value.trim().length >= 2
          ? ""
          : "Please enter your name (at least 2 characters).",
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim())
          ? ""
          : "Please enter a valid email address, for example name@example.com.",
      phone: (value) =>
        value.trim() === "" || /^\+?[\d\s\-()]{7,18}$/.test(value.trim())
          ? ""
          : "Please use digits only, with an optional + and spaces.",
      message: (value) =>
        value.trim().length >= 10
          ? ""
          : "Please tell us a little more (at least 10 characters).",
    };

    const fields = Array.from(form.querySelectorAll("[data-validate]"));

    function errorHolderFor(field) {
      return form.querySelector('[data-error-for="' + field.name + '"]');
    }

    function validateField(field) {
      const rule = rules[field.name];
      if (!rule) return true;

      const message = rule(field.value);
      const holder = errorHolderFor(field);

      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (holder) holder.textContent = message;
      return !message;
    }

    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (hasSubmitted && field.getAttribute("aria-invalid") === "true") {
          validateField(field);
        }
      });
    });

    function showStatus(message, isError) {
      if (!statusBox) return;
      statusBox.textContent = message;
      statusBox.classList.toggle("is-error", Boolean(isError));
      statusBox.classList.add("is-visible");
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      hasSubmitted = true;

      const invalidFields = fields.filter((field) => !validateField(field));

      if (invalidFields.length) {
        showStatus(
          "Please check the highlighted fields and try again.",
          true
        );
        const firstInvalid = invalidFields[0];
        firstInvalid.focus();
        firstInvalid.scrollIntoView({
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
          block: "center",
        });
        return;
      }

      const name = form.elements.name.value.trim().split(" ")[0];
      const endpoint = form.getAttribute("data-endpoint");

      // Demo mode: no backend is configured, so nothing is sent anywhere.
      if (!endpoint) {
        showStatus(
          "Thank you, " +
            name +
            "! Your details look good — but this is a demo form, so nothing was sent or stored. Call or email us to reach the café, or connect Formspree to receive enquiries (see README).",
          false
        );
        form.reset();
        hasSubmitted = false;
        fields.forEach((field) => {
          field.setAttribute("aria-invalid", "false");
          const holder = errorHolderFor(field);
          if (holder) holder.textContent = "";
        });
        return;
      }

      // Live mode: submit to a real endpoint such as Formspree.
      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending…";
        }

        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Request failed");

        showStatus(
          "Thank you, " + name + "! Your message has been sent — we will reply soon.",
          false
        );
        form.reset();
        hasSubmitted = false;
      } catch (error) {
        showStatus(
          "Sorry, your message could not be sent right now. Please call, WhatsApp or email us instead.",
          true
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = submitLabel;
        }
      }
    });
  }

  /* 8. Scroll reveal + footer year ---------------------------------------- */
  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
