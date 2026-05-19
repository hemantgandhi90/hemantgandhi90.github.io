// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Hero eyebrow typewriter
(() => {
  const el = document.querySelector('.typewriter');
  if (!el) return;
  const phrases = [
    'Quality Engineering Leader',
    'AI-Native Test Architect',
    'Test Automation Architect',
    'Team Builder',
    'Automation Engineer',
  ];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = phrases[0];
    return;
  }
  const TYPE_MS = 70, DELETE_MS = 40, HOLD_MS = 1800, GAP_MS = 300;
  let i = 0, char = 0, deleting = false;
  el.textContent = '';
  const tick = () => {
    const word = phrases[i];
    if (!deleting) {
      char++;
      el.textContent = word.slice(0, char);
      if (char === word.length) {
        deleting = true;
        return setTimeout(tick, HOLD_MS);
      }
      return setTimeout(tick, TYPE_MS);
    }
    char--;
    el.textContent = word.slice(0, char);
    if (char === 0) {
      deleting = false;
      i = (i + 1) % phrases.length;
      return setTimeout(tick, GAP_MS);
    }
    setTimeout(tick, DELETE_MS);
  };
  setTimeout(tick, 800);
})();

// Nav: add scrolled state on scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal-on-scroll for sections, jobs, cards
const reveal = document.querySelectorAll(
  '.section-header, .about-text, .about-card, .job, .skill-card, .edu-card, .contact-card'
);
reveal.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveal.forEach(el => io.observe(el));

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const setActive = () => {
  const y = window.scrollY + 120;
  let current = '';
  sections.forEach(s => {
    if (y >= s.offsetTop) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
};
window.addEventListener('scroll', setActive, { passive: true });
setActive();
