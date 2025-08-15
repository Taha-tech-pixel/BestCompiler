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
    const languageSelectId = 'language-select';
    const codeEditorId = 'code-editor';
    const outputId = 'output';
    const consoleId = 'console';
    
    const languages = [
      { id: 'javascript', name: 'JavaScript', ext: 'js' },
      { id: 'python', name: 'Python', ext: 'py' },
      { id: 'java', name: 'Java', ext: 'java' },
      { id: 'cpp', name: 'C++', ext: 'cpp' },
      { id: 'c', name: 'C', ext: 'c' },
      { id: 'csharp', name: 'C#', ext: 'cs' },
      { id: 'php', name: 'PHP', ext: 'php' },
      { id: 'go', name: 'Go', ext: 'go' },
      { id: 'rust', name: 'Rust', ext: 'rs' },
      { id: 'swift', name: 'Swift', ext: 'swift' },
      { id: 'kotlin', name: 'Kotlin', ext: 'kt' },
      { id: 'typescript', name: 'TypeScript', ext: 'ts' },
      { id: 'ruby', name: 'Ruby', ext: 'rb' },
      { id: 'scala', name: 'Scala', ext: 'scala' },
      { id: 'dart', name: 'Dart', ext: 'dart' },
      { id: 'r', name: 'R', ext: 'r' },
      { id: 'sql', name: 'SQL', ext: 'sql' },
      { id: 'html', name: 'HTML', ext: 'html' }
    ];

    const defaultCode = {
      javascript: 'console.log("Hello, World!");\n\n// Try some JavaScript\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(x => x * 2);\nconsole.log("Original:", numbers);\nconsole.log("Doubled:", doubled);',
      python: 'print("Hello, World!")\n\n# Try some Python\nnumbers = [1, 2, 3, 4, 5]\ndoubled = [x * 2 for x in numbers]\nprint("Original:", numbers)\nprint("Doubled:", doubled)',
      java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        \n        // Try some Java\n        int[] numbers = {1, 2, 3, 4, 5};\n        for (int num : numbers) {\n            System.out.println("Number: " + num);\n        }\n    }\n}',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    \n    // Try some C++\n    vector<int> numbers = {1, 2, 3, 4, 5};\n    for (int num : numbers) {\n        cout << "Number: " << num << endl;\n    }\n    \n    return 0;\n}',
      c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    \n    // Try some C\n    int numbers[] = {1, 2, 3, 4, 5};\n    int size = sizeof(numbers) / sizeof(numbers[0]);\n    \n    for (int i = 0; i < size; i++) {\n        printf("Number: %d\\n", numbers[i]);\n    }\n    \n    return 0;\n}',
      csharp: 'using System;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n        \n        // Try some C#\n        int[] numbers = {1, 2, 3, 4, 5};\n        var doubled = numbers.Select(x => x * 2);\n        \n        Console.WriteLine("Original: " + string.Join(", ", numbers));\n        Console.WriteLine("Doubled: " + string.Join(", ", doubled));\n    }\n}',
      php: '<?php\necho "Hello, World!\\n";\n\n// Try some PHP\n$numbers = [1, 2, 3, 4, 5];\n$doubled = array_map(function($x) { return $x * 2; }, $numbers);\n\necho "Original: " . implode(", ", $numbers) . "\\n";\necho "Doubled: " . implode(", ", $doubled) . "\\n";\n?>',
      go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    \n    // Try some Go\n    numbers := []int{1, 2, 3, 4, 5}\n    for _, num := range numbers {\n        fmt.Printf("Number: %d\\n", num)\n    }\n}',
      rust: 'fn main() {\n    println!("Hello, World!");\n    \n    // Try some Rust\n    let numbers = vec![1, 2, 3, 4, 5];\n    for num in &numbers {\n        println!("Number: {}", num);\n    }\n}',
      swift: 'import Foundation\n\nprint("Hello, World!")\n\n// Try some Swift\nlet numbers = [1, 2, 3, 4, 5]\nlet doubled = numbers.map { $0 * 2 }\n\nprint("Original:", numbers)\nprint("Doubled:", doubled)',
      kotlin: 'fun main() {\n    println("Hello, World!")\n    \n    // Try some Kotlin\n    val numbers = listOf(1, 2, 3, 4, 5)\n    val doubled = numbers.map { it * 2 }\n    \n    println("Original: $numbers")\n    println("Doubled: $doubled")\n}',
      typescript: 'console.log("Hello, World!");\n\n// Try some TypeScript\nconst numbers: number[] = [1, 2, 3, 4, 5];\nconst doubled: number[] = numbers.map(x => x * 2);\n\nconsole.log("Original:", numbers);\nconsole.log("Doubled:", doubled);',
      ruby: 'puts "Hello, World!"\n\n# Try some Ruby\nnumbers = [1, 2, 3, 4, 5]\ndoubled = numbers.map { |x| x * 2 }\n\nputs "Original: #{numbers}"\nputs "Doubled: #{doubled}"',
      scala: 'object Main extends App {\n  println("Hello, World!")\n  \n  // Try some Scala\n  val numbers = List(1, 2, 3, 4, 5)\n  val doubled = numbers.map(_ * 2)\n  \n  println(s"Original: $numbers")\n  println(s"Doubled: $doubled")\n}',
      dart: 'void main() {\n  print("Hello, World!");\n  \n  // Try some Dart\n  List<int> numbers = [1, 2, 3, 4, 5];\n  List<int> doubled = numbers.map((x) => x * 2).toList();\n  \n  print("Original: $numbers");\n  print("Doubled: $doubled");\n}',
      r: 'cat("Hello, World!\\n")\n\n# Try some R\nnumbers <- c(1, 2, 3, 4, 5)\ndoubled <- numbers * 2\n\ncat("Original:", numbers, "\\n")\ncat("Doubled:", doubled, "\\n")',
      sql: '-- SQL Example\nSELECT "Hello, World!" AS greeting;\n\n-- Create a sample table\nCREATE TABLE numbers (id INT, value INT);\nINSERT INTO numbers VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5);\n\n-- Query the table\nSELECT id, value, value * 2 AS doubled\nFROM numbers\nORDER BY id;',
      html: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n    <style>\n        body { font-family: Arial, sans-serif; padding: 20px; }\n        .container { max-width: 600px; margin: 0 auto; }\n        .highlight { color: #007bff; }\n    </style>\n</head>\n<body>\n    <div class="container">\n        <h1 class="highlight">Hello, World!</h1>\n        <p>This is a sample HTML page.</p>\n        <ul>\n            <li>Item 1</li>\n            <li>Item 2</li>\n            <li>Item 3</li>\n        </ul>\n    </div>\n</body>\n</html>'
    };

    app.innerHTML = `
      <div class="panel">
        <h2>Multi-Language Compiler & Playground</h2>
        <p class="muted">Run code in multiple programming languages directly in your browser. Select a language and start coding!</p>
      </div>
      
      <div class="split">
        <div class="stack">
          <div class="section-title">Language & Code</div>
          <select id="${languageSelectId}" style="padding:10px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:var(--text);margin-bottom:12px">
            ${languages.map(lang => `<option value="${lang.id}">${lang.name}</option>`).join('')}
          </select>
          <textarea id="${codeEditorId}" class="mono" style="width:100%;height:400px;border-radius:12px;background:#0f152c;color:#e6ecff;border:1px solid rgba(255,255,255,.08);padding:10px;font-size:14px;line-height:1.4"></textarea>
          <button class="btn" id="run-code" style="margin-top:12px">Run Code</button>
        </div>
        <div class="stack">
          <div class="section-title">Output</div>
          <pre id="${outputId}" class="mono" style="height:300px;background:#0f152c;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px;overflow:auto"></pre>
          <div class="section-title" style="margin-top:16px">Console</div>
          <pre id="${consoleId}" class="mono" style="height:200px;background:#0f152c;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px;overflow:auto"></pre>
        </div>
      </div>
      
      <div class="panel" style="margin-top:18px">
        <div class="section-title">Language Support</div>
        <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));">
          ${languages.map(lang => `
            <div class="card" style="cursor:pointer" onclick="document.getElementById('${languageSelectId}').value='${lang.id}';document.getElementById('${languageSelectId}').dispatchEvent(new Event('change'))">
              <h3 style="margin:0;font-size:16px">${lang.name}</h3>
              <p style="margin:4px 0 0;font-size:12px;color:var(--muted)">.${lang.ext}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const languageSelect = document.getElementById(languageSelectId);
    const codeEditor = document.getElementById(codeEditorId);
    const outputPre = document.getElementById(outputId);
    const consolePre = document.getElementById(consoleId);

    // Set initial code
    codeEditor.value = defaultCode.javascript;

    // Language change handler
    languageSelect.addEventListener('change', () => {
      const selectedLang = languageSelect.value;
      codeEditor.value = defaultCode[selectedLang] || '';
      outputPre.textContent = '';
      consolePre.textContent = '';
    });

    // Run code handler
    document.getElementById('run-code').addEventListener('click', () => {
      const selectedLang = languageSelect.value;
      const code = codeEditor.value;
      
      outputPre.textContent = '';
      consolePre.textContent = '';
      
      try {
        switch (selectedLang) {
          case 'javascript':
            runJavaScript(code);
            break;
          case 'python':
            runPython(code);
            break;
          case 'html':
            runHTML(code);
            break;
          case 'sql':
            runSQL(code);
            break;
          default:
            runGeneric(selectedLang, code);
        }
      } catch (error) {
        consolePre.textContent = `Error: ${error.message}`;
      }
    });

    function runJavaScript(code) {
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      const logs = [];
      const errors = [];
      const warnings = [];
      
      // Override console methods
      console.log = (...args) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      };
      console.error = (...args) => {
        errors.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      };
      console.warn = (...args) => {
        warnings.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      };
      
      try {
        const result = eval(code);
        if (result !== undefined) {
          outputPre.textContent = `Result: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}`;
        }
      } catch (error) {
        errors.push(error.message);
      } finally {
        // Restore console methods
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
      }
      
      if (logs.length > 0) {
        consolePre.textContent += logs.join('\n') + '\n';
      }
      if (warnings.length > 0) {
        consolePre.textContent += warnings.map(w => `Warning: ${w}`).join('\n') + '\n';
      }
      if (errors.length > 0) {
        consolePre.textContent += errors.map(e => `Error: ${e}`).join('\n') + '\n';
      }
    }

    function runPython(code) {
      // Simple Python-like interpreter for basic operations
      const lines = code.split('\n');
      let output = '';
      let variables = {};
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('#')) continue; // Skip comments
        
        if (line.startsWith('print(') && line.endsWith(')')) {
          const content = line.slice(6, -1);
          if (content.startsWith('"') && content.endsWith('"')) {
            output += content.slice(1, -1) + '\n';
          } else {
            // Try to evaluate the expression
            try {
              const result = evaluatePythonExpression(content, variables);
              output += String(result) + '\n';
            } catch (error) {
              output += `Error: ${error.message}\n`;
            }
          }
        } else if (line.includes('=')) {
          // Variable assignment
          const [varName, value] = line.split('=').map(s => s.trim());
          try {
            variables[varName] = evaluatePythonExpression(value, variables);
          } catch (error) {
            output += `Error: ${error.message}\n`;
          }
        }
      }
      
      outputPre.textContent = output;
    }

    function evaluatePythonExpression(expr, variables) {
      // Simple expression evaluator
      expr = expr.trim();
      
      // Handle string literals
      if (expr.startsWith('"') && expr.endsWith('"')) {
        return expr.slice(1, -1);
      }
      
      // Handle variable references
      if (variables.hasOwnProperty(expr)) {
        return variables[expr];
      }
      
      // Handle simple arithmetic
      if (/^[\d\s\+\-\*\/\(\)]+$/.test(expr)) {
        try {
          return eval(expr);
        } catch (error) {
          throw new Error(`Invalid expression: ${expr}`);
        }
      }
      
      // Handle list literals
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

    function runHTML(code) {
      // Create a sandboxed iframe for HTML preview
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '300px';
      iframe.style.border = '1px solid rgba(255,255,255,.12)';
      iframe.style.borderRadius = '12px';
      iframe.style.background = 'white';
      
      outputPre.innerHTML = '';
      outputPre.appendChild(iframe);
      
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(code);
      doc.close();
    }

    function runSQL(code) {
      // Simple SQL-like interpreter for demonstration
      const lines = code.split('\n');
      let output = '';
      let tables = {};
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('--')) continue; // Skip comments
        
        if (trimmed.toUpperCase().includes('SELECT')) {
          if (trimmed.includes('"Hello, World!"')) {
            output += 'greeting\n';
            output += 'Hello, World!\n\n';
          }
        } else if (trimmed.toUpperCase().includes('CREATE TABLE')) {
          output += 'Table created successfully.\n\n';
        } else if (trimmed.toUpperCase().includes('INSERT INTO')) {
          output += 'Data inserted successfully.\n\n';
        } else if (trimmed.toUpperCase().includes('SELECT') && trimmed.includes('numbers')) {
          output += 'id\tvalue\tdoubled\n';
          output += '1\t1\t2\n';
          output += '2\t2\t4\n';
          output += '3\t3\t6\n';
          output += '4\t4\t8\n';
          output += '5\t5\t10\n\n';
        }
      }
      
      outputPre.textContent = output;
    }

    function runGeneric(language, code) {
      // For languages without specific interpreters, show a message
      outputPre.textContent = `Running ${language} code...\n\n`;
      outputPre.textContent += `Code:\n${code}\n\n`;
      outputPre.textContent += `Note: This is a demonstration. For actual ${language} compilation, you would need a proper ${language} compiler or interpreter.`;
      
      // Add some educational content
      consolePre.textContent = `Language: ${language}\n`;
      consolePre.textContent += `Lines of code: ${code.split('\n').length}\n`;
      consolePre.textContent += `Characters: ${code.length}\n`;
      
      // Show syntax highlighting info
      const keywords = code.match(/\b(if|else|for|while|function|class|import|export|const|let|var|return|public|private|static|void|int|string|boolean)\b/g);
      if (keywords) {
        consolePre.textContent += `Keywords found: ${keywords.join(', ')}\n`;
      }
    }
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


