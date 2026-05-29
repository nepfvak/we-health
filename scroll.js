(function () {
  if (typeof Lenis === 'undefined') return;

  // Block ALL pixel-mode wheel events (deltaMode === 0) from reaching Lenis.
  // deltaMode 0 = trackpad / high-resolution wheel (MacBook, Magic Mouse, touchpad).
  // The OS already provides excellent momentum scrolling for these — Lenis on top
  // creates a double-animation that stutters on fast swipes.
  // deltaMode 1 = discrete mouse wheel clicks → these pass through to Lenis for
  // smooth scrolling on traditional mice that would otherwise feel steppy.
  window.addEventListener('wheel', function (e) {
    if (e.deltaMode === 0) {
      e.stopImmediatePropagation();
    }
  }, { passive: true, capture: true });

  var lenis = new Lenis({
    duration: 1.0,
    easing: function (t) { return 1 - Math.pow(1 - t, 3); },
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
    wheelMultiplier: 1.0,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
