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
      threshold = 0;
    }
    const past = window.scrollY >= threshold;
    nav.classList.toggle('scrolled', past);
    if (frame) frame.classList.toggle('hidden', past);
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  tick();
})();
