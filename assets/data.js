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
           { id: 'p', name: '<p>', brief: 'Paragraph element.', detail: 'The <p> element represents a paragraph of text. Browsers typically add spacing before and after paragraphs. Use for body text, descriptions, and general content.' },
           { id: 'h1', name: '<h1>', brief: 'Top-level heading.', detail: '<h1> denotes the highest-level heading, ideal for the page title. Use one main <h1> per page for clarity and SEO. Should represent the main topic of the page.' },
           { id: 'h2', name: '<h2>', brief: 'Secondary heading.', detail: '<h2> represents section headings within a page. Use for major content divisions and maintain proper heading hierarchy.' },
           { id: 'h3', name: '<h3>', brief: 'Tertiary heading.', detail: '<h3> represents subsection headings. Use for organizing content within h2 sections.' },
           { id: 'h4', name: '<h4>', brief: 'Quaternary heading.', detail: '<h4> represents minor section headings. Use sparingly for very specific content divisions.' },
           { id: 'h5', name: '<h5>', brief: 'Quinary heading.', detail: '<h5> represents very minor headings. Rarely needed in most documents.' },
           { id: 'h6', name: '<h6>', brief: 'Senary heading.', detail: '<h6> represents the lowest level heading. Extremely rare in practice.' },
           { id: 'a', name: '<a>', brief: 'Hyperlink anchor.', detail: 'The <a> (anchor) element creates hyperlinks via the href attribute. It can link to pages, sections, files, or trigger protocols like mailto:. Use target="_blank" for external links.' },
           { id: 'span', name: '<span>', brief: 'Inline text wrapper.', detail: 'Generic inline container for text. Use for styling specific words or phrases without affecting document flow.' },
           { id: 'div', name: '<div>', brief: 'Block container.', detail: 'Generic block-level container. Use for grouping content and applying styles or scripts to sections.' },
           { id: 'br', name: '<br>', brief: 'Line break.', detail: 'Forces a line break within text. Use sparingly; prefer CSS margin/padding for spacing.' },
           { id: 'hr', name: '<hr>', brief: 'Horizontal rule.', detail: 'Creates a thematic break between content sections. Often styled with CSS for visual appeal.' },
         ]},
         { id: 'forms', groupName: 'Forms', itemsLabel: 'Tag', items: [
           { id: 'form', name: '<form>', brief: 'Form container.', detail: 'Wraps interactive controls to submit data. Supports GET/POST methods and rich validation semantics. Use action and method attributes.' },
           { id: 'input', name: '<input>', brief: 'Input control.', detail: 'Single-line input with many types (text, email, number, date, password, etc.). Attributes like required, pattern, and placeholder enable validation and UX.' },
           { id: 'button', name: '<button>', brief: 'Clickable button.', detail: 'Triggers actions or submits forms. Types include submit, button, and reset. Can contain text, images, or other elements.' },
           { id: 'textarea', name: '<textarea>', brief: 'Multi-line text input.', detail: 'Creates a multi-line text input area. Use rows and cols attributes or CSS for sizing.' },
           { id: 'select', name: '<select>', brief: 'Dropdown selection.', detail: 'Creates a dropdown menu with <option> elements. Use multiple attribute for multi-select.' },
           { id: 'option', name: '<option>', brief: 'Dropdown option.', detail: 'Defines an option within a <select> element. Use value attribute and selected for defaults.' },
           { id: 'label', name: '<label>', brief: 'Form label.', detail: 'Associates text with form controls. Use for attribute to link to input id for accessibility.' },
           { id: 'fieldset', name: '<fieldset>', brief: 'Form grouping.', detail: 'Groups related form elements. Often used with <legend> for visual organization.' },
           { id: 'legend', name: '<legend>', brief: 'Fieldset caption.', detail: 'Provides a caption for a <fieldset> element. Improves form organization and accessibility.' },
         ]},
         { id: 'media', groupName: 'Media', itemsLabel: 'Tag', items: [
           { id: 'img', name: '<img>', brief: 'Image embed.', detail: 'Embeds an image via the src attribute. The alt attribute provides alternative text for accessibility. Use loading="lazy" for performance.' },
           { id: 'video', name: '<video>', brief: 'Video player.', detail: 'Embeds video with native controls. Source formats vary by browser; provide multiple <source> elements for compatibility.' },
           { id: 'audio', name: '<audio>', brief: 'Audio player.', detail: 'Embeds audio content with controls. Supports multiple formats via <source> elements.' },
           { id: 'source', name: '<source>', brief: 'Media source.', detail: 'Specifies media sources for <video> and <audio> elements. Use for format fallbacks.' },
           { id: 'picture', name: '<picture>', brief: 'Responsive images.', detail: 'Container for multiple image sources. Use with <source> for responsive images and format selection.' },
           { id: 'figure', name: '<figure>', brief: 'Media container.', detail: 'Self-contained content like images, diagrams, or code. Often used with <figcaption>.' },
           { id: 'figcaption', name: '<figcaption>', brief: 'Figure caption.', detail: 'Provides caption or legend for a <figure> element.' },
         ]},
         { id: 'semantic', groupName: 'Semantic Structure', itemsLabel: 'Tag', items: [
           { id: 'header', name: '<header>', brief: 'Page header.', detail: 'Represents introductory content, typically containing navigation and branding elements.' },
           { id: 'nav', name: '<nav>', brief: 'Navigation section.', detail: 'Contains navigation links. Use for main site navigation, breadcrumbs, or pagination.' },
           { id: 'main', name: '<main>', brief: 'Main content.', detail: 'Contains the primary content of the document. Should be unique per page.' },
           { id: 'article', name: '<article>', brief: 'Self-contained content.', detail: 'Represents independent, self-contained content like blog posts, news articles, or comments.' },
           { id: 'section', name: '<section>', brief: 'Content section.', detail: 'Represents a standalone section of content, typically with a heading.' },
           { id: 'aside', name: '<aside>', brief: 'Sidebar content.', detail: 'Represents content that is tangentially related to the main content, like sidebars or pull quotes.' },
           { id: 'footer', name: '<footer>', brief: 'Page footer.', detail: 'Represents footer content, typically containing copyright, links, and contact information.' },
         ]},
         { id: 'lists', groupName: 'Lists', itemsLabel: 'Tag', items: [
           { id: 'ul', name: '<ul>', brief: 'Unordered list.', detail: 'Creates a bulleted list. Use for lists where order doesn\'t matter.' },
           { id: 'ol', name: '<ol>', brief: 'Ordered list.', detail: 'Creates a numbered list. Use for lists where order is important.' },
           { id: 'li', name: '<li>', brief: 'List item.', detail: 'Represents an item in a list. Can contain other elements including nested lists.' },
           { id: 'dl', name: '<dl>', brief: 'Description list.', detail: 'Creates a description list with terms and descriptions.' },
           { id: 'dt', name: '<dt>', brief: 'Description term.', detail: 'Defines a term in a description list.' },
           { id: 'dd', name: '<dd>', brief: 'Description details.', detail: 'Provides the description for a term in a description list.' },
         ]},
         { id: 'tables', groupName: 'Tables', itemsLabel: 'Tag', items: [
           { id: 'table', name: '<table>', brief: 'Data table.', detail: 'Creates a table for displaying tabular data. Use for structured information.' },
           { id: 'thead', name: '<thead>', brief: 'Table header.', detail: 'Groups header content in a table. Contains <tr> elements with <th> cells.' },
           { id: 'tbody', name: '<tbody>', brief: 'Table body.', detail: 'Groups body content in a table. Contains <tr> elements with <td> cells.' },
           { id: 'tfoot', name: '<tfoot>', brief: 'Table footer.', detail: 'Groups footer content in a table. Contains summary or totals.' },
           { id: 'tr', name: '<tr>', brief: 'Table row.', detail: 'Defines a row in a table. Contains <th> or <td> elements.' },
           { id: 'th', name: '<th>', brief: 'Header cell.', detail: 'Defines a header cell in a table. Use for column or row headers.' },
           { id: 'td', name: '<td>', brief: 'Data cell.', detail: 'Defines a data cell in a table. Contains the actual data.' },
           { id: 'caption', name: '<caption>', brief: 'Table caption.', detail: 'Provides a title or description for a table.' },
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
        { id: 'parseFloat', name: 'parseFloat', brief: 'Parse float from string.', detail: 'parseFloat(string) converts a string to a floating-point number. Stops at first invalid character.' },
        { id: 'setTimeout', name: 'setTimeout', brief: 'Run code later.', detail: 'Schedules a function to run after a delay in milliseconds. Returns a timer id that can be cleared.' },
        { id: 'setInterval', name: 'setInterval', brief: 'Run code repeatedly.', detail: 'Schedules a function to run at specified intervals. Returns a timer id for cancellation.' },
        { id: 'clearTimeout', name: 'clearTimeout', brief: 'Cancel timeout.', detail: 'Cancels a timeout previously established by setTimeout().' },
        { id: 'clearInterval', name: 'clearInterval', brief: 'Cancel interval.', detail: 'Cancels an interval previously established by setInterval().' },
        { id: 'JSON.parse', name: 'JSON.parse', brief: 'Parse JSON text.', detail: 'Converts a JSON string to an object. Throws on malformed input. Use try/catch for safety.' },
        { id: 'JSON.stringify', name: 'JSON.stringify', brief: 'Convert to JSON.', detail: 'Converts a JavaScript value to a JSON string. Handles objects, arrays, primitives.' },
        { id: 'Math.random', name: 'Math.random', brief: 'Random number.', detail: 'Returns a random number between 0 (inclusive) and 1 (exclusive).' },
        { id: 'Math.floor', name: 'Math.floor', brief: 'Round down.', detail: 'Returns the largest integer less than or equal to a given number.' },
        { id: 'Math.ceil', name: 'Math.ceil', brief: 'Round up.', detail: 'Returns the smallest integer greater than or equal to a given number.' },
        { id: 'Math.round', name: 'Math.round', brief: 'Round to nearest.', detail: 'Returns the value of a number rounded to the nearest integer.' },
        { id: 'Math.max', name: 'Math.max', brief: 'Maximum value.', detail: 'Returns the largest of zero or more numbers.' },
        { id: 'Math.min', name: 'Math.min', brief: 'Minimum value.', detail: 'Returns the smallest of zero or more numbers.' },
        { id: 'Math.abs', name: 'Math.abs', brief: 'Absolute value.', detail: 'Returns the absolute value of a number.' },
        { id: 'Math.pow', name: 'Math.pow', brief: 'Power function.', detail: 'Returns the value of a base raised to a power.' },
        { id: 'Math.sqrt', name: 'Math.sqrt', brief: 'Square root.', detail: 'Returns the square root of a number.' },
        { id: 'Array.push', name: 'Array.push', brief: 'Add to end.', detail: 'Adds one or more elements to the end of an array and returns the new length.' },
        { id: 'Array.pop', name: 'Array.pop', brief: 'Remove from end.', detail: 'Removes the last element from an array and returns that element.' },
        { id: 'Array.shift', name: 'Array.shift', brief: 'Remove from start.', detail: 'Removes the first element from an array and returns that element.' },
        { id: 'Array.unshift', name: 'Array.unshift', brief: 'Add to start.', detail: 'Adds one or more elements to the beginning of an array and returns the new length.' },
        { id: 'Array.slice', name: 'Array.slice', brief: 'Extract portion.', detail: 'Returns a shallow copy of a portion of an array into a new array.' },
        { id: 'Array.splice', name: 'Array.splice', brief: 'Change array.', detail: 'Changes the contents of an array by removing or replacing existing elements and/or adding new elements.' },
        { id: 'Array.map', name: 'Array.map', brief: 'Transform elements.', detail: 'Creates a new array with the results of calling a function for every array element.' },
        { id: 'Array.filter', name: 'Array.filter', brief: 'Filter elements.', detail: 'Creates a new array with all elements that pass the test implemented by the provided function.' },
        { id: 'Array.reduce', name: 'Array.reduce', brief: 'Reduce to value.', detail: 'Executes a reducer function on each element of the array, resulting in a single output value.' },
        { id: 'Array.find', name: 'Array.find', brief: 'Find element.', detail: 'Returns the value of the first element in the array that satisfies the provided testing function.' },
        { id: 'Array.indexOf', name: 'Array.indexOf', brief: 'Find index.', detail: 'Returns the first index at which a given element can be found in the array, or -1 if not present.' },
        { id: 'Array.includes', name: 'Array.includes', brief: 'Check inclusion.', detail: 'Determines whether an array includes a certain value among its entries, returning true or false.' },
        { id: 'String.split', name: 'String.split', brief: 'Split string.', detail: 'Divides a string into an ordered list of substrings, puts these substrings into an array, and returns the array.' },
        { id: 'String.join', name: 'String.join', brief: 'Join array.', detail: 'Creates and returns a new string by concatenating all of the elements in an array.' },
        { id: 'String.replace', name: 'String.replace', brief: 'Replace text.', detail: 'Returns a new string with some or all matches of a pattern replaced by a replacement.' },
        { id: 'String.toLowerCase', name: 'String.toLowerCase', brief: 'Convert to lowercase.', detail: 'Returns the calling string value converted to lowercase.' },
        { id: 'String.toUpperCase', name: 'String.toUpperCase', brief: 'Convert to uppercase.', detail: 'Returns the calling string value converted to uppercase.' },
        { id: 'String.trim', name: 'String.trim', brief: 'Remove whitespace.', detail: 'Removes whitespace from both ends of a string.' },
        { id: 'String.substring', name: 'String.substring', brief: 'Extract substring.', detail: 'Returns the part of the string between the start and end indexes, or to the end of the string.' },
        { id: 'String.charAt', name: 'String.charAt', brief: 'Get character.', detail: 'Returns the character at the specified index in a string.' },
        { id: 'String.length', name: 'String.length', brief: 'String length.', detail: 'Returns the length of a string.' },
        { id: 'Date.now', name: 'Date.now', brief: 'Current timestamp.', detail: 'Returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.' },
        { id: 'Date.getTime', name: 'Date.getTime', brief: 'Get timestamp.', detail: 'Returns the numeric value corresponding to the time for the specified date according to universal time.' },
        { id: 'Object.keys', name: 'Object.keys', brief: 'Get object keys.', detail: 'Returns an array of a given object\'s own enumerable property names.' },
        { id: 'Object.values', name: 'Object.values', brief: 'Get object values.', detail: 'Returns an array of a given object\'s own enumerable property values.' },
        { id: 'Object.entries', name: 'Object.entries', brief: 'Get object entries.', detail: 'Returns an array of a given object\'s own enumerable string-keyed property [key, value] pairs.' },
        { id: 'Object.assign', name: 'Object.assign', brief: 'Copy object.', detail: 'Copies all enumerable own properties from one or more source objects to a target object.' },
        { id: 'Object.freeze', name: 'Object.freeze', brief: 'Freeze object.', detail: 'Freezes an object, preventing new properties from being added and existing properties from being removed or changed.' },
        { id: 'console.log', name: 'console.log', brief: 'Print to console.', detail: 'Outputs a message to the web console. Accepts multiple arguments and various data types.' },
        { id: 'console.error', name: 'console.error', brief: 'Print error.', detail: 'Outputs an error message to the web console.' },
        { id: 'console.warn', name: 'console.warn', brief: 'Print warning.', detail: 'Outputs a warning message to the web console.' },
        { id: 'console.table', name: 'console.table', brief: 'Print table.', detail: 'Displays tabular data as a table in the console.' },
        { id: 'console.time', name: 'console.time', brief: 'Start timer.', detail: 'Starts a timer that can be used to track how long an operation takes.' },
        { id: 'console.timeEnd', name: 'console.timeEnd', brief: 'End timer.', detail: 'Stops a timer that was previously started by console.time().' },
        { id: 'fetch', name: 'fetch', brief: 'HTTP request.', detail: 'Makes an HTTP request to fetch a resource. Returns a Promise that resolves to the Response object.' },
        { id: 'localStorage.getItem', name: 'localStorage.getItem', brief: 'Get stored data.', detail: 'Retrieves a value from localStorage by key. Returns null if key doesn\'t exist.' },
        { id: 'localStorage.setItem', name: 'localStorage.setItem', brief: 'Store data.', detail: 'Stores a key-value pair in localStorage. Data persists across browser sessions.' },
        { id: 'localStorage.removeItem', name: 'localStorage.removeItem', brief: 'Remove stored data.', detail: 'Removes a key-value pair from localStorage by key.' },
        { id: 'localStorage.clear', name: 'localStorage.clear', brief: 'Clear all data.', detail: 'Removes all key-value pairs from localStorage.' },
      ],
      uses: [
        { id: 'dom', name: 'DOM Manipulation', brief: 'Update UI dynamically.', detail: 'Interact with the Document Object Model to create, update, and remove elements and respond to user events.' },
        { id: 'network', name: 'Networking', brief: 'Fetch APIs.', detail: 'Use fetch or other APIs to request data from servers, handle JSON, and manage async flows with promises and async/await.' },
        { id: 'node', name: 'Server-side (Node.js)', brief: 'Write backend services.', detail: 'Run JavaScript on the server for APIs, rendering, and tooling using Node.js and popular frameworks.' },
      ],
      tagGroups: [
        { id: 'keywords', groupName: 'Language Keywords', itemsLabel: 'Keyword', items: [
          { id: 'function', name: 'function', brief: 'Function declaration.', detail: 'Declares a function with its own scope and optional parameters.' },
          { id: 'const', name: 'const', brief: 'Constant declaration.', detail: 'Declares a block-scoped constant that cannot be reassigned. Must be initialized.' },
          { id: 'let', name: 'let', brief: 'Block-scoped variable.', detail: 'Declares a block-scoped variable. Prefer over var for predictable scoping.' },
          { id: 'var', name: 'var', brief: 'Function-scoped variable.', detail: 'Declares a function-scoped variable. Hoisted to function top. Avoid in modern code.' },
          { id: 'if', name: 'if', brief: 'Conditional statement.', detail: 'Executes a block of code if a specified condition is true.' },
          { id: 'else', name: 'else', brief: 'Alternative condition.', detail: 'Specifies a block of code to be executed if the same condition is false.' },
          { id: 'else if', name: 'else if', brief: 'Multiple conditions.', detail: 'Specifies a new condition to test if the first condition is false.' },
          { id: 'switch', name: 'switch', brief: 'Multiple cases.', detail: 'Evaluates an expression and executes code blocks based on matching cases.' },
          { id: 'case', name: 'case', brief: 'Switch case.', detail: 'Specifies a match in a switch statement. Use break to prevent fall-through.' },
          { id: 'default', name: 'default', brief: 'Default case.', detail: 'Specifies the code to run if there is no case match in a switch statement.' },
          { id: 'for', name: 'for', brief: 'For loop.', detail: 'Creates a loop that consists of three optional expressions, enclosed in parentheses and separated by semicolons.' },
          { id: 'while', name: 'while', brief: 'While loop.', detail: 'Creates a loop that executes a specified statement as long as the test condition evaluates to true.' },
          { id: 'do', name: 'do...while', brief: 'Do-while loop.', detail: 'Creates a loop that executes a specified statement until the test condition evaluates to false.' },
          { id: 'break', name: 'break', brief: 'Exit loop/switch.', detail: 'Terminates the current loop, switch, or label statement and transfers program control.' },
          { id: 'continue', name: 'continue', brief: 'Skip iteration.', detail: 'Terminates execution of the statements in the current iteration and continues with the next iteration.' },
          { id: 'return', name: 'return', brief: 'Return value.', detail: 'Specifies the value to be returned by a function.' },
          { id: 'try', name: 'try...catch', brief: 'Error handling.', detail: 'Marks a block of statements to try and specifies a response should an exception be thrown.' },
          { id: 'catch', name: 'catch', brief: 'Handle errors.', detail: 'Specifies a block of code to be executed if an error occurs in the try block.' },
          { id: 'finally', name: 'finally', brief: 'Always execute.', detail: 'Specifies a block of code to be executed regardless of the result of the try-catch block.' },
          { id: 'throw', name: 'throw', brief: 'Throw error.', detail: 'Throws a user-defined exception. Execution of the current function will stop.' },
          { id: 'class', name: 'class', brief: 'Class declaration.', detail: 'Declares a class, which is a template for creating objects with shared properties and methods.' },
          { id: 'extends', name: 'extends', brief: 'Class inheritance.', detail: 'Used in class declarations or class expressions to create a class that is a child of another class.' },
          { id: 'super', name: 'super', brief: 'Parent constructor.', detail: 'Calls the constructor of the parent class. Used to access and call functions on an object\'s parent.' },
          { id: 'new', name: 'new', brief: 'Create instance.', detail: 'Creates an instance of a user-defined object type or of one of the built-in object types.' },
          { id: 'this', name: 'this', brief: 'Current context.', detail: 'Refers to the object it belongs to. Has different values depending on where it is used.' },
          { id: 'typeof', name: 'typeof', brief: 'Type operator.', detail: 'Returns a string indicating the type of the unevaluated operand.' },
          { id: 'instanceof', name: 'instanceof', brief: 'Type checking.', detail: 'Tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.' },
          { id: 'in', name: 'in', brief: 'Property check.', detail: 'Returns true if the specified property is in the specified object or its prototype chain.' },
          { id: 'delete', name: 'delete', brief: 'Delete property.', detail: 'Removes a property from an object. Returns true for all cases except when the property is non-configurable.' },
          { id: 'void', name: 'void', brief: 'Void operator.', detail: 'Evaluates the given expression and then returns undefined.' },
          { id: 'yield', name: 'yield', brief: 'Generator function.', detail: 'Pauses and resumes a generator function. Used in generator functions to return values.' },
          { id: 'async', name: 'async', brief: 'Async function.', detail: 'Declares an async function, which returns a Promise. Use await inside to pause execution.' },
          { id: 'await', name: 'await', brief: 'Wait for promise.', detail: 'Pauses execution of async function and waits for a Promise to resolve or reject.' },
          { id: 'import', name: 'import', brief: 'Import module.', detail: 'Used to import bindings which are exported by another module.' },
          { id: 'export', name: 'export', brief: 'Export module.', detail: 'Used to export functions, objects, or primitives from a module.' },
          { id: 'static', name: 'static', brief: 'Static method.', detail: 'Defines a static method for a class. Static methods are called without instantiating their class.' },
          { id: 'get', name: 'get', brief: 'Getter method.', detail: 'Binds an object property to a function that will be called when that property is looked up.' },
          { id: 'set', name: 'set', brief: 'Setter method.', detail: 'Binds an object property to a function to be called when there is an attempt to set that property.' },
        ]},
        { id: 'operators', groupName: 'Operators', itemsLabel: 'Operator', items: [
          { id: 'assignment', name: '=', brief: 'Assignment.', detail: 'Assigns the value on the right to the variable on the left.' },
          { id: 'addition', name: '+', brief: 'Addition.', detail: 'Adds two numbers or concatenates strings.' },
          { id: 'subtraction', name: '-', brief: 'Subtraction.', detail: 'Subtracts the right operand from the left operand.' },
          { id: 'multiplication', name: '*', brief: 'Multiplication.', detail: 'Multiplies two numbers.' },
          { id: 'division', name: '/', brief: 'Division.', detail: 'Divides the left operand by the right operand.' },
          { id: 'modulus', name: '%', brief: 'Modulus.', detail: 'Returns the remainder of a division operation.' },
          { id: 'exponentiation', name: '**', brief: 'Exponentiation.', detail: 'Raises the left operand to the power of the right operand.' },
          { id: 'increment', name: '++', brief: 'Increment.', detail: 'Increases a number by one. Can be prefix or postfix.' },
          { id: 'decrement', name: '--', brief: 'Decrement.', detail: 'Decreases a number by one. Can be prefix or postfix.' },
          { id: 'equality', name: '==', brief: 'Loose equality.', detail: 'Compares two values for equality after type coercion.' },
          { id: 'strict-equality', name: '===', brief: 'Strict equality.', detail: 'Compares two values for equality without type coercion.' },
          { id: 'inequality', name: '!=', brief: 'Loose inequality.', detail: 'Compares two values for inequality after type coercion.' },
          { id: 'strict-inequality', name: '!==', brief: 'Strict inequality.', detail: 'Compares two values for inequality without type coercion.' },
          { id: 'greater-than', name: '>', brief: 'Greater than.', detail: 'Returns true if the left operand is greater than the right operand.' },
          { id: 'less-than', name: '<', brief: 'Less than.', detail: 'Returns true if the left operand is less than the right operand.' },
          { id: 'greater-equal', name: '>=', brief: 'Greater or equal.', detail: 'Returns true if the left operand is greater than or equal to the right operand.' },
          { id: 'less-equal', name: '<=', brief: 'Less or equal.', detail: 'Returns true if the left operand is less than or equal to the right operand.' },
          { id: 'logical-and', name: '&&', brief: 'Logical AND.', detail: 'Returns true if both operands are true, otherwise false.' },
          { id: 'logical-or', name: '||', brief: 'Logical OR.', detail: 'Returns true if at least one operand is true, otherwise false.' },
          { id: 'logical-not', name: '!', brief: 'Logical NOT.', detail: 'Returns the opposite boolean value of the operand.' },
          { id: 'nullish-coalescing', name: '??', brief: 'Nullish coalescing.', detail: 'Returns the right operand when the left is null or undefined, otherwise returns the left operand.' },
          { id: 'optional-chaining', name: '?.', brief: 'Optional chaining.', detail: 'Allows reading the value of a property located deep within a chain of connected objects without having to validate each reference.' },
          { id: 'spread', name: '...', brief: 'Spread operator.', detail: 'Expands an iterable (like an array) into individual elements.' },
          { id: 'rest', name: '...', brief: 'Rest parameter.', detail: 'Collects multiple elements and condenses them into a single element.' },
          { id: 'destructuring', name: '{}', brief: 'Destructuring.', detail: 'Extract values from objects or arrays into distinct variables.' },
        ]},
      ],
      examples: [
        { title: 'Sum Array', code: 'const total = [1,2,3].reduce((a,b) => a+b, 0);\nconsole.log(total);' },
        { title: 'Async/Await', code: 'async function fetchData() {\n  const response = await fetch("/api/data");\n  const data = await response.json();\n  return data;\n}' },
        { title: 'Class Definition', code: 'class User {\n  constructor(name, email) {\n    this.name = name;\n    this.email = email;\n  }\n  \n  greet() {\n    return `Hello, ${this.name}!`;\n  }\n}' },
        { title: 'Array Methods', code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(x => x * 2);\nconst evens = numbers.filter(x => x % 2 === 0);\nconst sum = numbers.reduce((a, b) => a + b, 0);' },
        { title: 'Destructuring', code: 'const person = { name: "John", age: 30 };\nconst { name, age } = person;\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];' },
        { title: 'Template Literals', code: 'const name = "World";\nconst greeting = `Hello, ${name}!`;\nconst multiline = `\n  This is a\n  multiline string\n`;' },
        { title: 'Arrow Functions', code: 'const add = (a, b) => a + b;\nconst square = x => x * x;\nconst getData = async () => {\n  return await fetch("/api/data");\n};' },
        { title: 'Error Handling', code: 'try {\n  const result = riskyOperation();\n  console.log(result);\n} catch (error) {\n  console.error("Error:", error.message);\n} finally {\n  cleanup();\n}' },
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
        { id: 'zip', name: 'zip', brief: 'Combine iterables.', detail: 'zip(*iterables) returns an iterator of tuples, where the i-th tuple contains the i-th element from each of the argument sequences.' },
        { id: 'map', name: 'map', brief: 'Apply function.', detail: 'map(function, iterable, ...) applies function to every item of iterable and returns an iterator.' },
        { id: 'filter', name: 'filter', brief: 'Filter sequence.', detail: 'filter(function, iterable) constructs an iterator from elements of iterable for which function returns true.' },
        { id: 'sorted', name: 'sorted', brief: 'Sort sequence.', detail: 'sorted(iterable, key=None, reverse=False) returns a new sorted list from the items in iterable.' },
        { id: 'reversed', name: 'reversed', brief: 'Reverse sequence.', detail: 'reversed(seq) returns a reverse iterator over the values of the given sequence.' },
        { id: 'sum', name: 'sum', brief: 'Sum iterable.', detail: 'sum(iterable, start=0) returns the sum of a start value (default: 0) plus an iterable of numbers.' },
        { id: 'min', name: 'min', brief: 'Minimum value.', detail: 'min(iterable, *[, key, default]) returns the smallest item in an iterable or the smallest of two or more arguments.' },
        { id: 'max', name: 'max', brief: 'Maximum value.', detail: 'max(iterable, *[, key, default]) returns the largest item in an iterable or the largest of two or more arguments.' },
        { id: 'abs', name: 'abs', brief: 'Absolute value.', detail: 'abs(x) returns the absolute value of a number. The argument may be an integer or a floating point number.' },
        { id: 'round', name: 'round', brief: 'Round number.', detail: 'round(number[, ndigits]) returns number rounded to ndigits precision after the decimal point.' },
        { id: 'pow', name: 'pow', brief: 'Power function.', detail: 'pow(base, exp[, mod]) returns base to the power exp; if mod is present, return base to the power exp, modulo mod.' },
        { id: 'divmod', name: 'divmod', brief: 'Division and modulus.', detail: 'divmod(a, b) returns a pair of numbers (a // b, a % b) consisting of their quotient and remainder.' },
        { id: 'bin', name: 'bin', brief: 'Binary string.', detail: 'bin(x) converts an integer number to a binary string prefixed with "0b".' },
        { id: 'oct', name: 'oct', brief: 'Octal string.', detail: 'oct(x) converts an integer number to an octal string prefixed with "0o".' },
        { id: 'hex', name: 'hex', brief: 'Hexadecimal string.', detail: 'hex(x) converts an integer number to a hexadecimal string prefixed with "0x".' },
        { id: 'chr', name: 'chr', brief: 'Character from code.', detail: 'chr(i) returns the string representing a character whose Unicode code point is the integer i.' },
        { id: 'ord', name: 'ord', brief: 'Code from character.', detail: 'ord(c) returns an integer representing the Unicode code point of that character.' },
        { id: 'str', name: 'str', brief: 'String conversion.', detail: 'str(object) returns a string version of object. If no object is provided, returns the empty string.' },
        { id: 'int', name: 'int', brief: 'Integer conversion.', detail: 'int(x, base=10) returns an integer object constructed from a number or string x.' },
        { id: 'float', name: 'float', brief: 'Float conversion.', detail: 'float(x) returns a floating point number constructed from a number or string x.' },
        { id: 'bool', name: 'bool', brief: 'Boolean conversion.', detail: 'bool(x) returns False when the argument x is empty, False, 0, None, or an empty string, otherwise True.' },
        { id: 'list', name: 'list', brief: 'List conversion.', detail: 'list(iterable) returns a list whose items are the same and in the same order as iterable\'s items.' },
        { id: 'tuple', name: 'tuple', brief: 'Tuple conversion.', detail: 'tuple(iterable) returns a tuple whose items are the same and in the same order as iterable\'s items.' },
        { id: 'set', name: 'set', brief: 'Set conversion.', detail: 'set(iterable) returns a new set object, optionally with elements taken from iterable.' },
        { id: 'dict', name: 'dict', brief: 'Dictionary conversion.', detail: 'dict(**kwarg) or dict(mapping, **kwarg) or dict(iterable, **kwarg) creates a new dictionary.' },
        { id: 'type', name: 'type', brief: 'Type of object.', detail: 'type(object) returns the type of an object. type(name, bases, dict) creates a new type.' },
        { id: 'isinstance', name: 'isinstance', brief: 'Type checking.', detail: 'isinstance(object, classinfo) returns True if the object argument is an instance of the classinfo argument.' },
        { id: 'issubclass', name: 'issubclass', brief: 'Subclass check.', detail: 'issubclass(class, classinfo) returns True if class is a subclass (direct, indirect or virtual) of classinfo.' },
        { id: 'hasattr', name: 'hasattr', brief: 'Attribute check.', detail: 'hasattr(object, name) returns True if the object has an attribute with the given name.' },
        { id: 'getattr', name: 'getattr', brief: 'Get attribute.', detail: 'getattr(object, name[, default]) returns the value of the named attribute of object.' },
        { id: 'setattr', name: 'setattr', brief: 'Set attribute.', detail: 'setattr(object, name, value) sets the value of the named attribute of the given object.' },
        { id: 'delattr', name: 'delattr', brief: 'Delete attribute.', detail: 'delattr(object, name) deletes the named attribute from the given object.' },
        { id: 'dir', name: 'dir', brief: 'Object attributes.', detail: 'dir([object]) returns a list of valid attributes and methods of the object.' },
        { id: 'vars', name: 'vars', brief: 'Object dictionary.', detail: 'vars([object]) returns the __dict__ attribute for a module, class, instance, or any other object.' },
        { id: 'help', name: 'help', brief: 'Interactive help.', detail: 'help([object]) invokes the built-in help system. If no argument is given, the interactive help system starts.' },
        { id: 'open', name: 'open', brief: 'Open file.', detail: 'open(file, mode="r", buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None) opens file and returns a corresponding file object.' },
        { id: 'input', name: 'input', brief: 'User input.', detail: 'input([prompt]) reads a line from input, converts it to a string (stripping a trailing newline), and returns that.' },
        { id: 'format', name: 'format', brief: 'String formatting.', detail: 'format(value[, format_spec]) converts a value to a "formatted" representation, as controlled by format_spec.' },
        { id: 'repr', name: 'repr', brief: 'String representation.', detail: 'repr(object) returns a string containing a printable representation of an object.' },
        { id: 'ascii', name: 'ascii', brief: 'ASCII representation.', detail: 'ascii(object) returns a string containing a printable representation of an object, but escape the non-ASCII characters.' },
        { id: 'eval', name: 'eval', brief: 'Evaluate expression.', detail: 'eval(expression[, globals[, locals]]) evaluates the given expression in the context of globals and locals.' },
        { id: 'exec', name: 'exec', brief: 'Execute code.', detail: 'exec(object[, globals[, locals]]) executes the given source in the context of globals and locals.' },
        { id: 'compile', name: 'compile', brief: 'Compile code.', detail: 'compile(source, filename, mode, flags=0, dont_inherit=False, optimize=-1) compiles the source into a code or AST object.' },
        { id: 'hash', name: 'hash', brief: 'Hash value.', detail: 'hash(object) returns the hash value of the object (if it has one). Hash values are integers.' },
        { id: 'id', name: 'id', brief: 'Object identity.', detail: 'id(object) returns the "identity" of an object. This is an integer which is guaranteed to be unique and constant for this object.' },
        { id: 'super', name: 'super', brief: 'Parent class.', detail: 'super([type[, object-or-type]]) returns a proxy object that delegates method calls to a parent or sibling class of type.' },
        { id: 'property', name: 'property', brief: 'Property decorator.', detail: 'property(fget=None, fset=None, fdel=None, doc=None) returns a property attribute.' },
        { id: 'staticmethod', name: 'staticmethod', brief: 'Static method.', detail: 'staticmethod(function) returns a static method for function.' },
        { id: 'classmethod', name: 'classmethod', brief: 'Class method.', detail: 'classmethod(function) returns a class method for function.' },
        { id: 'all', name: 'all', brief: 'All true.', detail: 'all(iterable) returns True if all elements of the iterable are true (or if the iterable is empty).' },
        { id: 'any', name: 'any', brief: 'Any true.', detail: 'any(iterable) returns True if any element of the iterable is true. If the iterable is empty, return False.' },
        { id: 'next', name: 'next', brief: 'Next item.', detail: 'next(iterator[, default]) retrieves the next item from the iterator by calling its __next__() method.' },
        { id: 'iter', name: 'iter', brief: 'Iterator.', detail: 'iter(object[, sentinel]) returns an iterator object.' },
        { id: 'slice', name: 'slice', brief: 'Slice object.', detail: 'slice(stop) or slice(start, stop[, step]) returns a slice object representing the set of indices specified by range(start, stop, step).' },
        { id: 'memoryview', name: 'memoryview', brief: 'Memory view.', detail: 'memoryview(object) returns a "memory view" object created from the given argument.' },
        { id: 'bytearray', name: 'bytearray', brief: 'Byte array.', detail: 'bytearray([source[, encoding[, errors]]]) returns a new array of bytes.' },
        { id: 'bytes', name: 'bytes', brief: 'Bytes object.', detail: 'bytes([source[, encoding[, errors]]]) returns a new "bytes" object, which is an immutable sequence of integers.' },
        { id: 'frozenset', name: 'frozenset', brief: 'Frozen set.', detail: 'frozenset([iterable]) returns a new frozenset object, optionally with elements taken from iterable.' },
        { id: 'complex', name: 'complex', brief: 'Complex number.', detail: 'complex([real[, imag]]) returns a complex number with the value real + imag*1j or converts a string or number to a complex number.' },
        { id: 'object', name: 'object', brief: 'Base object.', detail: 'object() returns a new featureless object. object is a base for all classes.' },
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


