(function () {
  if (typeof Lenis === 'undefined') return;

  // Register BEFORE Lenis so this capture listener fires first.
  // Trackpad sends many rapid small-delta events; mouse wheel sends
  // fewer large-delta events (typically ≥ 100px per click in Chrome).
  // For trackpad events we call stopImmediatePropagation() so Lenis
  // never sees them and never calls preventDefault() — native OS
  // momentum scroll takes over, which is already perfectly smooth.
  // Trackpad two-finger swipe on Linux/libinput produces many small-delta pixel-mode
  // events (deltaY typically < 120). Mouse wheel clicks produce deltaY >= 120 per notch.
  // Stop trackpad events before Lenis sees them so the OS handles momentum natively;
  // large-delta mouse wheel events pass through and get Lenis smoothing.
  window.addEventListener('wheel', function (e) {
    if (e.deltaMode === 0 && Math.abs(e.deltaY) < 120) {
      e.stopImmediatePropagation();
    }
  }, { passive: true, capture: true });

  var lenis = new Lenis({
    duration: 1.4,
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
