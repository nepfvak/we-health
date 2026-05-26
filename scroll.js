(function () {
  if (typeof Lenis === 'undefined') return;
  var lenis = new Lenis({
    duration: 1.8,
    easing: function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -6 * t); },
    smoothWheel: true,
    wheelMultiplier: 0.8,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
