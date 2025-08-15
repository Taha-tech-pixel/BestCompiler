/*
  CodeGalaxy Enhanced SPA - Part 1 (No routing here)
  - Theme management (Dark/Light/High Contrast)
  - Toast notifications
  - Global search functionality
  - Copy to clipboard
  - Keyboard shortcuts
  - Utility helpers
  Note: Routing is handled by assets/app.js
*/

(() => {
  const app = document.getElementById('app');
  const themeToggle = document.getElementById('theme-toggle');
  const toastContainer = document.getElementById('toast-container');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const escapeHTML = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const AppState = {
    currentTheme: localStorage.getItem('theme') || 'dark',
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],
    bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || []
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

  const SearchManager = {
    init() {
      if (!searchInput || !searchResults) return;
      
      searchInput.addEventListener('input', this.debounce(() => this.performSearch(), 300));
      searchInput.addEventListener('focus', () => this.showResults());
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#global-search')) {
          this.hideResults();
        }
      });
      
      // Keyboard navigation
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideResults();
          searchInput.blur();
        }
      });
    },

    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 2) {
        this.hideResults();
        return;
      }

      const results = this.searchAll(query);
      this.displayResults(results);
      this.showResults();
    },

    searchAll(query) {
      const results = [];
      
      // Search languages
      CodeGalaxyData.languages.forEach(lang => {
        if (lang.name.toLowerCase().includes(query) || 
            lang.description.toLowerCase().includes(query)) {
          results.push({
            type: 'language',
            title: lang.name,
            subtitle: lang.description,
            icon: '🌐',
            href: `#/language/${lang.id}`
          });
        }

        // Search functions
        if (lang.functions) {
          lang.functions.forEach(func => {
            if (func.name.toLowerCase().includes(query) || 
                func.brief.toLowerCase().includes(query)) {
              results.push({
                type: 'function',
                title: func.name,
                subtitle: func.brief,
                icon: '⚙️',
                href: `#/language/${lang.id}/functions/${encodeURIComponent(func.id)}`
              });
            }
          });
        }

        // Search tags
        if (lang.tagGroups) {
          lang.tagGroups.forEach(group => {
            group.items.forEach(item => {
              if (item.name.toLowerCase().includes(query) || 
                  item.brief.toLowerCase().includes(query)) {
                results.push({
                  type: 'tag',
                  title: item.name,
                  subtitle: item.brief,
                  icon: '🏷️',
                  href: `#/language/${lang.id}/tags/${encodeURIComponent(group.id)}/${encodeURIComponent(item.id)}`
                });
              }
            });
          });
        }
      });

      return results.slice(0, 10); // Limit to 10 results
    },

    displayResults(results) {
      if (results.length === 0) {
        searchResults.innerHTML = `
          <div class="search-result-item">
            <div class="search-result-content">
              <div class="search-result-title">No results found</div>
              <div class="search-result-subtitle">Try a different search term</div>
            </div>
          </div>
        `;
        return;
      }

      searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" onclick="location.hash='${result.href}'">
          <div class="search-result-icon">${result.icon}</div>
          <div class="search-result-content">
            <div class="search-result-title">${escapeHTML(result.title)}</div>
            <div class="search-result-subtitle">${escapeHTML(result.subtitle)}</div>
          </div>
          <div class="search-result-type">${result.type}</div>
        </div>
      `).join('');
    },

    showResults() {
      searchResults.classList.add('show');
    },

    hideResults() {
      searchResults.classList.remove('show');
    }
  };

  const ClipboardManager = {
    init() {
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-btn')) {
          this.copyToClipboard(e.target);
        }
      });
    },

    async copyToClipboard(button) {
      const codeBlock = button.closest('.card, .panel').querySelector('pre code, pre');
      if (!codeBlock) return;

      const text = codeBlock.textContent;
      
      try {
        await navigator.clipboard.writeText(text);
        this.showCopiedState(button);
        ToastManager.show('Copied!', 'Code copied to clipboard', 'success', 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showCopiedState(button);
        ToastManager.show('Copied!', 'Code copied to clipboard', 'success', 2000);
      }
    },

    showCopiedState(button) {
      const originalText = button.innerHTML;
      button.innerHTML = '✓ Copied';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('copied');
      }, 2000);
    }
  };

  const KeyboardManager = {
    init() {
      document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          searchInput?.focus();
        }
        
        // Ctrl/Cmd + / for shortcuts hint
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
          e.preventDefault();
          this.showShortcutsHint();
        }
      });
    },

    showShortcutsHint() {
      const hint = document.createElement('div');
      hint.className = 'shortcuts-hint';
      hint.innerHTML = `
        <strong>Keyboard Shortcuts:</strong><br>
        Ctrl+K: Search | Ctrl+/: This help | Esc: Close dialogs
      `;
      document.body.appendChild(hint);
      
      setTimeout(() => hint.classList.add('show'), 100);
      setTimeout(() => {
        hint.classList.remove('show');
        setTimeout(() => hint.remove(), 300);
      }, 3000);
    }
  };

  // Initialize all managers
  ThemeManager.init();
  ToastManager.init();
  SearchManager.init();
  ClipboardManager.init();
  KeyboardManager.init();

  // Add copy buttons to code blocks
  const addCopyButtons = () => {
    document.querySelectorAll('pre').forEach(pre => {
      if (!pre.querySelector('.copy-btn')) {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '📋 Copy';
        copyBtn.style.position = 'absolute';
        copyBtn.style.top = '8px';
        copyBtn.style.right = '8px';
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
      }
    });
  };

  // Add copy buttons when DOM changes
  const observer = new MutationObserver(addCopyButtons);
  observer.observe(document.body, { childList: true, subtree: true });

  if (!localStorage.getItem('hasVisited')) {
    setTimeout(() => {
      ToastManager.show('Welcome to CodeGalaxy!', 'Explore languages and try the compiler.', 'info', 6000);
      localStorage.setItem('hasVisited', 'true');
    }, 800);
  }
})();
