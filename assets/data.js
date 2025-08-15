/*
  Central data registry for CodeGalaxy
  - Languages curated from those featured on W3Schools
  - For some languages, certain sections may be intentionally omitted when not applicable (e.g., HTML has no functions)
*/

const CodeGalaxyData = (() => {
  const byId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const languages = [
    {
      id: 'html',
      name: 'HTML',
      description: 'HTML (HyperText Markup Language) structures content on the web. It defines elements that browsers render as text, images, links, and interactive forms.',
      categoriesLabel: 'Tags',
      examples: [
        { title: 'Basic Page', code: '<!doctype html>\n<html>\n  <head><title>Page</title></head>\n  <body>\n    <h1>Hello</h1>\n    <p>Welcome.</p>\n  </body>\n</html>' },
        { title: 'Form', code: '<form>\n  <label>Email <input type="email"></label>\n  <button>Send</button>\n</form>' },
      ],
      uses: [
        { id: 'structure', name: 'Document Structure', brief: 'Define the skeleton of a webpage using semantic elements.', detail: 'HTML provides semantic elements like <header>, <nav>, <main>, <article>, and <footer> to structure content clearly for users and assistive technologies.' },
        { id: 'forms', name: 'Forms and Inputs', brief: 'Collect data from users via forms.', detail: 'HTML forms include a rich set of controls (input, select, textarea) and attributes for validation, accessibility, and integration with backend endpoints.' },
        { id: 'media', name: 'Media Embedding', brief: 'Embed images, audio, and video.', detail: 'Use <img>, <audio>, and <video> for media. Attributes like controls, autoplay, and loop fine-tune playback.' },
      ],
      tagGroups: [
        { id: 'text', groupName: 'Text & Headings', itemsLabel: 'Tag', items: [
          { id: 'p', name: '<p>', brief: 'Paragraph element.', detail: 'The <p> element represents a paragraph of text. Browsers typically add spacing before and after paragraphs.' },
          { id: 'h1', name: '<h1>', brief: 'Top-level heading.', detail: '<h1> denotes the highest-level heading, ideal for the page title. Use one main <h1> per page for clarity.' },
          { id: 'a', name: '<a>', brief: 'Hyperlink anchor.', detail: 'The <a> (anchor) element creates hyperlinks via the href attribute. It can link to pages, sections, files, or trigger protocols like mailto:.' },
        ]},
        { id: 'forms', groupName: 'Forms', itemsLabel: 'Tag', items: [
          { id: 'form', name: '<form>', brief: 'Form container.', detail: 'Wraps interactive controls to submit data. Supports GET/POST and rich validation semantics.' },
          { id: 'input', name: '<input>', brief: 'Input control.', detail: 'Single-line input with many types (text, email, number, date, etc.). Attributes like required and pattern enable validation.' },
          { id: 'button', name: '<button>', brief: 'Clickable button.', detail: 'Triggers actions or submits forms. Types include submit, button, and reset.' },
        ]},
        { id: 'media', groupName: 'Media', itemsLabel: 'Tag', items: [
          { id: 'img', name: '<img>', brief: 'Image embed.', detail: 'Embeds an image via the src attribute. The alt attribute provides alternative text for accessibility.' },
          { id: 'video', name: '<video>', brief: 'Video player.', detail: 'Embeds video with native controls. Source formats vary by browser; provide multiple <source> elements for compatibility.' },
        ]},
      ],
    },

    {
      id: 'css',
      name: 'CSS',
      description: 'CSS (Cascading Style Sheets) styles and lays out web pages, controlling colors, typography, spacing, grid, and responsive design.',
      categoriesLabel: 'Selectors & Properties',
      uses: [
        { id: 'styling', name: 'Styling', brief: 'Colors, fonts, spacing.', detail: 'CSS defines visual presentation, including color schemes, font stacks, whitespace, and component states.' },
        { id: 'layout', name: 'Layout', brief: 'Flexbox, Grid, positioning.', detail: 'Modern layout uses Flexbox and Grid for responsive, adaptive interfaces across devices.' },
        { id: 'animation', name: 'Animation', brief: 'Transitions and keyframes.', detail: 'CSS transitions and @keyframes enable subtle or rich animations without JavaScript.' },
      ],
      tagGroups: [
        { id: 'selectors', groupName: 'Selectors', itemsLabel: 'Selector', items: [
          { id: 'class', name: '.class', brief: 'Class selector.', detail: 'Matches elements with a specific class attribute. Combine classes for modular styling.' },
          { id: 'id', name: '#id', brief: 'ID selector.', detail: 'Matches an element with a given id. Use sparingly for unique, page-level anchors or references.' },
          { id: 'attr', name: '[attr]', brief: 'Attribute selector.', detail: 'Matches elements based on the presence or value of an attribute, e.g., [type="email"].' },
        ]},
        { id: 'properties', groupName: 'Properties', itemsLabel: 'Property', items: [
          { id: 'color', name: 'color', brief: 'Text color.', detail: 'Sets the foreground color of text. Supports named colors, hex, rgb/rgba, hsl/hsla.' },
          { id: 'margin', name: 'margin', brief: 'Outer spacing.', detail: 'Controls outer spacing around an element. Can be set per side or using shorthand.' },
          { id: 'display', name: 'display', brief: 'Layout behavior.', detail: 'Defines how an element generates boxes: block, inline, flex, grid, etc.' },
        ]},
      ],
      examples: [
        { title: 'Centered Card', code: '.card {\n  margin: auto;\n  max-width: 420px;\n  padding: 16px;\n  border-radius: 12px;\n}' }
      ],
    },

    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'JavaScript is the programming language of the web, enabling interactivity, dynamic content, and full-stack development with Node.js.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'parseInt', name: 'parseInt', brief: 'Parse integer from string.', detail: 'parseInt(string, radix) converts a string to an integer in the specified base. It ignores trailing non-numeric characters.' },
        { id: 'setTimeout', name: 'setTimeout', brief: 'Run code later.', detail: 'Schedules a function to run after a delay in milliseconds. Returns a timer id that can be cleared.' },
        { id: 'JSON.parse', name: 'JSON.parse', brief: 'Parse JSON text.', detail: 'Converts a JSON string to an object. Throws on malformed input. Use try/catch for safety.' },
      ],
      uses: [
        { id: 'dom', name: 'DOM Manipulation', brief: 'Update UI dynamically.', detail: 'Interact with the Document Object Model to create, update, and remove elements and respond to user events.' },
        { id: 'network', name: 'Networking', brief: 'Fetch APIs.', detail: 'Use fetch or other APIs to request data from servers, handle JSON, and manage async flows with promises and async/await.' },
        { id: 'node', name: 'Server-side (Node.js)', brief: 'Write backend services.', detail: 'Run JavaScript on the server for APIs, rendering, and tooling using Node.js and popular frameworks.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Language Keywords', itemsLabel: 'Keyword', items: [
          { id: 'function', name: 'function', brief: 'Function declaration.', detail: 'Declares a function with its own scope and optional parameters.' },
          { id: 'let', name: 'let', brief: 'Block-scoped variable.', detail: 'Declares a block-scoped variable. Prefer over var for predictable scoping.' },
          { id: 'async', name: 'async/await', brief: 'Asynchronous flow.', detail: 'async functions return promises; await pauses execution until the promise settles.' },
        ]}
      ],
      examples: [
        { title: 'Sum Array', code: 'const total = [1,2,3].reduce((a,b) => a+b, 0);\nconsole.log(total);' }
      ],
    },

    {
      id: 'python',
      name: 'Python',
      description: 'Python is a high-level, general-purpose language known for readability, vast libraries, and rapid development.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'print', name: 'print', brief: 'Output to console.', detail: 'print(*objects, sep=" ", end="\n", file=sys.stdout) writes textual representations of objects to the standard output.' },
        { id: 'len', name: 'len', brief: 'Length of container.', detail: 'len(s) returns the number of items in a container (string, list, tuple, dict, etc.).' },
        { id: 'range', name: 'range', brief: 'Integer sequence.', detail: 'range(stop) or range(start, stop[, step]) produces an arithmetic progression of integers.' },
        { id: 'enumerate', name: 'enumerate', brief: 'Index and value.', detail: 'enumerate(iterable, start=0) yields pairs of (index, value) for loops and comprehensions.' },
      ],
      uses: [
        { id: 'scripting', name: 'Scripting & Automation', brief: 'Automate tasks.', detail: 'Use Python for file processing, web scraping, data pipelines, and orchestration with concise scripts.' },
        { id: 'data', name: 'Data Science', brief: 'Analyze and model data.', detail: 'With libraries like NumPy, pandas, and scikit-learn, Python is a leading tool for analytics and ML.' },
        { id: 'backend', name: 'Web Backends', brief: 'APIs and web apps.', detail: 'Frameworks like Django and Flask power robust web services and sites.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Language Keywords', itemsLabel: 'Keyword', items: [
          { id: 'def', name: 'def', brief: 'Define a function.', detail: 'Introduces a function block with parameters and an indented body.' },
          { id: 'for', name: 'for', brief: 'Loop construct.', detail: 'Iterate over items in an iterable, optionally with enumerate for indices.' },
          { id: 'import', name: 'import', brief: 'Module import.', detail: 'Loads a module into the current namespace to reuse its functionality.' },
        ]}
      ],
      examples: [
        { title: 'List Comprehension', code: 'squares = [x*x for x in range(5)]\nprint(squares)' }
      ],
    },

    {
      id: 'java',
      name: 'Java',
      description: 'Java is a strongly typed, object-oriented language widely used in enterprise, Android, and backend systems.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'println', name: 'System.out.println', brief: 'Print a line.', detail: 'Writes a line of text to standard output with a trailing newline.' },
        { id: 'mathmax', name: 'Math.max', brief: 'Maximum of two.', detail: 'Returns the greater of two values for numeric types.' },
        { id: 'arrayssort', name: 'Arrays.sort', brief: 'Sort arrays.', detail: 'Sorts arrays in ascending order using a tuned Dual-Pivot Quicksort for primitives.' },
      ],
      uses: [
        { id: 'android', name: 'Android Apps', brief: 'Mobile development.', detail: 'Java has been a primary language for Android apps through the Android SDK and ecosystem.' },
        { id: 'enterprise', name: 'Enterprise Backends', brief: 'Robust services.', detail: 'Widely used for large-scale services with frameworks like Spring.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Language Keywords', itemsLabel: 'Keyword', items: [
          { id: 'class', name: 'class', brief: 'Class declaration.', detail: 'Defines a class blueprint containing fields and methods.' },
          { id: 'public', name: 'public', brief: 'Access modifier.', detail: 'Specifies visibility for classes, methods, and fields.' },
        ]}
      ],
      examples: [
        { title: 'Hello World', code: 'class Main {\n  public static void main(String[] args){\n    System.out.println("Hello");\n  }\n}' }
      ],
    },

    {
      id: 'c',
      name: 'C',
      description: 'C is a systems programming language known for performance, low-level memory control, and portability.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'printf', name: 'printf', brief: 'Formatted output.', detail: 'printf(format, ...) prints formatted text. Specifiers like %d, %f, %s control rendering.' },
        { id: 'scanf', name: 'scanf', brief: 'Formatted input.', detail: 'Reads input according to a format string into provided pointers.' },
        { id: 'malloc', name: 'malloc', brief: 'Allocate memory.', detail: 'Allocates a block of memory on the heap. Pair with free to avoid leaks.' },
        { id: 'free', name: 'free', brief: 'Free memory.', detail: 'Releases memory previously allocated with malloc/calloc/realloc.' },
      ],
      uses: [
        { id: 'embedded', name: 'Embedded Systems', brief: 'Firmware & drivers.', detail: 'C is dominant in microcontrollers, kernels, drivers, and performance-critical components.' },
        { id: 'libs', name: 'Native Libraries', brief: 'Portable libraries.', detail: 'Many cross-language libraries and runtimes are written in C for speed and portability.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Language Keywords', itemsLabel: 'Keyword', items: [
          { id: 'include', name: '#include', brief: 'Preprocessor include.', detail: 'Directs the preprocessor to include a header file.' },
          { id: 'typedef', name: 'typedef', brief: 'Type alias.', detail: 'Defines an alias for data types, aiding readability and portability.' },
        ]}
      ],
      examples: [
        { title: 'Hello World', code: '#include <stdio.h>\nint main(){\n  printf("Hello\\n");\n  return 0;\n}' }
      ],
    },

    {
      id: 'cpp',
      name: 'C++',
      description: 'C++ extends C with object-oriented and generic programming, widely used in performance-critical software.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'cout', name: 'std::cout', brief: 'Console output.', detail: 'Outputs values to standard output using stream insertion operators.' },
        { id: 'sort', name: 'std::sort', brief: 'Sort containers.', detail: 'Sorts elements using IntroSort. Provide custom comparators for custom order.' },
        { id: 'getline', name: 'std::getline', brief: 'Read line.', detail: 'Extracts characters from an input stream until a delimiter is found.' },
      ],
      uses: [
        { id: 'games', name: 'Game Engines', brief: 'Real-time graphics.', detail: 'C++ powers game engines and performance-intensive graphics applications.' },
        { id: 'finance', name: 'Finance/Trading', brief: 'Low-latency systems.', detail: 'Used in HFT and systems requiring deterministic performance.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Language Keywords', itemsLabel: 'Keyword', items: [
          { id: 'template', name: 'template', brief: 'Generic programming.', detail: 'Enables generic functions and classes parameterized by types or values.' },
          { id: 'constexpr', name: 'constexpr', brief: 'Compile-time evaluation.', detail: 'Indicates that a function or variable may be evaluated at compile time.' },
        ]}
      ],
      examples: [
        { title: 'Vector Sum', code: '#include <vector>\n#include <numeric>\nint main(){\n  std::vector<int> v{1,2,3};\n  auto s = std::accumulate(v.begin(), v.end(), 0);\n}' }
      ],
    },

    {
      id: 'csharp',
      name: 'C#',
      description: 'C# is a modern, object-oriented language in the .NET ecosystem for desktop, web, mobile, and cloud apps.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'writeline', name: 'Console.WriteLine', brief: 'Print a line.', detail: 'Writes a string followed by a line terminator to the standard output stream.' },
        { id: 'linq-where', name: 'Enumerable.Where', brief: 'Filter sequences.', detail: 'Filters a sequence of values based on a predicate expression.' },
      ],
      uses: [
        { id: 'desktop', name: 'Desktop Apps', brief: 'Windows and cross-platform.', detail: 'Build desktop apps with WPF, WinForms, or cross-platform with MAUI.' },
        { id: 'web', name: 'Web APIs', brief: 'ASP.NET Core services.', detail: 'Create high-performance, secure APIs and web apps with ASP.NET Core.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Language Keywords', itemsLabel: 'Keyword', items: [
          { id: 'using', name: 'using', brief: 'Namespace import or resource scope.', detail: 'Imports namespaces and controls disposal scopes in using statements.' },
          { id: 'async', name: 'async/await', brief: 'Asynchronous flow.', detail: 'Write asynchronous code that resembles synchronous logic with await.' },
        ]}
      ],
      examples: [
        { title: 'Hello', code: 'using System;\nclass App{ static void Main(){ Console.WriteLine("Hello"); } }' }
      ],
    },

    {
      id: 'php',
      name: 'PHP',
      description: 'PHP is a popular scripting language for server-side web development, powering many dynamic sites.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'echo', name: 'echo', brief: 'Output text.', detail: 'Outputs one or more strings. It is a language construct, not a function.' },
        { id: 'strlen', name: 'strlen', brief: 'String length.', detail: 'Returns the length of a given string in bytes.' },
        { id: 'array_map', name: 'array_map', brief: 'Map over arrays.', detail: 'Applies a callback to elements of given arrays, returning a new array.' },
      ],
      uses: [
        { id: 'websites', name: 'Dynamic Websites', brief: 'Render pages.', detail: 'Generate HTML, handle forms, and manage sessions to create dynamic sites.' },
        { id: 'apis', name: 'REST APIs', brief: 'JSON services.', detail: 'Build JSON APIs with routing, controllers, and database connectivity.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Language Keywords', itemsLabel: 'Keyword', items: [
          { id: 'foreach', name: 'foreach', brief: 'Iterate collections.', detail: 'Iterates over arrays or objects in a concise syntax.' },
          { id: 'function', name: 'function', brief: 'Define function.', detail: 'Declares a function with parameters and a body.' },
        ]}
      ],
      examples: [
        { title: 'Echo', code: '<?php echo "Hello"; ?>' }
      ],
    },

    {
      id: 'sql',
      name: 'SQL',
      description: 'SQL (Structured Query Language) is used to manage and query relational databases.',
      categoriesLabel: 'Clauses & Functions',
      functions: [
        { id: 'count', name: 'COUNT()', brief: 'Count rows.', detail: 'Returns the number of rows that match a specified condition.' },
        { id: 'sum', name: 'SUM()', brief: 'Sum values.', detail: 'Returns the total sum of a numeric column for matching rows.' },
        { id: 'avg', name: 'AVG()', brief: 'Average value.', detail: 'Returns the average value of a numeric column for matching rows.' },
      ],
      uses: [
        { id: 'query', name: 'Querying Data', brief: 'SELECT, WHERE, JOIN.', detail: 'Retrieve and combine data using SELECT with filtering, grouping, and joins.' },
        { id: 'ddl', name: 'Schema Definition', brief: 'CREATE, ALTER.', detail: 'Define and evolve database schema with DDL statements.' },
      ],
      tagGroups: [
        { id: 'clauses', groupName: 'Clauses', itemsLabel: 'Clause', items: [
          { id: 'select', name: 'SELECT', brief: 'Choose columns.', detail: 'Specifies the columns to return from a query. Combine with expressions and functions.' },
          { id: 'where', name: 'WHERE', brief: 'Filter rows.', detail: 'Filters rows based on a predicate. Runs after FROM and before GROUP BY.' },
          { id: 'join', name: 'JOIN', brief: 'Combine tables.', detail: 'Combines rows from two tables based on related columns and join type.' },
        ]}
      ],
      examples: [
        { title: 'Top Customers', code: 'SELECT name, SUM(total) total\nFROM orders\nGROUP BY name\nORDER BY total DESC\nLIMIT 10;' }
      ],
    },

    {
      id: 'r', name: 'R',
      description: 'R is a language and environment for statistical computing and graphics.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'mean', name: 'mean()', brief: 'Average value.', detail: 'Computes the arithmetic mean of a numeric vector.' },
        { id: 'lm', name: 'lm()', brief: 'Linear models.', detail: 'Fits linear models using formula syntax and returns model objects.' },
      ],
      uses: [
        { id: 'stats', name: 'Statistics', brief: 'Classical and modern stats.', detail: 'From t-tests to GLMs, R provides comprehensive statistical tools.' },
        { id: 'plots', name: 'Visualization', brief: 'Quick, rich plots.', detail: 'Base graphics and ggplot2 enable exploratory and publication-quality charts.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Keywords', itemsLabel: 'Keyword', items: [
          { id: 'function', name: 'function', brief: 'Create function.', detail: 'Defines a function with formal parameters and a body.' },
          { id: 'if', name: 'if', brief: 'Conditional.', detail: 'Executes code conditionally based on logical expressions.' },
        ]}
      ],
      examples: [
        { title: 'Summary', code: 'x <- c(1,2,3)\nsummary(x)' }
      ],
    },

    {
      id: 'go', name: 'Go',
      description: 'Go is a compiled language focused on simplicity, concurrency, and performance.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'fmt-println', name: 'fmt.Println', brief: 'Print line.', detail: 'Prints the operands followed by a newline. Formats using default formats for operands.' },
        { id: 'make', name: 'make', brief: 'Allocate slices, maps, chans.', detail: 'Creates and initializes slices, maps, and channels. Returns a value of the same type.' },
      ],
      uses: [
        { id: 'concurrency', name: 'Concurrent Services', brief: 'Goroutines and channels.', detail: 'Build highly concurrent services using lightweight goroutines and channel-based communication.' },
        { id: 'cli', name: 'CLI Tools', brief: 'Fast binaries.', detail: 'Go produces small, static binaries ideal for tooling and CLIs.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Keywords', itemsLabel: 'Keyword', items: [
          { id: 'go', name: 'go', brief: 'Start goroutine.', detail: 'Starts a new goroutine for concurrent execution of a function.' },
          { id: 'defer', name: 'defer', brief: 'Defer call.', detail: 'Schedules a function call to run after the surrounding function returns.' },
        ]}
      ],
      examples: [
        { title: 'Hello', code: 'package main\nimport "fmt"\nfunc main(){ fmt.Println("Hello") }' }
      ],
    },

    {
      id: 'kotlin', name: 'Kotlin',
      description: 'Kotlin is a modern language for JVM, Android, and beyond, emphasizing conciseness and safety.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'println', name: 'println', brief: 'Print line.', detail: 'Prints a line to standard output with a trailing newline.' },
        { id: 'let', name: 'let', brief: 'Scoped transform.', detail: 'Applies a function to an object and returns the result, often used for null-safe chains.' },
      ],
      uses: [
        { id: 'android', name: 'Android', brief: 'Primary Android language.', detail: 'First-class support for Android apps with modern features and Kotlin coroutines.' },
        { id: 'server', name: 'Server-side', brief: 'Ktor, Spring.', detail: 'Use Kotlin for backends with Ktor, Spring, and Kotlin DSLs.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Keywords', itemsLabel: 'Keyword', items: [
          { id: 'val', name: 'val', brief: 'Read-only variable.', detail: 'Declares an immutable reference.' },
          { id: 'data', name: 'data', brief: 'Data class.', detail: 'Generates equals, hashCode, toString, and copy for simple holder classes.' },
        ]}
      ],
      examples: [
        { title: 'Data Class', code: 'data class User(val id:Int, val name:String)\nprintln(User(1, "A"))' }
      ],
    },

    {
      id: 'swift', name: 'Swift',
      description: 'Swift is a powerful language for iOS, macOS, watchOS, and server development.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'print', name: 'print', brief: 'Print value.', detail: 'Prints textual representations of values to the console.' },
        { id: 'map', name: 'map', brief: 'Transform sequences.', detail: 'Applies a transform to each element in a sequence and returns a new array.' },
      ],
      uses: [
        { id: 'ios', name: 'iOS Apps', brief: 'Mobile development.', detail: 'Primary language for building iOS apps with UIKit or SwiftUI.' },
        { id: 'server', name: 'Server-side Swift', brief: 'Backends.', detail: 'Use Swift on the server with frameworks like Vapor.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Keywords', itemsLabel: 'Keyword', items: [
          { id: 'let', name: 'let', brief: 'Constant binding.', detail: 'Declares a value that cannot be reassigned.' },
          { id: 'guard', name: 'guard', brief: 'Early exits.', detail: 'Requires conditions to be true; otherwise exits the current scope early.' },
        ]}
      ],
      examples: [
        { title: 'Map', code: 'let squares = [1,2,3].map { $0*$0 }\nprint(squares)' }
      ],
    },

    {
      id: 'typescript', name: 'TypeScript',
      description: 'TypeScript adds optional static typing to JavaScript for better tooling and correctness.',
      categoriesLabel: 'Keywords',
      functions: [
        { id: 'tsc', name: 'tsc (compiler)', brief: 'Compile TS to JS.', detail: 'The TypeScript compiler checks types and emits JavaScript.' },
        { id: 'asserts', name: 'asserts', brief: 'Type assertions.', detail: 'asserts in function signatures allows users to narrow types after runtime checks.' },
      ],
      uses: [
        { id: 'apps', name: 'Large Apps', brief: 'Scale with safety.', detail: 'Static types help manage large codebases with confidence.' },
        { id: 'libs', name: 'Libraries & SDKs', brief: 'Stable APIs.', detail: 'Types document contracts and improve developer experience.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Keywords', itemsLabel: 'Keyword', items: [
          { id: 'interface', name: 'interface', brief: 'Type contract.', detail: 'Declares a named type describing the shape of an object.' },
          { id: 'type', name: 'type', brief: 'Alias type.', detail: 'Creates type aliases, unions, intersections, and mapped types.' },
        ]}
      ],
      examples: [
        { title: 'Interface', code: 'interface User { id:number; name:string }\nconst u:User = { id:1, name:"A" };' }
      ],
    },
  ];

  const numberSystems = [
    {
      id: 'binary', name: 'Binary (Base-2)',
      detail: 'Binary uses digits 0 and 1. It is fundamental to digital electronics where each bit represents two states. Conversions: to decimal sum powers of 2 for each set bit; to hex group bits in 4s; to octal group bits in 3s.'
    },
    {
      id: 'octal', name: 'Octal (Base-8)',
      detail: 'Octal uses digits 0–7. Historically used in systems where word sizes were multiples of 3 bits. Convert to binary by mapping each oct digit to 3 bits; to decimal by positional weights.'
    },
    {
      id: 'decimal', name: 'Decimal (Base-10)',
      detail: 'Decimal uses digits 0–9. It is the everyday numeral system. Convert to other bases via repeated division (for integers) and repeated multiplication (for fractional parts).'
    },
    {
      id: 'hex', name: 'Hexadecimal (Base-16)',
      detail: 'Hex uses digits 0–9 and A–F. Often used to represent bytes compactly. Convert to binary by mapping hex digits to 4-bit groups; to decimal by positional powers of 16.'
    }
  ];

  const codingSchemes = [
    { id: 'ascii', name: 'ASCII', detail: 'ASCII (American Standard Code for Information Interchange) encodes 128 characters (0–127) including control codes, digits, Latin letters, and punctuation. It underpins many legacy systems and the first 128 code points of Unicode.' },
    { id: 'unicode', name: 'Unicode', detail: 'Unicode is a universal character set covering over a million code points across scripts and symbols. Encodings like UTF-8, UTF-16, and UTF-32 store code points efficiently; UTF-8 dominates the web due to ASCII compatibility and compactness for Latin scripts.' },
  ];

  return { languages, numberSystems, codingSchemes, byId };
})();


