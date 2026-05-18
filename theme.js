// W&E Health Institute — theme management
(function () {
  const html = document.documentElement;

  // Apply saved theme before first paint to avoid flash.
  // Default is LIGHT — only switch to dark if the user explicitly chose it.
  const stored = localStorage.getItem('wehi-theme');
  if (stored !== 'dark') html.setAttribute('data-theme', 'light');

  const SUN = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></svg>';
  const MOON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function getTheme() {
    return html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('wehi-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('wehi-theme', 'dark');
    }
    syncButton();
  }

  function syncButton() {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;
    const g = btn.querySelector('.tg');
    const isLight = getTheme() === 'light';
    // In dark mode show sun (click → go light); in light mode show moon (click → go dark)
    if (g) g.innerHTML = isLight ? MOON : SUN;
    btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      applyTheme(getTheme() === 'light' ? 'dark' : 'light');
    });
    syncButton();
  });
})();
