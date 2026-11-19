/* ==========================================================================
   AuraBand — Interaction Script
   ========================================================================== */

(function () {
  "use strict";

  // --- Theme / High Contrast Toggle ---
  const themeToggle = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem("auraband-high-contrast");
  if (saved === "true") {
    htmlEl.classList.add("high-contrast");
    themeToggle.classList.add("active");
    themeToggle.textContent = "Normal Contrast";
  }

  themeToggle.addEventListener("click", function () {
    const isOn = htmlEl.classList.toggle("high-contrast");
    localStorage.setItem("auraband-high-contrast", isOn);
    themeToggle.classList.toggle("active", isOn);
    themeToggle.textContent = isOn ? "Normal Contrast" : "High Contrast";
  });

  // --- Mobile Menu Toggle ---
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
      mobileMenu.classList.toggle("open");
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
      });
    });
  }

  // --- Contact Form Demo ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = "Sending…";
      btn.disabled = true;

      // Simulate a send (demo only — no backend)
      setTimeout(function () {
        btn.textContent = "Message Sent!";
        btn.style.background = "#22c55e";
        contactForm.reset();

        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 2000);
      }, 1200);
    });
  }

  // --- Reveal Animation for Step Cards ---
  const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -60px 0px" };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".step-card, .feature-card, .story-card, .involve-card").forEach(function (card) {
    card.classList.add("reveal");
    observer.observe(card);
  });

  // --- FAQ Accordion ---
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answer = btn.nextElementSibling;
      const toggle = btn.querySelector(".faq-toggle");

      // Close all other FAQ items
      document.querySelectorAll(".faq-question").forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          otherBtn.querySelector(".faq-toggle").textContent = "+";
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.style.maxHeight = "0";
            otherBtn.nextElementSibling.style.padding = "0 1.25rem";
          }
        }
      });

      // Toggle current
      btn.setAttribute("aria-expanded", !expanded);
      toggle.textContent = expanded ? "+" : "×";
      if (answer) {
        if (!expanded) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          answer.style.padding = "0 1.25rem 1.25rem";
        } else {
          answer.style.maxHeight = "0";
          answer.style.padding = "0 1.25rem";
        }
      }
    });
  });

  // --- Newsletter Form ---
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const btn = newsletterForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "Joining…";
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = "Joined!";
        btn.style.background = "#22c55e";
        newsletterForm.reset();
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 2000);
      }, 1200);
    });
  }

  // --- Offer Banner Close ---
  const offerBanner = document.getElementById("offer-banner");
  const closeBtn = document.querySelector(".btn-offer-close");
  if (offerBanner && closeBtn) {
    closeBtn.addEventListener("click", function () {
      offerBanner.style.display = "none";
    });
  }
})();