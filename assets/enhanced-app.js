/*
  CodeGalaxy Enhanced SPA - Part 1
  - Advanced hash router with semantic routes
  - Theme management (Dark/Light/High Contrast)
  - User progress tracking and analytics
  - Advanced search with filters
  - Interactive code challenges
  - Real-time collaboration features
  - Toast notifications and modals
  - Mobile-responsive navigation
  - Accessibility features
  - Offline support
*/

(() => {
  // Global state management
  const AppState = {
    currentTheme: localStorage.getItem('theme') || 'dark',
    userProgress: JSON.parse(localStorage.getItem('userProgress')) || {},
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
    settings: JSON.parse(localStorage.getItem('settings')) || {
      fontSize: 'medium',
      reducedMotion: false,
      autoSave: true,
      notifications: true
    }
  };

  // DOM elements
  const app = document.getElementById('app');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const toastContainer = document.getElementById('toast-container');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal');

  // Utility functions
  const escapeHTML = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Theme Management
  const ThemeManager = {
    init() {
      this.setTheme(AppState.currentTheme);
      this.bindEvents();
    },

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      AppState.currentTheme = theme;
      localStorage.setItem('theme', theme);
      
      // Update theme toggle icon
      const icon = themeToggle.querySelector('span') || themeToggle;
      icon.textContent = this.getThemeIcon(theme);
      
      // Update theme toggle tooltip
      themeToggle.setAttribute('data-tooltip', `Switch to ${this.getNextTheme(theme)} mode`);
    },

    getThemeIcon(theme) {
      const icons = {
        dark: '🌙',
        light: '☀️',
        'high-contrast': '🔍'
      };
      return icons[theme] || '🌙';
    },

    getNextTheme(currentTheme) {
      const themes = ['dark', 'light', 'high-contrast'];
      const currentIndex = themes.indexOf(currentTheme);
      return themes[(currentIndex + 1) % themes.length];
    },

    toggleTheme() {
      const nextTheme = this.getNextTheme(AppState.currentTheme);
      this.setTheme(nextTheme);
      this.showToast('Theme changed', `Switched to ${nextTheme} mode`, 'success');
    },

    bindEvents() {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  };

  // Toast Notification System
  const ToastManager = {
    init() {
      this.container = toastContainer;
    },

    show(title, message, type = 'info', duration = 5000) {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      
      const icon = this.getIcon(type);
      
      toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
          <div class="toast-title">${escapeHTML(title)}</div>
          <div class="toast-message">${escapeHTML(message)}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
      `;

      this.container.appendChild(toast);
      
      // Trigger animation
      setTimeout(() => toast.classList.add('show'), 100);
      
      // Auto remove
      if (duration > 0) {
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.remove(), 300);
        }, duration);
      }
    },

    getIcon(type) {
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };
      return icons[type] || 'ℹ️';
    }
  };

  // Initialize core managers
  ThemeManager.init();
  ToastManager.init();

  // Show welcome toast on first visit
  if (!localStorage.getItem('hasVisited')) {
    setTimeout(() => {
      ToastManager.show(
        'Welcome to CodeGalaxy!',
        'Explore languages, try the compiler, and take on coding challenges.',
        'info',
        8000
      );
      localStorage.setItem('hasVisited', 'true');
    }, 1000);
  }

  // Basic routing for now
  const notFound = () => {
    app.innerHTML = `
      <div class="panel">
        <h2>Page not found</h2>
        <p class="muted">The page you requested does not exist. Use the navigation above.</p>
      </div>
    `;
  };

  const route = () => {
    const hash = location.hash || '#/';
    
    // Update active navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      }
    });

    // Basic routing - will be enhanced
    if (hash === '#/' || hash === '') {
      app.innerHTML = `
        <section class="hero animate-fade-in">
          <div>
            <h1>Master Programming Languages and Core Computer Science</h1>
            <p>Navigate a galaxy of languages featured on W3Schools. Drill into functions, uses, tags, and examples. Explore number systems, convert across bases, and understand character encodings—all in one beautiful interface.</p>
            <div class="cta">
              <a class="btn" href="#/languages">Browse Languages</a>
              <a class="btn secondary" href="#/compiler">Open Compiler</a>
            </div>
          </div>
        </section>
      `;
    } else {
      notFound();
    }
    
    scrollTop();
  };

  window.addEventListener('hashchange', route);
  route();
})();
