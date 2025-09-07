# Element Variation Websites

This project evaluates agent performance on web tasks across different frameworks by recreating representative web elements using multiple modern web development approaches.

## 📋 Project Overview

The project systematically evaluates how AI agents perform web automation tasks across different web frameworks and implementations. We selected 2 representative web elements from WebVoyager and recreated each using 5 different frameworks, producing 10 websites total.



## 🌐 Web Elements & Frameworks

### Primary Elements 
#### 1. **ArXiv Search Interface**
Academic paper search functionality with advanced filtering capabilities.

**Implementations:**
- **Vanilla HTML/JS**: [`Arxiv/Vanillajs.html`](Arxiv/Vanillajs.html), [`Arxiv/Data.html`](Arxiv/Data.html)
- **Svelte**: [`Arxiv/svelte-search-app/`](Arxiv/svelte-search-app/) (Vite + Svelte 4)
- **Angular**: [`Arxiv/angular-search-app/`](Arxiv/angular-search-app/) (Angular 18 + TypeScript)


- Multi-field search (title, author, abstract, etc.)
- Subject filtering (CS, Physics, Math, etc.)
- Date range filtering
- Results pagination with highlighting
- Floating scratchpad for notes

#### 2. **Dropdown Navigation (Non-Hover)**
Multi-level dropdown navigation systems optimized for programmatic interaction.

**Implementations:**
- **Vanilla HTML/JS**: [`Dropdown/Base-website-non-hover.html`](Dropdown/Base-website-non-hover.html)
- **Alpine.js**: [`Dropdown/alpine-non-hover.html`](Dropdown/alpine-non-hover.html)
- **Bootstrap**: [`Dropdown/bootstrap-non-hover.html`](Dropdown/bootstrap-non-hover.html)
- **Tailwind**: [`Dropdown/tailwind-nonhover.html`](Dropdown/tailwind-nonhover.html)
- **Vue.js**: [`Dropdown/vuejs-non-hover.html`](Dropdown/vuejs-non-hover.html)
- **Svelte**: [`Dropdown/svelte-dropdown-app/`](Dropdown/svelte-dropdown-app/) (Vite + Tailwind)
- **Angular**: [`Dropdown/angular-dropdown-ecommerce/`](Dropdown/angular-dropdown-ecommerce/) (Angular + TypeScript)


- 3-level hierarchical navigation (Gender > Category > Brand)
- Click-based interaction (no hover dependencies)
- Shopping cart functionality
- Mobile-responsive design







## 🔍 Root Cause Analysis (RCA)

The project includes systematic failure analysis using deterministic, element-specific algorithms.

### RCA Process
1. **Action Log Collection**: Agent actions captured in CSV format
2. **Pattern Matching**: Logs matched against predefined success/failure cases
3. **Systematic Categorization**: Failures categorized by type and root cause
4. **Framework Comparison**: Analysis of failure patterns across different frameworks


## 📁 Project Structure

```
├── Arxiv/                          # Academic search implementations
│   ├── angular-search-app/         # Angular 18 + TypeScript
│   ├── svelte-search-app/          # Svelte 4 + Vite
│   ├── Vanillajs.html             # Vanilla search form
│   └── Data.html                   # Vanilla results page
│
├── Dropdown/                       # Navigation implementations
│   ├── angular-dropdown-ecommerce/ # Angular + TypeScript
│   ├── svelte-dropdown-app/        # Svelte + Vite + Tailwind
│   ├── *-non-hover.html           # Click-based implementations
│   └── *.html                      # Various framework demos
│
├── Dark-patterns/                  # Experimented on, but not used within current work
│   └── *.html                      # Pattern demonstrations
│
└── README.md                       # This file
```


