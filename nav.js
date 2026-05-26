(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const hero = document.querySelector('.hero');

  function tick() {
    let threshold;
    if (hero) {
      threshold = hero.offsetTop + hero.offsetHeight - nav.offsetHeight;
    } else {
      threshold = 80;
    }
    nav.classList.toggle('scrolled', window.scrollY >= threshold);
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  tick();
})();
