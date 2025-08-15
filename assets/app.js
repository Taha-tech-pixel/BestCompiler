/*
  CodeGalaxy SPA
  - Hash router with semantic routes
  - Renders pages using data from CodeGalaxyData
*/

(() => {
  const app = document.getElementById('app');

  const escapeHTML = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const notFound = () => {
    app.innerHTML = `
      <div class="panel">
        <h2>Page not found</h2>
        <p class="muted">The page you requested does not exist. Use the navigation above.</p>
      </div>
    `;
  };

  const card = ({ title, subtitle, chips = [], href = '', pre = '' }) => {
    const chipsHtml = chips.map(c => `<span class="chip">${escapeHTML(c)}</span>`).join('');
    const preHtml = pre ? `<pre><code>${escapeHTML(pre)}</code></pre>` : '';
    const body = `
      <div class="card" ${href ? `onclick="location.hash='${href}'" style="cursor:pointer"` : ''}>
        <h3>${escapeHTML(title)}</h3>
        ${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ''}
        ${chipsHtml ? `<div class="chip-row">${chipsHtml}</div>` : ''}
        ${preHtml}
      </div>
    `;
    return body;
  };

  const section = (title, content) => `
    <div>
      <div class="section-title">${escapeHTML(title)}</div>
      <div class="grid">${content}</div>
    </div>
  `;

  // Home
  const renderHome = () => {
    const highlights = [
      { title: 'Languages', subtitle: 'Explore syntax, functions, uses, tags, and examples.', href: '#/languages' },
      { title: 'Compiler', subtitle: 'Try code instantly in your browser.', href: '#/compiler' },
      { title: 'Number Systems', subtitle: 'Binary, Octal, Decimal, Hex with conversions.', href: '#/number-systems' },
      { title: 'Converter', subtitle: 'Convert numbers across bases 2–36.', href: '#/converter' },
      { title: 'Coding Schemes', subtitle: 'ASCII and Unicode essentials.', href: '#/coding-schemes' },
    ];

    app.innerHTML = `
      <section class="hero">
        <div>
          <h1>Master Programming Languages and Core Computer Science</h1>
          <p>Navigate a galaxy of languages featured on W3Schools. Drill into functions, uses, tags, and examples. Explore number systems, convert across bases, and understand character encodings—all in one beautiful interface.</p>
          <div class="cta">
            <a class="btn" href="#/languages">Browse Languages</a>
            <a class="btn secondary" href="#/compiler">Open Compiler</a>
          </div>
        </div>
        <div class="panel">
          <div class="section-title">Quick Start</div>
          <div class="grid">
            ${highlights.map(h => card({ title: h.title, subtitle: h.subtitle, href: h.href })).join('')}
          </div>
        </div>
      </section>

      ${section('Popular Languages', CodeGalaxyData.languages.slice(0, 8).map(l => card({
        title: l.name,
        subtitle: l.description,
        chips: [l.categoriesLabel || ''],
        href: `#/language/${l.id}`
      })).join(''))}
    `;
  };

  // Languages listing
  const renderLanguages = () => {
    const searchId = 'lang-search';
    app.innerHTML = `
      <div class="split">
        <div class="stack">
          <h2>Programming Languages</h2>
          <p class="muted">Languages included are commonly featured on W3Schools. Select a language to explore its functions, uses, tags, and examples.</p>
          <div class="searchbar">
            <input id="${searchId}" placeholder="Search languages..." />
          </div>
        </div>
      </div>
      <div class="grid" id="lang-grid"></div>
    `;

    const grid = document.getElementById('lang-grid');
    const render = (filter = '') => {
      const normalized = filter.trim().toLowerCase();
      const items = CodeGalaxyData.languages
        .filter(l => !normalized || l.name.toLowerCase().includes(normalized) || l.description.toLowerCase().includes(normalized))
        .map(l => card({ title: l.name, subtitle: l.description, chips: [l.categoriesLabel || ''], href: `#/language/${l.id}` }))
        .join('');
      grid.innerHTML = items || '<div class="muted">No matches.</div>';
    };
    render();
    document.getElementById(searchId).addEventListener('input', (e) => render(e.target.value));
  };

  // Language overview
  const renderLanguageOverview = (langId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang) return notFound();

    const sections = [];
    if (Array.isArray(lang.functions) && lang.functions.length) {
      sections.push(card({ title: 'Functions', subtitle: 'Built-ins and common utilities.', href: `#/language/${lang.id}/functions` }));
    }
    if (Array.isArray(lang.uses) && lang.uses.length) {
      sections.push(card({ title: 'Uses', subtitle: 'What the language is great at.', href: `#/language/${lang.id}/uses` }));
    }
    if (Array.isArray(lang.tagGroups) && lang.tagGroups.length) {
      sections.push(card({ title: lang.categoriesLabel || 'Tags', subtitle: 'Categories and elements.', href: `#/language/${lang.id}/tags` }));
    }
    if (Array.isArray(lang.examples) && lang.examples.length) {
      sections.push(card({ title: 'Examples', subtitle: 'Practical snippets.', href: `#/language/${lang.id}/examples` }));
    }

    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)}</h2>
        <p class="muted">${escapeHTML(lang.description)}</p>
      </div>
      <div class="section-title">Explore ${escapeHTML(lang.name)}</div>
      <div class="grid">${sections.join('')}</div>
    `;
  };

  // Language → Functions
  const renderLanguageFunctionsList = (langId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang || !lang.functions || !lang.functions.length) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — Functions</h2>
        <p class="muted">Select a function to learn more.</p>
      </div>
      <div class="grid">
        ${lang.functions.map(fn => card({ title: fn.name, subtitle: fn.brief, href: `#/language/${lang.id}/functions/${encodeURIComponent(fn.id)}` })).join('')}
      </div>
    `;
  };

  const renderFunctionDetail = (langId, fnId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang || !lang.functions) return notFound();
    const fn = lang.functions.find(f => f.id === fnId);
    if (!fn) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — ${escapeHTML(fn.name)}</h2>
        <p>${escapeHTML(fn.detail)}</p>
        <div style="margin-top:12px;">
          <a class="btn secondary" href="#/language/${lang.id}/functions">Back to functions</a>
        </div>
      </div>
    `;
  };

  // Language → Uses
  const renderLanguageUsesList = (langId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang || !lang.uses || !lang.uses.length) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — Uses</h2>
        <p class="muted">Where ${escapeHTML(lang.name)} shines in practice.</p>
      </div>
      <div class="grid">
        ${lang.uses.map(u => card({ title: u.name, subtitle: u.brief, href: `#/language/${lang.id}/uses/${encodeURIComponent(u.id)}` })).join('')}
      </div>
    `;
  };

  const renderUseDetail = (langId, useId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang || !lang.uses) return notFound();
    const u = lang.uses.find(x => x.id === useId);
    if (!u) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — ${escapeHTML(u.name)}</h2>
        <p>${escapeHTML(u.detail)}</p>
        <div style="margin-top:12px;">
          <a class="btn secondary" href="#/language/${lang.id}/uses">Back to uses</a>
        </div>
      </div>
    `;
  };

  // Language → Tags (Groups → Items → Detail)
  const renderLanguageTagsGroups = (langId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang || !lang.tagGroups || !lang.tagGroups.length) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — ${escapeHTML(lang.categoriesLabel || 'Tags')}</h2>
        <p class="muted">Browse grouped ${escapeHTML(lang.categoriesLabel || 'tags')} and drill into specifics.</p>
      </div>
      <div class="grid">
        ${lang.tagGroups.map(g => card({ title: g.groupName, subtitle: `${g.items.length} items`, href: `#/language/${lang.id}/tags/${encodeURIComponent(g.id)}` })).join('')}
      </div>
    `;
  };

  const renderLanguageTagGroup = (langId, groupId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang || !lang.tagGroups) return notFound();
    const group = lang.tagGroups.find(g => g.id === groupId);
    if (!group) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — ${escapeHTML(group.groupName)}</h2>
        <p class="muted">Select a ${escapeHTML(group.itemsLabel || 'Item')} to learn more.</p>
      </div>
      <div class="grid">
        ${group.items.map(it => card({ title: it.name, subtitle: it.brief, href: `#/language/${lang.id}/tags/${encodeURIComponent(group.id)}/${encodeURIComponent(it.id)}` })).join('')}
      </div>
    `;
  };

  const renderLanguageTagItemDetail = (langId, groupId, itemId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang || !lang.tagGroups) return notFound();
    const group = lang.tagGroups.find(g => g.id === groupId);
    if (!group) return notFound();
    const item = group.items.find(i => i.id === itemId);
    if (!item) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — ${escapeHTML(item.name)}</h2>
        <p>${escapeHTML(item.detail)}</p>
        <div style="margin-top:12px;">
          <a class="btn secondary" href="#/language/${lang.id}/tags/${encodeURIComponent(group.id)}">Back to ${escapeHTML(group.groupName)}</a>
        </div>
      </div>
    `;
  };

  // Language → Examples
  const renderLanguageExamples = (langId) => {
    const lang = CodeGalaxyData.languages.find(l => l.id === langId);
    if (!lang || !lang.examples || !lang.examples.length) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — Examples</h2>
        <p class="muted">Short, focused snippets you can learn from.</p>
      </div>
      <div class="grid">
        ${lang.examples.map(ex => card({ title: ex.title, pre: ex.code })).join('')}
      </div>
    `;
  };

  // Compiler page
  const renderCompiler = () => {
    const htmlId = 'editor-html';
    const jsId = 'editor-js';
    const outId = 'output';
    const consoleId = 'console';
    app.innerHTML = `
      <div class="panel">
        <h2>In-Browser Compiler & Playground</h2>
        <p class="muted">Run JavaScript and preview HTML/CSS/JS directly. The console logs appear below.</p>
      </div>
      <div class="split">
        <div class="stack">
          <div class="section-title">HTML/CSS/JS</div>
          <textarea id="${htmlId}" class="mono" style="width:100%;height:220px;border-radius:12px;background:#0f152c;color:#e6ecff;border:1px solid rgba(255,255,255,.08);padding:10px">
<!doctype html>
<html>
  <head>
    <style>
      body { font-family: system-ui; padding: 12px }
      .hello { color: #1f6bff }
    </style>
  </head>
  <body>
    <h3 class="hello">Hello from the sandbox!</h3>
  </body>
</html>
          </textarea>
          <button class="btn" id="run-html">Run HTML</button>
        </div>
        <div class="stack">
          <div class="section-title">JavaScript</div>
          <textarea id="${jsId}" class="mono" style="width:100%;height:220px;border-radius:12px;background:#0f152c;color:#e6ecff;border:1px solid rgba(255,255,255,.08);padding:10px">console.log('2 + 3 =', 2 + 3);
          </textarea>
          <button class="btn" id="run-js">Run JS</button>
        </div>
      </div>
      <div class="split" style="margin-top:18px">
        <div class="stack">
          <div class="section-title">Preview</div>
          <iframe id="${outId}" style="width:100%;height:300px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:white"></iframe>
        </div>
        <div class="stack">
          <div class="section-title">Console</div>
          <pre id="${consoleId}" class="mono" style="height:300px"></pre>
        </div>
      </div>
    `;

    const previewFrame = document.getElementById(outId);
    const htmlArea = document.getElementById(htmlId);
    const jsArea = document.getElementById(jsId);
    const consolePre = document.getElementById(consoleId);

    const writePreview = () => {
      const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
      doc.open();
      doc.write(htmlArea.value);
      doc.close();
    };

    const captureConsole = () => {
      consolePre.textContent = '';
      const log = (...args) => {
        consolePre.textContent += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
      };
      try {
        const fn = new Function('console', jsArea.value);
        fn({ log });
      } catch (e) {
        log('Error:', e.message);
      }
    };

    document.getElementById('run-html').addEventListener('click', writePreview);
    document.getElementById('run-js').addEventListener('click', captureConsole);
    writePreview();
  };

  // Number systems listing and detail
  const renderNumberSystems = () => {
    app.innerHTML = `
      <div class="panel">
        <h2>Number Systems</h2>
        <p class="muted">Select a system to learn what it is and how to convert it to others.</p>
      </div>
      <div class="grid">
        ${CodeGalaxyData.numberSystems.map(ns => card({ title: ns.name, href: `#/number-systems/${ns.id}` })).join('')}
      </div>
    `;
  };

  const renderNumberSystemDetail = (id) => {
    const ns = CodeGalaxyData.numberSystems.find(n => n.id === id);
    if (!ns) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(ns.name)}</h2>
        <p>${escapeHTML(ns.detail)}</p>
        <div style="margin-top:12px;">
          <a class="btn secondary" href="#/number-systems">Back to Number Systems</a>
        </div>
      </div>
    `;
  };

  // Converter (bases 2–36 integers)
  const renderConverter = () => {
    const inputId = 'conv-input';
    const fromId = 'conv-from';
    const toId = 'conv-to';
    const resId = 'conv-result';
    const bases = Array.from({ length: 35 }, (_, i) => i + 2);

    app.innerHTML = `
      <div class="panel">
        <h2>Number Converter</h2>
        <p class="muted">Convert integers across bases 2–36. Supports digits 0–9 and A–Z. Prefixes (0b, 0o, 0x) are optional.</p>
      </div>
      <div class="split">
        <div class="stack">
          <label>Value</label>
          <input id="${inputId}" class="mono" placeholder="e.g., 1011, FF, 42" style="padding:10px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:var(--text)" />
        </div>
        <div class="stack">
          <label>From base</label>
          <select id="${fromId}" style="padding:10px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:var(--text)">
            ${bases.map(b => `<option value="${b}">${b}</option>`).join('')}
          </select>
        </div>
        <div class="stack">
          <label>To base</label>
          <select id="${toId}" style="padding:10px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:var(--text)">
            ${bases.map(b => `<option value="${b}" ${b===10?'selected':''}>${b}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="panel" style="margin-top:16px">
        <div class="section-title">Result</div>
        <pre id="${resId}" class="mono"></pre>
      </div>
    `;

    const elInput = document.getElementById(inputId);
    const elFrom = document.getElementById(fromId);
    const elTo = document.getElementById(toId);
    const elRes = document.getElementById(resId);

    const tryParse = (value, base) => {
      const trimmed = value.trim().replace(/^0b/i, '').replace(/^0o/i, '').replace(/^0x/i, '');
      const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
      const valid = new RegExp(`^[${digits.slice(0, base)}]+$`, 'i');
      if (!trimmed || !valid.test(trimmed)) return null;
      return parseInt(trimmed, base);
    };

    const convert = () => {
      const from = parseInt(elFrom.value, 10);
      const to = parseInt(elTo.value, 10);
      const raw = elInput.value;
      const n = tryParse(raw, from);
      if (n === null || Number.isNaN(n)) {
        elRes.textContent = 'Enter a valid non-negative integer for the selected base.';
        return;
      }
      elRes.textContent = n.toString(to).toUpperCase();
    };

    [elInput, elFrom, elTo].forEach(el => el.addEventListener('input', convert));
  };

  // Coding schemes list + detail
  const renderCodingSchemes = () => {
    app.innerHTML = `
      <div class="panel">
        <h2>Coding Schemes</h2>
        <p class="muted">Character encodings are how text is stored as bytes. Explore ASCII and Unicode.</p>
      </div>
      <div class="grid">
        ${CodeGalaxyData.codingSchemes.map(cs => card({ title: cs.name, subtitle: 'Click to learn more', href: `#/coding-schemes/${cs.id}` })).join('')}
      </div>
    `;
  };

  const renderCodingSchemeDetail = (id) => {
    const cs = CodeGalaxyData.codingSchemes.find(c => c.id === id);
    if (!cs) return notFound();
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(cs.name)}</h2>
        <p>${escapeHTML(cs.detail)}</p>
        <div style="margin-top:12px;">
          <a class="btn secondary" href="#/coding-schemes">Back to Coding Schemes</a>
        </div>
      </div>
    `;
  };

  // Router
  const routes = [
    { pattern: /^#\/?$/, handler: () => renderHome() },
    { pattern: /^#\/languages\/?$/, handler: () => renderLanguages() },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/?$/, handler: (m) => renderLanguageOverview(m[1]) },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/functions\/?$/, handler: (m) => renderLanguageFunctionsList(m[1]) },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/functions\/([^\/]+)\/?$/, handler: (m) => renderFunctionDetail(m[1], decodeURIComponent(m[2])) },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/uses\/?$/, handler: (m) => renderLanguageUsesList(m[1]) },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/uses\/([^\/]+)\/?$/, handler: (m) => renderUseDetail(m[1], decodeURIComponent(m[2])) },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/tags\/?$/, handler: (m) => renderLanguageTagsGroups(m[1]) },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/tags\/([^\/]+)\/?$/, handler: (m) => renderLanguageTagGroup(m[1], decodeURIComponent(m[2])) },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/tags\/([^\/]+)\/([^\/]+)\/?$/, handler: (m) => renderLanguageTagItemDetail(m[1], decodeURIComponent(m[2]), decodeURIComponent(m[3])) },
    { pattern: /^#\/language\/([a-z0-9\-]+)\/examples\/?$/, handler: (m) => renderLanguageExamples(m[1]) },
    { pattern: /^#\/compiler\/?$/, handler: () => renderCompiler() },
    { pattern: /^#\/number-systems\/?$/, handler: () => renderNumberSystems() },
    { pattern: /^#\/number-systems\/([a-z0-9\-]+)\/?$/, handler: (m) => renderNumberSystemDetail(m[1]) },
    { pattern: /^#\/converter\/?$/, handler: () => renderConverter() },
    { pattern: /^#\/coding-schemes\/?$/, handler: () => renderCodingSchemes() },
    { pattern: /^#\/coding-schemes\/([a-z0-9\-]+)\/?$/, handler: (m) => renderCodingSchemeDetail(m[1]) },
  ];

  const route = () => {
    const hash = location.hash || '#/';
    for (const r of routes) {
      const match = hash.match(r.pattern);
      if (match) {
        r.handler(match);
        scrollTop();
        return;
      }
    }
    notFound();
  };

  window.addEventListener('hashchange', route);
  route();
})();


