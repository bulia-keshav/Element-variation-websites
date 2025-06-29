# Svelte Search App

A modern Svelte application for advanced search functionality.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Features

- **Reactive State Management**: Uses Svelte stores for reactive state
- **Dynamic Search Terms**: Add/remove search terms dynamically
- **Subject Filtering**: Multiple academic subjects with checkboxes
- **Date Filtering**: Various date filter options
- **Form Validation**: Client-side form validation
- **URL Parameters**: Generates proper URL parameters for search results
- **Modern Build Process**: Vite-powered build system

## Deployment

After running `npm run build`, the `dist` folder contains the built application ready for deployment to any static hosting service.

## Integration

The search form redirects to `../Data.html` with URL parameters, maintaining compatibility with the existing results page.
