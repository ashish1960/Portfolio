// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// Custom cursor dot (desktop only)
// ============================================
const cursorDot = document.getElementById('cursorDot');
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isFinePointer && cursorDot) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-media');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.width = '34px';
      cursorDot.style.height = '34px';
      cursorDot.style.background = 'rgba(245, 166, 35, 0.15)';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.width = '18px';
      cursorDot.style.height = '18px';
      cursorDot.style.background = 'transparent';
    });
  });
}

// ============================================
// Navbar: scrolled state + active link tracking
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main .section, .hero');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 12);

  let current = 'home';
  const scrollPos = window.scrollY + window.innerHeight * 0.35;

  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============================================
// Mobile nav toggle
// ============================================
const navBurger = document.getElementById('navBurger');
const navLinksList = document.getElementById('navLinks');

navBurger.addEventListener('click', () => {
  navBurger.classList.toggle('open');
  navLinksList.classList.toggle('mobile-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navBurger.classList.remove('open');
    navLinksList.classList.remove('mobile-open');
  });
});

// ============================================
// Typed role text in hero
// ============================================
const roles = ['Java', 'MySQL', 'HTML & CSS', 'clean code'];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ============================================
// Scroll-triggered reveals (about/skills/projects/contact cards)
// ============================================
const revealTargets = document.querySelectorAll(
  '.about-card, .skill-card, .project-row, .contact-card, .section-head'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// Animated stat counters (about section)
// ============================================
const statNums = document.querySelectorAll('.stat-num');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// ============================================
// Skill bar fill animation
// ============================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fillAmount = entry.target.dataset.fill;
      entry.target.style.width = fillAmount + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(el => skillObserver.observe(el));

// ============================================
// Contact form (front-end only — no backend)
// ============================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();

  formNote.textContent = `Thanks${name ? ', ' + name : ''} — this is a static demo form, so nothing was actually sent. Please use the email link above to reach me directly.`;
  contactForm.reset();
});

// ============================================
// Back to top button
// ============================================
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
