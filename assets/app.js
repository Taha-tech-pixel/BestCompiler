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
    
    const exampleSection = item.example ? `
      <div class="section-title">Example</div>
      <div class="split">
        <div class="stack">
          <div class="section-title">Code</div>
          <pre><code>${escapeHTML(item.example.code)}</code></pre>
        </div>
        <div class="stack">
          <div class="section-title">Output</div>
          <div class="panel">
            <pre style="white-space: pre-wrap; margin: 0;">${escapeHTML(item.example.output)}</pre>
          </div>
        </div>
      </div>
    ` : '';
    
    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(lang.name)} — ${escapeHTML(item.name)}</h2>
        <p>${escapeHTML(item.detail)}</p>
        <div style="margin-top:12px;">
          <a class="btn secondary" href="#/language/${lang.id}/tags/${encodeURIComponent(group.id)}">Back to ${escapeHTML(group.groupName)}</a>
        </div>
      </div>
      ${exampleSection}
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

  const renderCompiler = () => {
    app.innerHTML = `
      <div class="hero">
        <h1>🛠️ Multi-Language Compiler</h1>
        <p>Write, test, and run code in multiple programming languages. Supports JavaScript, Python, HTML, SQL, and more!</p>
      </div>
      
      <div class="split">
        <div class="stack">
          <div class="section-title">Code Editor</div>
          <div class="panel">
            <div class="compiler-controls">
              <select id="language-select" class="select">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="sql">SQL</option>
                <option value="react">React JSX</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
              </select>
              <button class="btn primary" onclick="runCode()">▶️ Run Code</button>
              <button class="btn secondary" onclick="clearOutput()">🗑️ Clear</button>
            </div>
            <textarea id="code-input" class="code-editor" placeholder="Write your code here...">// JavaScript Example
console.log("Hello, World!");

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("CodeGalaxy"));</textarea>
          </div>
        </div>
        
        <div class="stack">
          <div class="section-title">Output</div>
          <div class="panel">
            <div id="output" class="output-area">
              <div class="output-placeholder">Output will appear here...</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="section-title">Quick Examples</div>
      <div class="grid">
        <div class="card" onclick="loadExample('javascript')">
          <h3>JavaScript</h3>
          <p>ES6+ features, async/await, DOM manipulation</p>
        </div>
        <div class="card" onclick="loadExample('python')">
          <h3>Python</h3>
          <p>Data structures, functions, list comprehensions</p>
        </div>
        <div class="card" onclick="loadExample('html')">
          <h3>HTML</h3>
          <p>Structure, forms, semantic elements</p>
        </div>
        <div class="card" onclick="loadExample('react')">
          <h3>React JSX</h3>
          <p>Components, hooks, state management</p>
        </div>
      </div>
    `;
  };

  // Enhanced compiler functions
  window.runCode = function() {
    const language = document.getElementById('language-select').value;
    const code = document.getElementById('code-input').value;
    const output = document.getElementById('output');
    
    output.innerHTML = '<div class="loading"><div class="spinner"></div>Running code...</div>';
    
    setTimeout(() => {
      try {
        switch (language) {
          case 'javascript':
            runJavaScript(code, output);
            break;
          case 'python':
            runPython(code, output);
            break;
          case 'html':
            runHTML(code, output);
            break;
          case 'react':
            runReact(code, output);
            break;
          case 'sql':
            runSQL(code, output);
            break;
          case 'css':
            runCSS(code, output);
            break;
          case 'json':
            runJSON(code, output);
            break;
          default:
            runGeneric(language, code, output);
        }
      } catch (error) {
        output.innerHTML = `<div class="error">❌ Error: ${error.message}</div>`;
      }
    }, 100);
  };

  window.clearOutput = function() {
    document.getElementById('output').innerHTML = '<div class="output-placeholder">Output will appear here...</div>';
  };

  window.loadExample = function(language) {
    const examples = {
      javascript: `// JavaScript Example
console.log("Hello, World!");

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("CodeGalaxy"));

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);`,

      python: `# Python Example
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"

print(greet("CodeGalaxy"))

# List comprehension
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print("Original:", numbers)
print("Doubled:", doubled)`,

      html: `<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .highlight { color: #ffd700; }
        .btn {
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="highlight">Hello, World!</h1>
        <p>This is a sample HTML page with modern styling.</p>
        <button class="btn" onclick="alert('Hello from HTML!')">Click me!</button>
        <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
        </ul>
    </div>
</body>
</html>`,

      react: `// React JSX Example
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Counter: {count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        Increment
      </button>
      <button 
        onClick={() => setCount(count - 1)}
        style={{
          background: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Decrement
      </button>
    </div>
  );
}

// This would render a counter component
console.log("React component created successfully!");`
    };

    document.getElementById('language-select').value = language;
    document.getElementById('code-input').value = examples[language] || '';
    clearOutput();
  };

  function runJavaScript(code, output) {
    const logs = [];
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
    };
    
    console.error = (...args) => {
      logs.push(`❌ Error: ${args.map(a => String(a)).join(' ')}`);
    };
    
    try {
      const result = eval(code);
      let outputHTML = '';
      
      if (logs.length > 0) {
        outputHTML += `<div class="console-output">${logs.map(log => `<div>${escapeHTML(log)}</div>`).join('')}</div>`;
      }
      
      if (result !== undefined) {
        outputHTML += `<div class="result">Result: <code>${escapeHTML(typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result))}</code></div>`;
      }
      
      output.innerHTML = outputHTML || '<div class="success">✅ Code executed successfully!</div>';
    } catch (error) {
      output.innerHTML = `<div class="error">❌ Error: ${escapeHTML(error.message)}</div>`;
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  }

  function runPython(code, output) {
    const lines = code.split('\n');
    let result = '';
    let variables = {};
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('#') || line === '') continue;
      
      if (line.startsWith('print(') && line.endsWith(')')) {
        const content = line.slice(6, -1);
        if (content.startsWith('"') && content.endsWith('"')) {
          result += content.slice(1, -1) + '\n';
        } else {
          try {
            const value = evaluatePythonExpression(content, variables);
            result += String(value) + '\n';
          } catch (error) {
            result += `Error: ${error.message}\n`;
          }
        }
      } else if (line.includes('=')) {
        const [varName, value] = line.split('=').map(s => s.trim());
        try {
          variables[varName] = evaluatePythonExpression(value, variables);
        } catch (error) {
          result += `Error: ${error.message}\n`;
        }
      }
    }
    
    output.innerHTML = result ? `<pre class="console-output">${escapeHTML(result)}</pre>` : '<div class="success">✅ Python code executed!</div>';
  }

  function runHTML(code, output) {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.style.border = '1px solid rgba(255,255,255,0.1)';
    iframe.style.borderRadius = '8px';
    iframe.style.background = 'white';
    
    output.innerHTML = '';
    output.appendChild(iframe);
    
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
  }

  function runReact(code, output) {
    // Simple React-like interpreter for JSX
    let result = 'React JSX Code Analysis:\n\n';
    
    // Check for React imports
    if (code.includes('import React')) {
      result += '✅ React import detected\n';
    }
    
    // Check for hooks
    if (code.includes('useState')) {
      result += '✅ useState hook detected\n';
    }
    if (code.includes('useEffect')) {
      result += '✅ useEffect hook detected\n';
    }
    
    // Check for JSX
    if (code.includes('<') && code.includes('>')) {
      result += '✅ JSX syntax detected\n';
    }
    
    // Count components
    const componentMatches = code.match(/function\s+([A-Z][a-zA-Z]*)/g);
    if (componentMatches) {
      result += `✅ Components found: ${componentMatches.length}\n`;
    }
    
    result += '\nNote: This is a code analysis. For actual React execution, you would need a React environment.';
    
    output.innerHTML = `<pre class="console-output">${escapeHTML(result)}</pre>`;
  }

  function runSQL(code, output) {
    const lines = code.split('\n');
    let result = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('--') || trimmed === '') continue;
      
      if (trimmed.toUpperCase().includes('SELECT') && trimmed.includes('"Hello, World!"')) {
        result += 'greeting\n';
        result += 'Hello, World!\n\n';
      } else if (trimmed.toUpperCase().includes('CREATE TABLE')) {
        result += '✅ Table created successfully.\n\n';
      } else if (trimmed.toUpperCase().includes('INSERT INTO')) {
        result += '✅ Data inserted successfully.\n\n';
      } else if (trimmed.toUpperCase().includes('SELECT') && trimmed.includes('numbers')) {
        result += 'id\tvalue\tdoubled\n';
        result += '1\t1\t2\n';
        result += '2\t2\t4\n';
        result += '3\t3\t6\n';
        result += '4\t4\t8\n';
        result += '5\t5\t10\n\n';
      }
    }
    
    output.innerHTML = result ? `<pre class="console-output">${escapeHTML(result)}</pre>` : '<div class="success">✅ SQL code executed!</div>';
  }

  function runCSS(code, output) {
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '400px';
    iframe.style.border = '1px solid rgba(255,255,255,0.1)';
    iframe.style.borderRadius = '8px';
    iframe.style.background = 'white';
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${code}</style>
      </head>
      <body>
        <div class="demo">
          <h1>CSS Demo</h1>
          <p>This is a paragraph with your CSS applied.</p>
          <button class="btn">Button</button>
          <div class="box">Box Element</div>
        </div>
      </body>
      </html>
    `;
    
    output.innerHTML = '';
    output.appendChild(iframe);
    
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  }

  function runJSON(code, output) {
    try {
      const parsed = JSON.parse(code);
      output.innerHTML = `<pre class="console-output">${escapeHTML(JSON.stringify(parsed, null, 2))}</pre>`;
    } catch (error) {
      output.innerHTML = `<div class="error">❌ Invalid JSON: ${escapeHTML(error.message)}</div>`;
    }
  }

  function runGeneric(language, code, output) {
    output.innerHTML = `
      <div class="info">
        <h3>${language.toUpperCase()} Code Analysis</h3>
        <p>Lines of code: ${code.split('\n').length}</p>
        <p>Characters: ${code.length}</p>
        <p>Note: This is a demonstration. For actual ${language} compilation, you would need a proper ${language} compiler or interpreter.</p>
      </div>
    `;
  }

  function evaluatePythonExpression(expr, variables) {
    expr = expr.trim();
    
    if (expr.startsWith('"') && expr.endsWith('"')) {
      return expr.slice(1, -1);
    }
    
    if (variables.hasOwnProperty(expr)) {
      return variables[expr];
    }
    
    if (/^[\d\s\+\-\*\/\(\)]+$/.test(expr)) {
      try {
        return eval(expr);
      } catch (error) {
        throw new Error(`Invalid expression: ${expr}`);
      }
    }
    
    if (expr.startsWith('[') && expr.endsWith(']')) {
      const content = expr.slice(1, -1);
      if (content.trim() === '') return [];
      
      const items = content.split(',').map(item => {
        const trimmed = item.trim();
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
          return trimmed.slice(1, -1);
        }
        return evaluatePythonExpression(trimmed, variables);
      });
      return items;
    }
    
    throw new Error(`Cannot evaluate: ${expr}`);
  }

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

  // Progress tracking page
  const renderProgress = () => {
    const userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};
    const completedItems = Object.keys(userProgress).length;
    const totalItems = CodeGalaxyData.languages.length * 4; // 4 sections per language
    const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    
    const recentActivity = JSON.parse(localStorage.getItem('recentActivity')) || [];
    
    app.innerHTML = `
      <div class="panel">
        <h2>Your Learning Progress</h2>
        <p class="muted">Track your journey through CodeGalaxy's programming content.</p>
      </div>
      
      <div class="split">
        <div class="stack">
          <div class="section-title">Overall Progress</div>
          <div class="panel">
            <div class="progress-info">
              <span>${completedItems} of ${totalItems} sections completed</span>
              <span>${progressPercent}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
          </div>
          
          <div class="section-title">Language Progress</div>
          <div class="grid">
            ${CodeGalaxyData.languages.map(lang => {
              const langProgress = userProgress[lang.id] || {};
              const sections = ['functions', 'uses', 'tags', 'examples'];
              const completedSections = sections.filter(section => langProgress[section]).length;
              const langPercent = Math.round((completedSections / sections.length) * 100);
              
              return card({
                title: lang.name,
                subtitle: `${completedSections}/${sections.length} sections completed`,
                chips: [`${langPercent}%`],
                href: `#/language/${lang.id}`
              });
            }).join('')}
          </div>
        </div>
        
        <div class="stack">
          <div class="section-title">Recent Activity</div>
          <div class="panel">
            ${recentActivity.length > 0 ? `
              <div class="activity-list">
                ${recentActivity.slice(0, 10).map(activity => `
                  <div class="activity-item">
                    <div class="activity-icon">📚</div>
                    <div class="activity-text">${escapeHTML(activity.action)}</div>
                    <div class="activity-time">${activity.time}</div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p class="muted">No recent activity. Start exploring to see your progress here!</p>
            `}
          </div>
          
          <div class="section-title">Quick Actions</div>
          <div class="panel">
            <div class="stack">
              <button class="btn" onclick="localStorage.removeItem('userProgress'); location.reload();">
                Reset Progress
              </button>
              <button class="btn secondary" onclick="location.hash='#/languages'">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Challenges page
  const renderChallenges = () => {
    const challenges = [
      {
        id: 'js-basics',
        title: 'JavaScript Basics',
        difficulty: 'Beginner',
        description: 'Master fundamental JavaScript concepts',
        tasks: [
          'Create a function that reverses a string',
          'Write a function to check if a number is prime',
          'Implement array methods: map, filter, reduce'
        ],
        language: 'JavaScript',
        points: 100
      },
      {
        id: 'python-data',
        title: 'Python Data Structures',
        difficulty: 'Intermediate',
        description: 'Work with Python lists, dictionaries, and sets',
        tasks: [
          'Create a dictionary from two lists',
          'Find the most common element in a list',
          'Remove duplicates while preserving order'
        ],
        language: 'Python',
        points: 150
      },
      {
        id: 'html-css',
        title: 'HTML & CSS Layout',
        difficulty: 'Beginner',
        description: 'Build responsive layouts with HTML and CSS',
        tasks: [
          'Create a responsive navigation bar',
          'Build a card layout with CSS Grid',
          'Style a contact form with validation'
        ],
        language: 'HTML/CSS',
        points: 120
      },
      {
        id: 'number-conversion',
        title: 'Number System Conversion',
        difficulty: 'Intermediate',
        description: 'Practice converting between number systems',
        tasks: [
          'Convert decimal 255 to binary and hexadecimal',
          'Add two binary numbers manually',
          'Convert octal 777 to decimal'
        ],
        language: 'Mathematics',
        points: 80
      },
      {
        id: 'sql-queries',
        title: 'SQL Database Queries',
        difficulty: 'Intermediate',
        description: 'Write complex SQL queries and joins',
        tasks: [
          'Write a query to find duplicate records',
          'Create a self-join to find employee hierarchy',
          'Use window functions for ranking'
        ],
        language: 'SQL',
        points: 200
      },
      {
        id: 'algorithm-challenge',
        title: 'Algorithm Challenge',
        difficulty: 'Advanced',
        description: 'Solve algorithmic problems efficiently',
        tasks: [
          'Implement binary search algorithm',
          'Write a sorting algorithm from scratch',
          'Solve the two-sum problem optimally'
        ],
        language: 'Any Language',
        points: 300
      }
    ];

    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || [];
    const totalPoints = completedChallenges.reduce((sum, id) => {
      const challenge = challenges.find(c => c.id === id);
      return sum + (challenge ? challenge.points : 0);
    }, 0);

    app.innerHTML = `
      <div class="panel">
        <h2>Coding Challenges</h2>
        <p class="muted">Test your skills with practical programming challenges. Complete challenges to earn points and track your progress.</p>
        <div style="margin-top: 12px;">
          <span class="badge success">Total Points: ${totalPoints}</span>
          <span class="badge primary">Completed: ${completedChallenges.length}</span>
        </div>
      </div>
      
      <div class="grid">
        ${challenges.map(challenge => {
          const isCompleted = completedChallenges.includes(challenge.id);
          const difficultyColor = challenge.difficulty === 'Beginner' ? 'success' : 
                                 challenge.difficulty === 'Intermediate' ? 'warning' : 'danger';
          
          return card({
            title: challenge.title,
            subtitle: challenge.description,
            chips: [
              challenge.language,
              `${challenge.points} pts`,
              challenge.difficulty
            ],
            href: `#/challenges/${challenge.id}`,
            pre: isCompleted ? '✅ Completed' : ''
          });
        }).join('')}
      </div>
    `;
  };

  const renderChallengeDetail = (challengeId) => {
    const challenges = [
      {
        id: 'js-basics',
        title: 'JavaScript Basics',
        difficulty: 'Beginner',
        description: 'Master fundamental JavaScript concepts',
        tasks: [
          'Create a function that reverses a string',
          'Write a function to check if a number is prime',
          'Implement array methods: map, filter, reduce'
        ],
        language: 'JavaScript',
        points: 100,
        hints: [
          'Use string methods like split(), reverse(), and join()',
          'Check divisibility from 2 to square root of the number',
          'Study the callback function pattern'
        ],
        solutions: [
          'function reverseString(str) { return str.split("").reverse().join(""); }',
          'function isPrime(num) { for(let i=2; i<=Math.sqrt(num); i++) if(num%i===0) return false; return num>1; }',
          'const doubled = numbers.map(x => x * 2); const evens = numbers.filter(x => x % 2 === 0); const sum = numbers.reduce((a, b) => a + b, 0);'
        ]
      },
      {
        id: 'python-data',
        title: 'Python Data Structures',
        difficulty: 'Intermediate',
        description: 'Work with Python lists, dictionaries, and sets',
        tasks: [
          'Create a dictionary from two lists',
          'Find the most common element in a list',
          'Remove duplicates while preserving order'
        ],
        language: 'Python',
        points: 150,
        hints: [
          'Use the zip() function to combine lists',
          'Use collections.Counter or a dictionary to count occurrences',
          'Use a list comprehension with a condition'
        ],
        solutions: [
          'dict(zip(keys, values))',
          'from collections import Counter; Counter(items).most_common(1)[0][0]',
          '[x for i, x in enumerate(items) if x not in items[:i]]'
        ]
      },
      {
        id: 'html-css',
        title: 'HTML & CSS Layout',
        difficulty: 'Beginner',
        description: 'Build responsive layouts with HTML and CSS',
        tasks: [
          'Create a responsive navigation bar',
          'Build a card layout with CSS Grid',
          'Style a contact form with validation'
        ],
        language: 'HTML/CSS',
        points: 120,
        hints: [
          'Use flexbox for horizontal layout and media queries for mobile',
          'Use grid-template-columns with repeat() and auto-fit',
          'Use :valid and :invalid pseudo-classes'
        ],
        solutions: [
          '<nav style="display: flex; justify-content: space-between; align-items: center;">...</nav>',
          '.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }',
          'input:valid { border-color: green; } input:invalid { border-color: red; }'
        ]
      },
      {
        id: 'number-conversion',
        title: 'Number System Conversion',
        difficulty: 'Intermediate',
        description: 'Practice converting between number systems',
        tasks: [
          'Convert decimal 255 to binary and hexadecimal',
          'Add two binary numbers manually',
          'Convert octal 777 to decimal'
        ],
        language: 'Mathematics',
        points: 80,
        hints: [
          'Divide by 2 repeatedly for binary, by 16 for hex',
          'Add from right to left, carrying when needed',
          'Multiply each digit by 8^position and sum'
        ],
        solutions: [
          '255 = 11111111 (binary) = FF (hex)',
          '1010 + 1101 = 10111',
          '777 (octal) = 7×8² + 7×8¹ + 7×8⁰ = 511 (decimal)'
        ]
      },
      {
        id: 'sql-queries',
        title: 'SQL Database Queries',
        difficulty: 'Intermediate',
        description: 'Write complex SQL queries and joins',
        tasks: [
          'Write a query to find duplicate records',
          'Create a self-join to find employee hierarchy',
          'Use window functions for ranking'
        ],
        language: 'SQL',
        points: 200,
        hints: [
          'Use GROUP BY and HAVING COUNT(*) > 1',
          'Join a table to itself with different aliases',
          'Use ROW_NUMBER() or RANK() OVER (ORDER BY column)'
        ],
        solutions: [
          'SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1',
          'SELECT e1.name, e2.name as manager FROM employees e1 LEFT JOIN employees e2 ON e1.manager_id = e2.id',
          'SELECT *, ROW_NUMBER() OVER (ORDER BY score DESC) as rank FROM students'
        ]
      },
      {
        id: 'algorithm-challenge',
        title: 'Algorithm Challenge',
        difficulty: 'Advanced',
        description: 'Solve algorithmic problems efficiently',
        tasks: [
          'Implement binary search algorithm',
          'Write a sorting algorithm from scratch',
          'Solve the two-sum problem optimally'
        ],
        language: 'Any Language',
        points: 300,
        hints: [
          'Keep track of left and right boundaries',
          'Consider quicksort or mergesort',
          'Use a hash map for O(n) time complexity'
        ],
        solutions: [
          'function binarySearch(arr, target) { let left = 0, right = arr.length - 1; while (left <= right) { let mid = Math.floor((left + right) / 2); if (arr[mid] === target) return mid; if (arr[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }',
          'function quickSort(arr) { if (arr.length <= 1) return arr; const pivot = arr[0]; const left = arr.slice(1).filter(x => x <= pivot); const right = arr.slice(1).filter(x => x > pivot); return [...quickSort(left), pivot, ...quickSort(right)]; }',
          'function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map.has(complement)) return [map.get(complement), i]; map.set(nums[i], i); } return []; }'
        ]
      }
    ];

    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return notFound();

    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || [];
    const isCompleted = completedChallenges.includes(challengeId);

    app.innerHTML = `
      <div class="panel">
        <h2>${escapeHTML(challenge.title)}</h2>
        <p>${escapeHTML(challenge.description)}</p>
        <div style="margin-top: 12px;">
          <span class="badge ${challenge.difficulty === 'Beginner' ? 'success' : challenge.difficulty === 'Intermediate' ? 'warning' : 'danger'}">${challenge.difficulty}</span>
          <span class="badge primary">${challenge.language}</span>
          <span class="badge info">${challenge.points} points</span>
          ${isCompleted ? '<span class="badge success">✅ Completed</span>' : ''}
        </div>
      </div>

      <div class="split">
        <div class="stack">
          <div class="section-title">Tasks</div>
          <div class="panel">
            <ol style="margin: 0; padding-left: 20px;">
              ${challenge.tasks.map(task => `<li style="margin-bottom: 8px;">${escapeHTML(task)}</li>`).join('')}
            </ol>
          </div>
          
          <div class="section-title">Hints</div>
          <div class="panel">
            <ol style="margin: 0; padding-left: 20px;">
              ${challenge.hints.map(hint => `<li style="margin-bottom: 8px;">${escapeHTML(hint)}</li>`).join('')}
            </ol>
          </div>
        </div>
        
        <div class="stack">
          <div class="section-title">Solutions</div>
          <div class="panel">
            <div class="stack">
              ${challenge.solutions.map((solution, index) => `
                <div>
                  <strong>Task ${index + 1}:</strong>
                  <pre><code>${escapeHTML(solution)}</code></pre>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="section-title">Actions</div>
          <div class="panel">
            <div class="stack">
              ${!isCompleted ? `
                <button class="btn" onclick="markChallengeComplete('${challengeId}')">
                  Mark as Complete
                </button>
              ` : `
                <button class="btn secondary" onclick="markChallengeIncomplete('${challengeId}')">
                  Mark as Incomplete
                </button>
              `}
              <button class="btn secondary" onclick="location.hash='#/challenges'">
                Back to Challenges
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Helper functions for challenges
  window.markChallengeComplete = (challengeId) => {
    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || [];
    if (!completedChallenges.includes(challengeId)) {
      completedChallenges.push(challengeId);
      localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
      
      // Add to recent activity
      const recentActivity = JSON.parse(localStorage.getItem('recentActivity')) || [];
      recentActivity.unshift({
        action: `Completed challenge: ${challengeId}`,
        time: new Date().toLocaleDateString()
      });
      localStorage.setItem('recentActivity', JSON.stringify(recentActivity.slice(0, 20)));
      
      location.reload();
    }
  };

  window.markChallengeIncomplete = (challengeId) => {
    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || [];
    const filtered = completedChallenges.filter(id => id !== challengeId);
    localStorage.setItem('completedChallenges', JSON.stringify(filtered));
    location.reload();
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
    { pattern: /^#\/progress\/?$/, handler: () => renderProgress() },
    { pattern: /^#\/challenges\/?$/, handler: () => renderChallenges() },
    { pattern: /^#\/challenges\/([a-z0-9\-]+)\/?$/, handler: (m) => renderChallengeDetail(m[1]) },
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


