/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (follower) {
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scale on hover
document.querySelectorAll('a, button, .skill-pill, .project-card, .cert-card, .cl-item, .av-social-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!cursor || !follower) return;
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    follower.style.borderColor = 'rgba(228,195,173,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    if (!cursor || !follower) return;
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.borderColor = 'rgba(228,195,173,0.4)';
  });
});

/* ===== FLOATING PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1.5;
    const x = Math.random() * 100;
    const y = Math.random() * 80 + 10;
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * 8;
    const opacity = Math.random() * 0.25 + 0.08;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}%; top:${y}%;
      --dur:${duration}s; --delay:${delay}s; --op:${opacity};
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
let menuOpen = false;

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileNav.classList.toggle('open', menuOpen);
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
      spans[1].style.transform = 'rotate(-45deg) translate(4px, -5px)';
      document.body.style.overflow = 'hidden';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
      document.body.style.overflow = '';
    }
  });
}

function closeMobileNav() {
  menuOpen = false;
  if (mobileNav) mobileNav.classList.remove('open');
  if (hamburger) {
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
  document.body.style.overflow = '';
}

// Close mobile nav on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) closeMobileNav();
});

/* ===== SCROLL ANIMATIONS ===== */
const observerOptions = {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const animatable = document.querySelectorAll(
  '.tl-content, .project-card, .skill-pill, .cert-card, .about-text, .about-visual, .cl-item, .cta-box, .stat, .av-social-item, .hero-socials'
);

animatable.forEach((el, i) => {
  el.classList.add('fade-in-up');
  el.dataset.delay = (i % 5) * 70;
  observer.observe(el);
});

/* ===== NAV SCROLL EFFECT ===== */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
    nav.style.borderBottomColor = 'rgba(255,255,255,0.05)';
  } else {
    nav.classList.remove('scrolled');
    nav.style.borderBottomColor = 'rgba(255,255,255,0.07)';
  }
}, { passive: true });

/* ===== ACTIVE NAV LINKS ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ===== PARALLAX HERO BG TEXT ===== */
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroBgText && scrolled < window.innerHeight) {
    heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.28}px))`;
    heroBgText.style.opacity = 1 - scrolled / (window.innerHeight * 0.6);
  }
}, { passive: true });

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, suffix = '+', duration = 1400) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text);
      const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '+';
      if (!isNaN(num)) {
        animateCounter(el, num, suffix);
        counterObserver.unobserve(el);
      }
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

/* ===== SMOOTH TOUCH SCROLL FIX ===== */
document.addEventListener('touchstart', function() {}, { passive: true });

/* ===== PROJECT CARD TILT (desktop) ===== */
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
