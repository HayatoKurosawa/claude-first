/* ============================================
   OUR MIND - Main JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // --- Header scroll effect ---
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("open");
  });

  // Close menu on link click
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      nav.classList.remove("open");
    });
  });

  // --- Scroll animations (fade-in) ---
  const animateTargets = document.querySelectorAll(
    ".service-card, .about-text, .about-stats, .company-table, .contact-form, .stat"
  );

  animateTargets.forEach((el) => el.classList.add("fade-in"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  animateTargets.forEach((el) => observer.observe(el));

  // --- Counter animation ---
  const counters = document.querySelectorAll(".stat-number[data-target]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  function animateCounter(el, target) {
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const headerHeight = header.offsetHeight;
        const targetPosition =
          targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // --- Contact form ---
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".btn-submit");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "送信しました";
    submitBtn.style.background = "#10b981";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
});
