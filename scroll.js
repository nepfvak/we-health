(function () {
  if (typeof Lenis === 'undefined') return;

  var lenis = new Lenis({
    duration: 1.4,
    easing: function (t) { return 1 - Math.pow(1 - t, 3); },
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
    wheelMultiplier: 1.0,
  });

  // Trackpad sends many rapid small-delta events; mouse wheel sends
  // fewer large-delta events (typically ≥ 100px per click in Chrome).
  // When trackpad is active, stop Lenis so the OS momentum scroll takes
  // over natively — it's already smooth and doesn't need Lenis on top.
  var trackpadActive = false;
  var trackpadTimer;

  window.addEventListener('wheel', function (e) {
    var isTrackpad = e.deltaMode === 0 && Math.abs(e.deltaY) < 50;
    if (isTrackpad) {
      if (!trackpadActive) {
        lenis.stop();
        trackpadActive = true;
      }
      clearTimeout(trackpadTimer);
      trackpadTimer = setTimeout(function () {
        trackpadActive = false;
        lenis.start();
      }, 400);
    }
  }, { passive: true, capture: true });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
