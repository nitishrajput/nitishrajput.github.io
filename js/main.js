// ── Theme Toggle ──
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('nk-theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('nk-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ── Mobile Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ── Nav shadow on scroll ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.boxShadow = window.scrollY > 60
    ? '0 4px 40px rgba(0,0,0,0.35)'
    : 'none';
});

// ── Scroll Animations (Intersection Observer) ──
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Stagger siblings for a cascade effect
    const parent = entry.target.parentElement;
    const siblings = parent ? Array.from(parent.querySelectorAll('.fade-up:not(.visible)')) : [];
    const idx = siblings.indexOf(entry.target);

    setTimeout(() => {
      entry.target.classList.add('visible');
    }, Math.max(0, idx) * 90);

    observer.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ── Typewriter Effect ──
const roles = [
  'Site Reliability Engineer',
  'DevOps Engineer',
  'Cloud Architect',
  'Platform Engineer',
  'AI Enthusiast',
];

let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  const word = roles[roleIdx];

  if (deleting) {
    typeEl.textContent = word.slice(0, charIdx - 1);
    charIdx--;
  } else {
    typeEl.textContent = word.slice(0, charIdx + 1);
    charIdx++;
  }

  if (!deleting && charIdx === word.length) {
    setTimeout(() => { deleting = true; }, 2200);
  } else if (deleting && charIdx === 0) {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
  }

  setTimeout(typeWriter, deleting ? 55 : 110);
}

typeWriter();

// ── Active nav link highlighting ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
