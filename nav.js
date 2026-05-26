(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const hero = document.querySelector('.hero');
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
    // On non-hero pages: show frame only while nav is in pill state
    if (frame && !hero) {
      frame.classList.toggle('hidden', scrolled);
    }
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  tick();
})();
