# Netlify Deployment Guide - Angular Search App

This Angular search application is configured for deployment on Netlify with unique paths to avoid conflicts with other apps in the workspace.

## Deployment Configuration

### Current Setup
- **App**: Angular Arxiv Search App
- **Base Directory**: `Arxiv/angular-search-app`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist/angular-search-app`
- **Node Version**: 18

### Netlify Configuration
The app has its own `netlify.toml` file with:
- SPA routing support (redirects all routes to index.html)
- Security headers
- Asset caching
- Unique base path to avoid conflicts

## Deployment Options

### Option 1: Individual App Deployment
Deploy this app separately by:
1. Creating a new Netlify site
2. Connecting to this repository
3. Setting the base directory to `Arxiv/angular-search-app`
4. The netlify.toml will handle the rest

### Option 2: Monorepo Deployment
If deploying from the main repository:
1. The main netlify.toml is disabled to prevent conflicts
2. Each app (Angular search, Svelte dropdown, Angular dropdown) can be deployed separately
3. Choose which app to deploy by modifying the main netlify.toml

## Unique Identifiers

To avoid URL collisions, this app uses:
- **Base Path**: `Arxiv/angular-search-app` (unique from dropdown apps)
- **Build Config**: Angular-specific build process
- **Publish Directory**: `dist/angular-search-app` (Angular CLI default)

## Other Apps in Workspace

1. **Svelte Dropdown**: `Dropdown/svelte-dropdown-app`
2. **Angular Dropdown**: `Dropdown/angular-dropdown-ecommerce`
3. **Angular Search** (this app): `Arxiv/angular-search-app`

Each has its own netlify.toml to prevent deployment conflicts.

## Testing Deployment

Before deploying:
1. Run `npm run build` to ensure clean build
2. Check `dist/angular-search-app` contains built files
3. Test locally with `npx serve dist/angular-search-app`

## Features Included

- Advanced search form with reactive forms
- Results page with pagination
- Floating scratchpad with localStorage
- Responsive design
- TypeScript and Angular 18+
