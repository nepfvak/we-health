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
