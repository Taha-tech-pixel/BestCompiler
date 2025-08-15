/*
  CodeGalaxy Enhanced SPA - Part 1 (No routing here)
  - Theme management (Dark/Light/High Contrast)
  - Toast notifications
  - Utility helpers
  Note: Routing is handled by assets/app.js
*/

(() => {
  const app = document.getElementById('app');
  const themeToggle = document.getElementById('theme-toggle');
  const toastContainer = document.getElementById('toast-container');

  const escapeHTML = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const AppState = {
    currentTheme: localStorage.getItem('theme') || 'dark'
  };

  const ThemeManager = {
    init() {
      this.setTheme(AppState.currentTheme);
      if (themeToggle) themeToggle.addEventListener('click', () => this.toggle());
    },
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      AppState.currentTheme = theme;
      localStorage.setItem('theme', theme);
      const icon = themeToggle?.querySelector('span') || themeToggle;
      if (icon) icon.textContent = this.icon(theme);
      if (themeToggle) themeToggle.setAttribute('data-tooltip', `Switch to ${this.next(theme)} mode`);
    },
    icon(theme) { return theme === 'light' ? '☀️' : (theme === 'high-contrast' ? '🔍' : '🌙'); },
    next(curr) { return curr === 'dark' ? 'light' : (curr === 'light' ? 'high-contrast' : 'dark'); },
    toggle() { this.setTheme(this.next(AppState.currentTheme)); }
  };

  const ToastManager = {
    init() { this.container = toastContainer; },
    show(title, message, type = 'info', duration = 4000) {
      if (!this.container) return;
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
      toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
          <div class="toast-title">${escapeHTML(title)}</div>
          <div class="toast-message">${escapeHTML(message)}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
      `;
      this.container.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 50);
      setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, duration);
    }
  };

  ThemeManager.init();
  ToastManager.init();

  if (!localStorage.getItem('hasVisited')) {
    setTimeout(() => {
      ToastManager.show('Welcome to CodeGalaxy!', 'Explore languages and try the compiler.', 'info', 6000);
      localStorage.setItem('hasVisited', 'true');
    }, 800);
  }
})();
