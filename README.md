# Element Variation Websites

This project evaluates agent performance on web tasks across different frameworks by recreating representative web elements using multiple modern web development approaches.

## 📋 Project Overview

The project systematically evaluates how AI agents perform web automation tasks across different web frameworks and implementations. We selected 8 representative web elements from WebVoyager and recreated each using 5 different frameworks, producing 40 websites total.

### 🎯 Key Metrics
- **8 Representative Web Elements** (from WebVoyager dataset)
- **5 Web Frameworks** per element
- **40 Total Websites** created
- **8 Defined Tasks** (one per element type)
- **4 Agent-LLM Combinations** tested
- **160 Total Test Runs** conducted

## 🌐 Web Elements & Frameworks

### Primary Elements (Project Focus)

#### 1. **ArXiv Search Interface**
Academic paper search functionality with advanced filtering capabilities.

**Implementations:**
- **Vanilla HTML/JS**: [`Arxiv/Vanillajs.html`](Arxiv/Vanillajs.html), [`Arxiv/Data.html`](Arxiv/Data.html)
- **Svelte**: [`Arxiv/svelte-search-app/`](Arxiv/svelte-search-app/) (Vite + Svelte 4)
- **Angular**: [`Arxiv/angular-search-app/`](Arxiv/angular-search-app/) (Angular 18 + TypeScript)

**Features:**
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

**Features:**
- 3-level hierarchical navigation (Gender > Category > Brand)
- Click-based interaction (no hover dependencies)
- Shopping cart functionality
- Mobile-responsive design
- AI agent-friendly structure

### Additional Elements (Reference)

#### 3. **Dark Patterns Demonstrations**
Examples of deceptive UI patterns for analysis.

**Files:**
- [`Dark-patterns/Base_SimpleZon.html`](Dark-patterns/Base_SimpleZon.html)
- [`Dark-patterns/Hidden_charges.html`](Dark-patterns/Hidden_charges.html)
- [`Dark-patterns/Sneak_cart.html`](Dark-patterns/Sneak_cart.html)
- [`Dark-patterns/linkedout.html`](Dark-patterns/linkedout.html)
- [`Dark-patterns/Semantic_RCA.html`](Dark-patterns/Semantic_RCA.html)

## 🤖 Agent Testing Framework

### Agent-LLM Combinations
1. **Browseruse + GPT-4**
2. **Browseruse + Llama**
3. **Skyvern + GPT-4**
4. **Skyvern + Llama**

### Task Definitions
Each web element has a corresponding task designed to test specific interaction patterns:
- Form submission and validation
- Multi-step navigation flows
- Dynamic content interaction
- Search and filtering operations

## 🔍 Root Cause Analysis (RCA)

The project includes systematic failure analysis using deterministic, element-specific algorithms.

### RCA Process
1. **Action Log Collection**: Agent actions captured in CSV format
2. **Pattern Matching**: Logs matched against predefined success/failure cases
3. **Systematic Categorization**: Failures categorized by type and root cause
4. **Framework Comparison**: Analysis of failure patterns across different frameworks

### RCA Implementation
- Deterministic algorithms for each element type
- Automated classification of success/failure scenarios
- Comprehensive logging of agent decision-making processes

## 🚀 Live Deployments

### Production Sites
- **Angular Search App**: [`https://angular-search-app.netlify.app`](https://angular-search-app.netlify.app)
- **Svelte Dropdown App**: [`https://svelte-dropdown-app.netlify.app`](https://svelte-dropdown-app.netlify.app) *(if deployed)*

### Deployment Configuration
All modern framework implementations include:
- Production-ready build configurations
- Netlify deployment settings
- SPA routing support
- AI agent accessibility optimizations

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
├── Dark-patterns/                  # UI pattern examples
│   └── *.html                      # Pattern demonstrations
│
└── README.md                       # This file
```

## 🛠️ Technologies Used

### Frontend Frameworks
- **Vanilla JavaScript**: Pure HTML/CSS/JS implementations
- **Angular**: Modern TypeScript-based SPA framework
- **Svelte**: Compile-time optimized reactive framework
- **Vue.js**: Progressive JavaScript framework
- **Alpine.js**: Lightweight reactive framework

### CSS Frameworks & Libraries
- **Tailwind CSS**: Utility-first CSS framework
- **Bootstrap**: Component-based CSS framework
- **Custom CSS**: Hand-crafted responsive designs

### Build Tools & Deployment
- **Vite**: Next-generation frontend build tool
- **Angular CLI**: Official Angular development toolkit
- **Netlify**: Static site deployment and hosting
- **Git**: Version control and collaboration

## 🎯 Key Findings & Insights

The project provides valuable insights into:
- Framework-specific challenges for AI agents
- Common failure patterns across different implementations
- Optimal design patterns for agent interaction
- Performance differences between modern and traditional approaches

## 📝 Usage Notes

### For Researchers
- All implementations maintain functional equivalence
- Non-hover variants specifically designed for programmatic interaction
- Comprehensive logging and analytics integration ready

### For Developers
- Production-ready implementations with modern best practices
- Responsive design across all frameworks
- Accessibility considerations for both human users and AI agents

## 🔗 Related Resources

- **WebVoyager Dataset**: Original source of web element patterns
- **Agent Frameworks**: Browseruse and Skyvern documentation
- **Framework Documentation**: Official docs for Angular, Svelte, Vue.js, etc.

---

*This project is part of ongoing research into AI agent performance evaluation across web technologies.*
