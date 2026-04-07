// ===========================
// Typing Effect
// ===========================
const roles = ["Software Developer", "Full-Stack Engineer", "Problem Solver", "AI Enthusiast"];
const typedEl = document.getElementById("typed-role");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; typeRole(); }, 2000);
      return;
    }
    setTimeout(typeRole, 90);
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 400);
      return;
    }
    setTimeout(typeRole, 50);
  }
}

typeRole();

// ===========================
// Background Starfield Canvas
// ===========================
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      alphaSpeed: Math.random() * 0.015 + 0.003,
      alphaDir: 1,
    });
  }
}

function createShootingStar() {
  if (Math.random() > 0.003) return;
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    length: Math.random() * 80 + 40,
    speed: Math.random() * 8 + 6,
    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
    alpha: 1,
    life: 0,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Subtle nebula gradient
  const nebula = ctx.createRadialGradient(
    canvas.width * 0.3, canvas.height * 0.4, 0,
    canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.5
  );
  nebula.addColorStop(0, "rgba(124, 91, 245, 0.03)");
  nebula.addColorStop(0.5, "rgba(0, 212, 255, 0.015)");
  nebula.addColorStop(1, "transparent");
  ctx.fillStyle = nebula;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Stars
  for (const star of stars) {
    star.alpha += star.alphaSpeed * star.alphaDir;
    if (star.alpha >= 1 || star.alpha <= 0.1) star.alphaDir *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230, 230, 255, ${star.alpha})`;
    ctx.fill();
  }

  // Shooting stars
  createShootingStar();
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.alpha -= 0.015;
    s.life++;

    const tailX = s.x - Math.cos(s.angle) * s.length;
    const tailY = s.y - Math.sin(s.angle) * s.length;

    const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, `rgba(200, 200, 255, ${s.alpha})`);

    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(s.x, s.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (s.alpha <= 0) shootingStars.splice(i, 1);
  }

  requestAnimationFrame(drawStars);
}

resizeCanvas();
createStars(200);
drawStars();
window.addEventListener("resize", () => { resizeCanvas(); createStars(200); });

// ===========================
// Scroll Progress
// ===========================
const scrollProgress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + "%";
});

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("navbar--scrolled", window.scrollY > 50);
});

// ===========================
// Mobile Navigation
// ===========================
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".navbar__link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===========================
// Active Nav Link on Scroll
// ===========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar__link[data-nav]");

function updateActiveNav() {
  const scrollY = window.scrollY + 200;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// ===========================
// Scroll Reveal
// ===========================
const revealElements = document.querySelectorAll(
  ".section__container, .about__grid, .skills__category, .project-card, .cert-card, .timeline-item, .contact__form, .contact__info"
);

revealElements.forEach((el) => el.classList.add("scroll-reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===========================
// Skill Bar Animation
// ===========================
const skillBars = document.querySelectorAll(".skill-bar");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute("data-level");
        bar.querySelector(".skill-bar__fill").style.setProperty("--level", level + "%");
        bar.classList.add("animate");
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// ===========================
// Project Filters
// ===========================
const filterBtns = document.querySelectorAll(".projects__filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterBtns.forEach((b) => b.classList.remove("projects__filter-btn--active"));
    btn.classList.add("projects__filter-btn--active");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "All" || category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "reveal-up 0.5s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ===========================
// Contact Form
// ===========================
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("contact-message").value;

  // Create mailto link as fallback
  const mailtoLink = `mailto:raipranav2987@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.open(mailtoLink);

  // Show success feedback
  const btn = contactForm.querySelector("button[type='submit']");
  const originalHTML = btn.innerHTML;
  btn.innerHTML = "✓ Message Ready!";
  btn.style.background = "linear-gradient(135deg, #28c840, #00d4ff)";

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = "";
    contactForm.reset();
  }, 3000);
});

// ===========================
// Smooth Scroll for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
