const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navLinks.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('is-open', !isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealTargets = document.querySelectorAll(
  '.intro-content, .section-heading, .project-card, .services-heading, .service-item, .manifesto-inner, .contact-main, .intro-grid > .section-kicker, .services-layout > .section-kicker, .contact-inner > .section-kicker'
);

if (!reducedMotion.matches) {
  document.documentElement.classList.add('motion-ready');

  const staggerCounts = new Map();
  revealTargets.forEach((target) => {
    target.classList.add('reveal');
    const group = target.parentElement;
    const order = staggerCounts.get(group) ?? 0;
    staggerCounts.set(group, order + 1);
    target.style.setProperty('--reveal-delay', `${Math.min(order * 90, 270)}ms`);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        const wasSkippedByScroll = entry.boundingClientRect.bottom < 0;
        if (entry.isIntersecting || wasSkippedByScroll) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -5% 0px' });
    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  const revealSkippedTargets = () => {
    revealTargets.forEach((target) => {
      if (!target.classList.contains('is-visible') && target.getBoundingClientRect().bottom < 0) {
        target.classList.add('is-visible');
      }
    });
  };
  window.addEventListener('scrollend', revealSkippedTargets, { passive: true });
  window.addEventListener('hashchange', () => requestAnimationFrame(revealSkippedTargets));

  if (finePointer.matches) {
    const heroArt = document.querySelector('.hero-art');
    const depthLayers = [
      ['.art-grid', 0.12], ['.orbit-one', 0.3], ['.orbit-two', -0.24],
      ['.orb-back', 0.48], ['.orb-main', 0.72], ['.orb-core', 1],
      ['.art-spark', 1.15]
    ];

    heroArt.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const bounds = heroArt.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
      depthLayers.forEach(([selector, depth]) => {
        const layer = heroArt.querySelector(selector);
        layer.style.setProperty('--shift-x', `${(x * depth).toFixed(2)}px`);
        layer.style.setProperty('--shift-y', `${(y * depth).toFixed(2)}px`);
      });
    });

    heroArt.addEventListener('pointerleave', () => {
      depthLayers.forEach(([selector]) => {
        const layer = heroArt.querySelector(selector);
        layer.style.setProperty('--shift-x', '0px');
        layer.style.setProperty('--shift-y', '0px');
      });
    });

    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        if (event.pointerType === 'touch') return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
        card.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }
}

document.querySelector('#year').textContent = new Date().getFullYear();
