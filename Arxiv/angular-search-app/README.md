# Angular Search App

A sophisticated academic paper search application built with Angular, featuring advanced search functionality and a floating scratchpad for note-taking.

## Features

- **Advanced Search Form**: Multi-field search with support for titles, authors, abstracts, and more
- **Subject Filtering**: Filter papers by academic subjects (Computer Science, Physics, Math, etc.)
- **Date Range Filtering**: Search by submission date, announcement date, or specific date ranges
- **Search Results**: Paginated results with highlighting of search terms
- **Floating Scratchpad**: Persistent note-taking functionality with auto-save
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── paper.model.ts          # Data models and interfaces
│   ├── services/
│   │   └── paper-data.service.ts   # Search logic and data handling
│   ├── search/
│   │   ├── search.component.ts     # Advanced search form
│   │   ├── search.component.html   # Search form template
│   │   └── search.component.css    # Search form styles
│   ├── results/
│   │   ├── results.component.ts    # Search results display
│   │   ├── results.component.html  # Results template
│   │   └── results.component.css   # Results styles
│   ├── scratchpad/
│   │   ├── scratchpad.component.ts # Floating notes component
│   │   ├── scratchpad.component.html
│   │   └── scratchpad.component.css
│   ├── app.routes.ts               # Application routing
│   ├── app.ts                      # Main app component
│   └── app.html                    # App template
└── styles.css                      # Global styles
```

## Technologies Used

- **Angular 18+**: Modern component-based framework
- **TypeScript**: Type-safe development
- **Reactive Forms**: Form handling and validation
- **Angular Router**: Navigation between search and results
- **Local Storage**: Persistent scratchpad notes

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. Navigate to the project directory:
   ```bash
   cd angular-search-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:4200`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Search Form Features

1. **Search Terms**: Add multiple search terms with specific field targeting
2. **Subject Filters**: Select academic subjects to narrow results
3. **Cross-listing**: Include or exclude cross-listed papers
4. **Date Filtering**: Filter by various date criteria
5. **Display Options**: Show/hide abstracts and set results per page

### Results Page Features

1. **Highlighted Results**: Search terms are highlighted in titles and abstracts
2. **Pagination**: Navigate through large result sets
3. **Paper Details**: Click on titles for detailed information
4. **Back Navigation**: Return to search form to modify criteria

### Scratchpad Features

1. **Floating Interface**: Always accessible in bottom-right corner
2. **Auto-save**: Notes are automatically saved to browser storage
3. **Minimize/Maximize**: Collapse to save screen space
4. **Clear Function**: Remove all notes with confirmation
5. **Character Counter**: Track note length

## License

This project is open source and available under the MIT License.
