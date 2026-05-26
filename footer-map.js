/**
 * footer-map.js
 * Wraps the Google Maps iframe in a transparent overlay on touch devices.
 * First tap activates the map (removes the overlay); subsequent touches
 * interact with the iframe normally. This prevents accidental map opens
 * while scrolling past the footer.
 */
(function () {
  // Only apply on touch-capable devices
  if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

  document.querySelectorAll('.f-map').forEach(function (fMap) {
    var iframe = fMap.querySelector('iframe');
    if (!iframe) return;

    // Wrap the iframe in a relative container
    var wrap = document.createElement('div');
    wrap.className = 'f-map-wrap';
    fMap.insertBefore(wrap, iframe);
    wrap.appendChild(iframe);

    // Create the transparent overlay
    var overlay = document.createElement('div');
    overlay.className = 'f-map-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    wrap.appendChild(overlay);

    // On first tap, remove the overlay so the iframe becomes interactive
    overlay.addEventListener('touchstart', function (e) {
      e.preventDefault();
      overlay.classList.add('is-active');
    }, { passive: false });
  });
})();
