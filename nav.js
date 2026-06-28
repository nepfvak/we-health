(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const hero = document.querySelector('.hero');
  const pageHero = document.querySelector('.page-hero');
  const frame = document.querySelector('.page-frame');
  const triggers = document.querySelectorAll('.has-dropdown');

  function positionDropdown() {
    const isScrolled = nav.classList.contains('scrolled');
    const navRect = nav.getBoundingClientRect();
    const rawInset = getComputedStyle(document.documentElement)
      .getPropertyValue('--frame-inset').trim();
    const frameInset = isScrolled ? 0 : (parseFloat(rawInset) || 14);
    triggers.forEach(function (trigger) {
      const trigRect = trigger.getBoundingClientRect();
      const offset = Math.max((navRect.bottom - frameInset) - trigRect.bottom, 0);
      trigger.style.setProperty('--dd-offset', offset + 'px');
      trigger.style.setProperty('--dd-bridge', (offset + 4) + 'px');
    });
  }

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
    positionDropdown();
    // Hide fixed frame on pages that have their own hero frame
    if (frame && (hero || pageHero)) {
      frame.classList.add('hidden');
    }
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  nav.addEventListener('transitionend', positionDropdown, { passive: true });
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

// Mobile Practitioners accordion toggle
(function () {
  const toggle = document.querySelector('.mob-practitioners-toggle');
  const group  = document.getElementById('mobPractitionersGroup');
  const overlay = document.getElementById('menuOverlay');
  if (!toggle || !group) return;

  toggle.addEventListener('click', function () {
    const open = group.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  if (overlay) {
    new MutationObserver(function () {
      if (!overlay.classList.contains('open')) {
        group.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }).observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }
})();
