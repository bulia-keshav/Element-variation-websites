# Deploy to Netlify - Quick Start

## 🚀 Fast Track Deployment (5 minutes)

### Option 1: Drag & Drop (Easiest)

1. **Build the Svelte app**:
   ```bash
   cd Arxiv/svelte-search-app
   npm install
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag the `Arxiv/svelte-search-app/dist` folder to the deploy area
   - Done! Your site is live

### Option 2: GitHub Auto-Deploy (Best for updates)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "arXiv search interface"
   git branch -M main
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/arxiv-search.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Login to [netlify.com](https://netlify.com)
   - "New site from Git" → GitHub → Select repo
   - Build settings:
     - **Base directory**: `Arxiv/svelte-search-app`
     - **Build command**: `npm run build`  
     - **Publish directory**: `dist`
   - Deploy!

## 📋 What Gets Deployed

✅ **Svelte App** - Modern, reactive interface  
✅ **Search functionality** - Full arXiv-like search  
✅ **Advanced filtering** - Subjects, dates, versions  
✅ **Scratchpad** - Note-taking system  
✅ **Mobile responsive** - Works on all devices  
✅ **Fast performance** - Optimized build  

## 🔧 Configuration

The `netlify.toml` file is already configured:
- Builds the Svelte app automatically
- Sets up redirects for SPA routing
- Includes security headers
- Optimizes for performance

## 🎯 Live Example URLs

After deployment, you'll have:
- `yoursite.netlify.app/` - Main Svelte app
- `yoursite.netlify.app/Arxiv/Vanillajs.html` - Vanilla JS version
- `yoursite.netlify.app/Arxiv/Tailwind.html` - Tailwind version
- `yoursite.netlify.app/Arxiv/Data.html` - Direct results page

## 🆘 Need Help?

Check the full `NETLIFY_DEPLOYMENT.md` for detailed instructions and troubleshooting.

**Total deployment time: ~5 minutes** ⏱️
