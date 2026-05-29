(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const hero = document.querySelector('.hero');
  const pageHero = document.querySelector('.page-hero');
  const frame = document.querySelector('.page-frame');

  function tick() {
    let threshold;
    if (hero) {
      threshold = hero.offsetTop + hero.offsetHeight - nav.offsetHeight;
    } else if (pageHero) {
      threshold = pageHero.offsetTop + pageHero.offsetHeight - nav.offsetHeight;
    } else {
      threshold = 80;
    }
    const scrolled = window.scrollY >= threshold;
    nav.classList.toggle('scrolled', scrolled);
    // Hide fixed frame on pages that have their own hero frame
    if (frame && (hero || pageHero)) {
      frame.classList.add('hidden');
    }
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  tick();
})();

// Mobile Services accordion toggle
(function () {
  const toggle = document.querySelector('.mob-services-toggle');
  const group  = document.getElementById('mobSubGroup');
  const overlay = document.getElementById('menuOverlay');
  if (!toggle || !group) return;

  toggle.addEventListener('click', function () {
    const open = group.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Reset accordion whenever overlay is closed
  if (overlay) {
    new MutationObserver(function () {
      if (!overlay.classList.contains('open')) {
        group.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }
})();
