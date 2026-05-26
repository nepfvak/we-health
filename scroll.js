(function () {
  if (typeof Lenis === 'undefined') return;
  var lenis = new Lenis({
    duration: 1.4,
    easing: function (t) { return 1 - Math.pow(1 - t, 3); },
    smoothWheel: true,
    smoothTouch: false,   // native touch scroll on mobile — already fast & smooth
    touchMultiplier: 1.5, // slight boost so mobile swipes feel full-speed
    wheelMultiplier: 1.0, // trackpad sends many small deltas — keep at 1x
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
